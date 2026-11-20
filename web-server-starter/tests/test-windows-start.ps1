param([string] $PythonDirectory = '')
$ErrorActionPreference = 'Stop'
$utf8 = [Text.UTF8Encoding]::new($false)
$launcher = [IO.Path]::GetFullPath((Join-Path $PSScriptRoot '..\windows-start.bat'))
$batch = [IO.File]::ReadAllText($launcher)
if ($batch -match '(?<!\r)\n') { throw 'BAT must contain CRLF line endings.' }
$testBase = [IO.Path]::GetFullPath((Join-Path ([IO.Path]::GetTempPath()) 'kinofree-windows-launcher-tests'))
$sourceRoot = [IO.Path]::GetFullPath((Join-Path $testBase ('source-' + [guid]::NewGuid().ToString('N'))))
if (-not $sourceRoot.StartsWith($testBase + '\', [StringComparison]::OrdinalIgnoreCase)) { throw 'Fixture source escaped the test directory.' }
[IO.Directory]::CreateDirectory($sourceRoot) | Out-Null
if ([string]::IsNullOrWhiteSpace($PythonDirectory)) {
    $version = [regex]::Match($batch, '(?m)^set "PYTHON_VERSION=([0-9.]+)"').Groups[1].Value
    if (-not $version) { throw 'Could not find the configured Python version.' }
    $archive = Join-Path $sourceRoot 'python.zip'
    $ProgressPreference = 'SilentlyContinue'
    Invoke-WebRequest -UseBasicParsing -Uri ('https://www.python.org/ftp/python/' + $version + '/python-' + $version + '-embed-amd64.zip') -OutFile $archive -TimeoutSec 60
    Expand-Archive -LiteralPath $archive -DestinationPath (Join-Path $sourceRoot 'python') -Force
} else {
    $PythonDirectory = [IO.Path]::GetFullPath($PythonDirectory)
    if (-not (Test-Path -LiteralPath (Join-Path $PythonDirectory 'python.exe') -PathType Leaf)) { throw 'PythonDirectory must contain an embeddable python.exe.' }
    Copy-Item -LiteralPath $PythonDirectory -Destination (Join-Path $sourceRoot 'python') -Recurse
}
[IO.File]::WriteAllText((Join-Path $sourceRoot 'windows-start.bat'), $batch, $utf8)
Copy-Item -LiteralPath (Join-Path $PSScriptRoot 'fixtures\legacy-server.py') -Destination (Join-Path $sourceRoot 'server.py')
[IO.File]::WriteAllText((Join-Path $sourceRoot 'version.txt'), 'v-fixture', $utf8)
Write-Output 'Checking cached startup and automatic legacy server upgrade.'
& (Join-Path $PSScriptRoot 'test-cached-start.ps1') -SourceRoot $sourceRoot -ExpectLegacyUpgrade
$customServer = '# Custom server fixture; preserve this file.' + "`r`n" + [IO.File]::ReadAllText((Join-Path $PSScriptRoot 'fixtures\legacy-server.py')).Replace('import os', 'import os' + "`r`n" + 'import sys').Replace('PORT = 8080', 'PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 8080')
[IO.File]::WriteAllText((Join-Path $sourceRoot 'server.py'), $customServer, $utf8)
Write-Output 'Checking that a custom server.py is preserved.'
& (Join-Path $PSScriptRoot 'test-cached-start.ps1') -SourceRoot $sourceRoot -ExpectCustomPreserved
Write-Output 'Checking bootstrap and website updates against local fixtures.'
& (Join-Path $PSScriptRoot 'test-bootstrap.ps1') -SourceRoot $sourceRoot
Write-Output 'Windows launcher: all 10 isolated scenarios passed.'
