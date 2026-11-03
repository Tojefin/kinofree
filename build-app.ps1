param(
	[ValidateSet('desktop', 'android', 'all')]
	[string]$Target = 'desktop'
)

# --- Toolchain paths (one-time setup, already installed) ---
$CargoBin    = "$env:USERPROFILE\.cargo\bin"
$JavaHome    = "$env:LOCALAPPDATA\Java\jdk-17.0.20.1+1"
$AndroidHome = "$env:LOCALAPPDATA\Android\Sdk"
$NdkHome     = "$AndroidHome\ndk\27.0.12077973"

$env:Path         = "$CargoBin;$JavaHome\bin;$env:Path"
$env:JAVA_HOME    = $JavaHome
$env:ANDROID_HOME = $AndroidHome
$env:NDK_HOME     = $NdkHome

# --- Updater signing (desktop) ---
$env:TAURI_SIGNING_PRIVATE_KEY          = "$env:USERPROFILE\.tauri\kinofree-updater.key"
$env:TAURI_SIGNING_PRIVATE_KEY_PASSWORD = ''

# --- Release apk signing ---
$env:TAURI_ANDROID_KEY_ALIAS      = 'android'
$env:TAURI_ANDROID_KEY_PASSWORD   = 'kinofree'
$env:TAURI_ANDROID_STORE_FILE     = "$env:USERPROFILE\.tauri\kinofree-android.keystore"
$env:TAURI_ANDROID_STORE_PASSWORD = 'kinofree'

if ($Target -eq 'desktop' -or $Target -eq 'all') {
	Write-Host '=== Building Windows exe ===' -ForegroundColor Cyan
	npm.cmd run tauri -- build
	if ($LASTEXITCODE -ne 0) { exit 1 }
	Write-Host 'Artifacts: src-tauri\target\release\bundle\nsis\' -ForegroundColor Green
}

if ($Target -eq 'android' -or $Target -eq 'all') {
	Write-Host '=== Building Android apk ===' -ForegroundColor Cyan
	npm.cmd run tauri -- android build --apk
	if ($LASTEXITCODE -ne 0) { exit 1 }

	# Rename apk to Kinofree_<version>.apk
	$version = (Get-Content package.json -Raw | ConvertFrom-Json).version
	$apkDir = 'src-tauri\gen\android\app\build\outputs\apk\universal\release'
	if (Test-Path "$apkDir\app-universal-release.apk") {
		Move-Item "$apkDir\app-universal-release.apk" "$apkDir\Kinofree_${version}.apk" -Force
	}
	Write-Host "Artifact: $apkDir\Kinofree_${version}.apk" -ForegroundColor Green
}
