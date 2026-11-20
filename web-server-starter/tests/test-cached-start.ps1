param([Parameter(Mandatory=$true)][string] $SourceRoot, [switch] $ExpectLegacyUpgrade, [switch] $ExpectCustomPreserved)
$ErrorActionPreference = 'Stop'
$testWorkspace = [IO.Path]::GetFullPath((Join-Path $PSScriptRoot '..'))
$testBase = [IO.Path]::GetFullPath((Join-Path ([IO.Path]::GetTempPath()) 'kinofree-windows-launcher-tests'))
$testRoot = [IO.Path]::GetFullPath((Join-Path $testBase ('c5-launcher-' + [guid]::NewGuid().ToString('N'))))
if (-not $testRoot.StartsWith($testBase + '\', [StringComparison]::OrdinalIgnoreCase)) {
    throw 'Test directory is outside the workspace.'
}
$sourceBat = Join-Path $SourceRoot 'windows-start.bat'
$sourceServer = Join-Path $SourceRoot 'server.py'
$sourcePython = Join-Path $SourceRoot 'python'
$utf8 = [Text.UTF8Encoding]::new($false)

# Fail on the original regression rather than silently normalizing the file.
$sourceText = [IO.File]::ReadAllText($sourceBat)
if ($sourceText -match '(?<!\r)\n') { throw 'BAT contains LF-only lines; cmd/GOTO can fail.' }

[IO.Directory]::CreateDirectory($testRoot) | Out-Null
[IO.Directory]::CreateDirectory((Join-Path $testRoot 'site')) | Out-Null
Copy-Item -LiteralPath $sourcePython -Destination $testRoot -Recurse
Copy-Item -LiteralPath $sourceServer -Destination (Join-Path $testRoot 'server.py')
Copy-Item -LiteralPath (Join-Path $SourceRoot 'version.txt') -Destination (Join-Path $testRoot 'version.txt')
[IO.File]::WriteAllText((Join-Path $testRoot 'site\index.html'), '<html>C5 isolated cached fixture</html>', $utf8)
[IO.File]::WriteAllText((Join-Path $testRoot 'site\watch.html'), '<html>watch fixture</html>', $utf8)

$reservePort = [Net.Sockets.TcpListener]::new([Net.IPAddress]::Loopback, 0)
$reservePort.Start()
$testPort = $reservePort.LocalEndpoint.Port
$reservePort.Stop()
$testUrl = 'http://127.0.0.1:' + $testPort

$batch = $sourceText.Replace('set "PORT=8080"', ('set "PORT=' + $testPort + '"'))
$batch = $batch.Replace(
    'set "API_URL=https://api.github.com/repos/%OWNER%/%REPO%/tags"',
    'set "API_URL=http://127.0.0.1:1/unavailable"'
)
# Only the default-browser dependency is replaced. The actual BAT branches,
# PowerShell readiness check and real embedded Python server are exercised.
$browserCall = "Start-Process -FilePath ('http://localhost:'+" + '$env:PORT' + ') -WindowStyle Normal'
$browserSpy = '[IO.File]::WriteAllText((Join-Path $env:ROOT_DIR ''browser-opened.txt''), ''ready'')'
if (-not $batch.Contains($browserCall)) { throw 'The browser seam was not found.' }
$batch = $batch.Replace($browserCall, $browserSpy)
$batch = $batch.Replace(
    'if "%OPEN_BROWSER%"=="1" start "" "http://localhost:%PORT%"',
    'if "%OPEN_BROWSER%"=="1" echo ready>browser-reopened.txt'
)
[IO.File]::WriteAllText((Join-Path $testRoot 'windows-start.bat'), $batch, $utf8)
$initialServerHash = (Get-FileHash -LiteralPath (Join-Path $testRoot 'server.py')).Hash

$started = [Collections.Generic.List[Diagnostics.Process]]::new()
$results = [Collections.Generic.List[object]]::new()
function Start-FixtureLauncher([string] $arguments = '') {
    $info = [Diagnostics.ProcessStartInfo]::new()
    $info.FileName = Join-Path $env:SystemRoot 'System32\cmd.exe'
    $info.Arguments = '/d /c windows-start.bat ' + $arguments
    $info.WorkingDirectory = $testRoot
    $info.UseShellExecute = $false
    $info.CreateNoWindow = $true
    $info.WindowStyle = [Diagnostics.ProcessWindowStyle]::Hidden
    $info.RedirectStandardOutput = $true
    $info.RedirectStandardError = $true
    $info.RedirectStandardInput = $true
    $process = [Diagnostics.Process]::Start($info)
    $process.StandardInput.WriteLine(' ')
    $process.StandardInput.Close()
    $started.Add($process)
    return $process
}
function Get-HttpBody([string] $url) {
    $response = Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 2
    return [string] $response.Content
}
function Save-FinishedOutput($process, [string] $name) {
    $output = $process.StandardOutput.ReadToEnd() + $process.StandardError.ReadToEnd()
    [IO.File]::WriteAllText((Join-Path $testRoot ($name + '.log')), $output, $utf8)
    return $output
}
try {
    $first = Start-FixtureLauncher
    $deadline = [DateTime]::UtcNow.AddSeconds(20)
    $healthy = $false
    while ([DateTime]::UtcNow -lt $deadline) {
        try { $healthy = (Get-HttpBody ($testUrl + '/')) -eq '<html>C5 isolated cached fixture</html>' } catch {}
        if ($healthy -and (Test-Path -LiteralPath (Join-Path $testRoot 'browser-opened.txt'))) { break }
        if ($first.HasExited) { throw ('Cold cache launch failed: ' + (Save-FinishedOutput $first 'cold-failed')) }
        Start-Sleep -Milliseconds 100
    }
    if (-not $healthy -or -not (Test-Path -LiteralPath (Join-Path $testRoot 'browser-opened.txt'))) {
        throw 'The cached site did not become ready before the browser seam.'
    }
    if ((Get-HttpBody ($testUrl + '/watch?id=42')) -ne '<html>watch fixture</html>') {
        throw 'The extensionless route is broken.'
    }
    $serverHash = (Get-FileHash -LiteralPath (Join-Path $testRoot 'server.py')).Hash
    if ($ExpectLegacyUpgrade -and $serverHash -eq $initialServerHash) { throw 'Legacy generated server.py was not upgraded.' }
    if ($ExpectCustomPreserved -and $serverHash -ne $initialServerHash) { throw 'Custom server.py was overwritten.' }
    $results.Add([pscustomobject]@{ name='cached-cold-start-no-network'; passed=$true })
    Write-Output 'cached-cold-start-no-network: PASS'

    $second = Start-FixtureLauncher
    if (-not $second.WaitForExit(10000)) { throw 'Repeat launch did not reuse the existing server.' }
    $secondOutput = Save-FinishedOutput $second 'repeat'
    if ($second.ExitCode -ne 0 -or -not $secondOutput.Contains('already running') -or
        -not (Test-Path -LiteralPath (Join-Path $testRoot 'browser-reopened.txt'))) {
        throw ('Repeat launch did not open the existing site: ' + $secondOutput)
    }
    $results.Add([pscustomobject]@{ name='repeat-reuses-existing-server'; passed=$true })
    Write-Output 'repeat-reuses-existing-server: PASS'

    $beforeIndex = (Get-FileHash -LiteralPath (Join-Path $testRoot 'site\index.html')).Hash
    $third = Start-FixtureLauncher '--update'
    if (-not $third.WaitForExit(15000)) { throw 'Offline update did not fall back to the cached site.' }
    $thirdOutput = Save-FinishedOutput $third 'offline-update'
    if ($third.ExitCode -ne 0 -or -not $thirdOutput.Contains('GitHub is unavailable') -or
        $beforeIndex -ne (Get-FileHash -LiteralPath (Join-Path $testRoot 'site\index.html')).Hash) {
        throw ('Offline update lost the cached site: ' + $thirdOutput)
    }
    $results.Add([pscustomobject]@{ name='update-unavailable-preserves-cache'; passed=$true })
    Write-Output 'update-unavailable-preserves-cache: PASS'
} finally {
    foreach ($launcher in $started) {
        $children = @(Get-CimInstance Win32_Process -Filter ('ParentProcessId=' + $launcher.Id) |
            Where-Object { $_.Name -eq 'python.exe' -and $_.ExecutablePath -eq (Join-Path $testRoot 'python\python.exe') })
        foreach ($child in $children) { Stop-Process -Id $child.ProcessId -Force -ErrorAction SilentlyContinue }
        if (-not $launcher.HasExited) {
            if (-not $launcher.WaitForExit(3000)) { $launcher.Kill() }
        }
    }
    [IO.File]::WriteAllText((Join-Path $testRoot 'results.json'), ($results | ConvertTo-Json -Depth 4), $utf8)
    Write-Output ('Fixture evidence: ' + $testRoot)
}
