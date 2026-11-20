param([Parameter(Mandatory=$true)][string] $SourceRoot)
$ErrorActionPreference = 'Stop'
$workspace = [IO.Path]::GetFullPath((Join-Path $PSScriptRoot '..'))
$testBase = [IO.Path]::GetFullPath((Join-Path ([IO.Path]::GetTempPath()) 'kinofree-windows-launcher-tests'))
$testRoot = [IO.Path]::GetFullPath((Join-Path $testBase ('c5-bootstrap-' + [guid]::NewGuid().ToString('N'))))
if (-not $testRoot.StartsWith($testBase + '\', [StringComparison]::OrdinalIgnoreCase)) {
    throw 'Bootstrap fixture escaped the workspace.'
}
$utf8 = [Text.UTF8Encoding]::new($false)
$apiRoot = Join-Path $testRoot 'api'
$emptyRoot = Join-Path $testRoot 'empty install (test)'
$siteBuild = Join-Path $testRoot 'source\build'
foreach ($dir in @($apiRoot, $emptyRoot, $siteBuild)) {
    [IO.Directory]::CreateDirectory($dir) | Out-Null
}
[IO.File]::WriteAllText((Join-Path $siteBuild 'index.html'), '<html>Fresh fixture install</html>', $utf8)
[IO.File]::WriteAllText((Join-Path $siteBuild 'watch.html'), '<html>Fresh watch fixture</html>', $utf8)
[IO.File]::WriteAllText((Join-Path $apiRoot 'tags.json'), '[{"name":"v-fixture"}]', $utf8)
Add-Type -AssemblyName System.IO.Compression.FileSystem
[IO.Compression.ZipFile]::CreateFromDirectory((Join-Path $testRoot 'source'), (Join-Path $apiRoot 'site.zip'))
[IO.Compression.ZipFile]::CreateFromDirectory((Join-Path $SourceRoot 'python'), (Join-Path $apiRoot 'python.zip'))

function Free-Port {
    $socket = [Net.Sockets.TcpListener]::new([Net.IPAddress]::Loopback, 0)
    $socket.Start()
    $port = $socket.LocalEndpoint.Port
    $socket.Stop()
    return $port
}
$apiPort = Free-Port
$sitePort = Free-Port
$apiUrl = 'http://127.0.0.1:' + $apiPort
$siteUrl = 'http://127.0.0.1:' + $sitePort
$bat = [IO.File]::ReadAllText((Join-Path $SourceRoot 'windows-start.bat'))
if ($bat -match '(?<!\r)\n') { throw 'Source BAT must use CRLF.' }
$bat = $bat.Replace('set "PORT=8080"', ('set "PORT=' + $sitePort + '"'))
$bat = $bat.Replace('set "API_URL=https://api.github.com/repos/%OWNER%/%REPO%/tags"', ('set "API_URL=' + $apiUrl + '/tags.json"'))
$bat = $bat.Replace('set "SITE_URL=https://github.com/%OWNER%/%REPO%/archive/refs/heads/%BRANCH%.zip"', ('set "SITE_URL=' + $apiUrl + '/site.zip"'))
$bat = $bat.Replace('set "PYTHON_URL=https://www.python.org/ftp/python/%PYTHON_VERSION%/python-%PYTHON_VERSION%-embed-%PYTHON_ARCH%.zip"', ('set "PYTHON_URL=' + $apiUrl + '/python.zip"'))
$browserCall = "Start-Process -FilePath ('http://localhost:'+" + '$env:PORT' + ') -WindowStyle Normal'
$bat = $bat.Replace($browserCall, '[IO.File]::WriteAllText((Join-Path $env:ROOT_DIR ''browser-opened.txt''), ''ready'')')
$bat = $bat.Replace('if "%OPEN_BROWSER%"=="1" start "" "http://localhost:%PORT%"', 'if "%OPEN_BROWSER%"=="1" echo ready>browser-reopened.txt')
[IO.File]::WriteAllText((Join-Path $emptyRoot 'windows-start.bat'), $bat, $utf8)

function Start-ProcessFixture([string] $file, [string] $arguments, [string] $directory) {
    $info = [Diagnostics.ProcessStartInfo]::new()
    $info.FileName = $file
    $info.Arguments = $arguments
    $info.WorkingDirectory = $directory
    $info.UseShellExecute = $false
    $info.CreateNoWindow = $true
    $info.WindowStyle = [Diagnostics.ProcessWindowStyle]::Hidden
    $info.RedirectStandardOutput = $true
    $info.RedirectStandardError = $true
    $info.RedirectStandardInput = $true
    $process = [Diagnostics.Process]::Start($info)
    $process.StandardInput.WriteLine(' ')
    $process.StandardInput.Close()
    return $process
}
function Read-Url([string] $url) {
    return [string] (Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 2).Content
}
$apiProcess = $null
$first = $null
$second = $null
$results = [Collections.Generic.List[object]]::new()
try {
    $apiProcess = Start-ProcessFixture (Join-Path $SourceRoot 'python\python.exe') (
        '-m http.server ' + $apiPort + ' --bind 127.0.0.1 --directory "' + $apiRoot + '"'
    ) $apiRoot
    $apiDeadline = [DateTime]::UtcNow.AddSeconds(8)
    while ([DateTime]::UtcNow -lt $apiDeadline) {
        try { if ((Read-Url ($apiUrl + '/tags.json')).Contains('v-fixture')) { break } } catch {}
        Start-Sleep -Milliseconds 100
    }
    $first = Start-ProcessFixture (Join-Path $env:SystemRoot 'System32\cmd.exe') '/d /c windows-start.bat' $emptyRoot
    $deadline = [DateTime]::UtcNow.AddSeconds(45)
    $installed = $false
    while ([DateTime]::UtcNow -lt $deadline) {
        try { $installed = (Read-Url ($siteUrl + '/')) -eq '<html>Fresh fixture install</html>' } catch {}
        if ($installed -and (Test-Path -LiteralPath (Join-Path $emptyRoot 'browser-opened.txt'))) { break }
        if ($first.HasExited) {
            throw ('Empty install failed: ' + $first.StandardOutput.ReadToEnd() + $first.StandardError.ReadToEnd())
        }
        Start-Sleep -Milliseconds 100
    }
    if (-not $installed -or -not (Test-Path -LiteralPath (Join-Path $emptyRoot 'python\python.exe')) -or
        (Get-Content -LiteralPath (Join-Path $emptyRoot 'version.txt') -Raw).Trim() -ne 'v-fixture') {
        throw 'Fresh installation did not produce a ready site, Python and version.'
    }
    $results.Add([pscustomobject]@{ name='empty-folder-local-downloads'; passed=$true })
    Write-Output 'empty-folder-local-downloads: PASS'

    # Invalid update archive must leave the cached site intact.
    $badRoot = Join-Path $testRoot 'bad\build'
    [IO.Directory]::CreateDirectory($badRoot) | Out-Null
    [IO.File]::WriteAllText((Join-Path $badRoot 'not-index.txt'), 'invalid update', $utf8)
    $badZip = Join-Path $apiRoot 'bad-site.zip'
    [IO.Compression.ZipFile]::CreateFromDirectory((Join-Path $testRoot 'bad'), $badZip)
    [IO.File]::WriteAllText((Join-Path $apiRoot 'tags.json'), '[{"name":"v-fixture-2"}]', $utf8)
    $badBatch = $bat.Replace('/site.zip"', '/bad-site.zip"')
    [IO.File]::WriteAllText((Join-Path $emptyRoot 'windows-start.bat'), $badBatch, $utf8)
    $before = (Get-FileHash -LiteralPath (Join-Path $emptyRoot 'site\index.html')).Hash
    $second = Start-ProcessFixture (Join-Path $env:SystemRoot 'System32\cmd.exe') '/d /c windows-start.bat --update' $emptyRoot
    if (-not $second.WaitForExit(20000)) { throw 'Failed update did not return to the cached site.' }
    $output = $second.StandardOutput.ReadToEnd() + $second.StandardError.ReadToEnd()
    [IO.File]::WriteAllText((Join-Path $testRoot 'bad-update.log'), $output, $utf8)
    if ($second.ExitCode -ne 0 -or -not $output.Contains('Update failed') -or
        $before -ne (Get-FileHash -LiteralPath (Join-Path $emptyRoot 'site\index.html')).Hash -or
        (Read-Url ($siteUrl + '/')) -ne '<html>Fresh fixture install</html>') {
        throw ('Invalid update damaged the cached site: ' + $output)
    }
    $results.Add([pscustomobject]@{ name='invalid-update-preserves-cache'; passed=$true })
    Write-Output 'invalid-update-preserves-cache: PASS'

    # Exercise the successful replacement of an existing installation.
    $updatedRoot = Join-Path $testRoot 'updated\build'
    [IO.Directory]::CreateDirectory($updatedRoot) | Out-Null
    [IO.File]::WriteAllText((Join-Path $updatedRoot 'index.html'), '<html>Updated fixture install</html>', $utf8)
    [IO.Compression.ZipFile]::CreateFromDirectory((Join-Path $testRoot 'updated'), (Join-Path $apiRoot 'updated-site.zip'))
    [IO.File]::WriteAllText((Join-Path $apiRoot 'tags.json'), '[{"name":"v-fixture-3"}]', $utf8)
    [IO.File]::WriteAllText((Join-Path $emptyRoot 'windows-start.bat'), $bat.Replace('/site.zip"', '/updated-site.zip"'), $utf8)
    $second = Start-ProcessFixture (Join-Path $env:SystemRoot 'System32\cmd.exe') '/d /c windows-start.bat --update' $emptyRoot
    if (-not $second.WaitForExit(20000)) { throw 'Valid update did not finish.' }
    $updateOutput = $second.StandardOutput.ReadToEnd() + $second.StandardError.ReadToEnd()
    [IO.File]::WriteAllText((Join-Path $testRoot 'valid-update.log'), $updateOutput, $utf8)
    if ($second.ExitCode -ne 0 -or (Read-Url ($siteUrl + '/')) -ne '<html>Updated fixture install</html>' -or
        (Get-Content -LiteralPath (Join-Path $emptyRoot 'version.txt') -Raw).Trim() -ne 'v-fixture-3') {
        throw ('Valid update did not replace the site safely: ' + $updateOutput)
    }
    $results.Add([pscustomobject]@{ name='valid-update-replaces-existing-site'; passed=$true })
    Write-Output 'valid-update-replaces-existing-site: PASS'

    # Unsafe archive paths are rejected before touching the active site.
    $unsafeZip = [IO.Compression.ZipFile]::Open((Join-Path $apiRoot 'unsafe-site.zip'), [IO.Compression.ZipArchiveMode]::Create)
    try {
        $unsafeEntry = $unsafeZip.CreateEntry('../../outside-fixture.txt')
        $unsafeWriter = [IO.StreamWriter]::new($unsafeEntry.Open())
        try { $unsafeWriter.Write('must not extract') } finally { $unsafeWriter.Dispose() }
    } finally { $unsafeZip.Dispose() }
    [IO.File]::WriteAllText((Join-Path $apiRoot 'tags.json'), '[{"name":"v-fixture-4"}]', $utf8)
    [IO.File]::WriteAllText((Join-Path $emptyRoot 'windows-start.bat'), $bat.Replace('/site.zip"', '/unsafe-site.zip"'), $utf8)
    $second = Start-ProcessFixture (Join-Path $env:SystemRoot 'System32\cmd.exe') '/d /c windows-start.bat --update' $emptyRoot
    if (-not $second.WaitForExit(20000)) { throw 'Unsafe archive rejection did not finish.' }
    $unsafeOutput = $second.StandardOutput.ReadToEnd() + $second.StandardError.ReadToEnd()
    [IO.File]::WriteAllText((Join-Path $testRoot 'unsafe-update.log'), $unsafeOutput, $utf8)
    if ($second.ExitCode -ne 0 -or -not $unsafeOutput.Contains('Unsafe archive entry') -or
        (Read-Url ($siteUrl + '/')) -ne '<html>Updated fixture install</html>' -or
        (Test-Path -LiteralPath (Join-Path $testRoot 'outside-fixture.txt'))) {
        throw ('Unsafe archive was not rejected: ' + $unsafeOutput)
    }
    $results.Add([pscustomobject]@{ name='unsafe-zip-path-rejected'; passed=$true })
    Write-Output 'unsafe-zip-path-rejected: PASS'
} finally {
    if ($first) {
        $children = @(Get-CimInstance Win32_Process -Filter ('ParentProcessId=' + $first.Id) |
            Where-Object { $_.Name -eq 'python.exe' -and $_.ExecutablePath -eq (Join-Path $emptyRoot 'python\python.exe') })
        foreach ($child in $children) { Stop-Process -Id $child.ProcessId -Force -ErrorAction SilentlyContinue }
        if (-not $first.HasExited -and -not $first.WaitForExit(3000)) { $first.Kill() }
    }
    if ($second -and -not $second.HasExited) { $second.Kill() }
    if ($apiProcess -and -not $apiProcess.HasExited) { $apiProcess.Kill() }
    [IO.File]::WriteAllText((Join-Path $testRoot 'results.json'), ($results | ConvertTo-Json -Depth 4), $utf8)
    Write-Output ('Bootstrap evidence: ' + $testRoot)
}
