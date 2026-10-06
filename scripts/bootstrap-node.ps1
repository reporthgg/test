$ErrorActionPreference = "Stop"
$ProgressPreference = "SilentlyContinue"

if (-not [Environment]::Is64BitOperatingSystem) {
    throw "The local Node runtime requires 64-bit Windows."
}

$projectRoot = Split-Path -Parent $PSScriptRoot
$runtimeRoot = Join-Path $projectRoot "data\node-runtime"
$releases = Invoke-RestMethod -Uri "https://nodejs.org/dist/index.json" -TimeoutSec 60
$release = $releases | Where-Object { $_.version -match "^v22\.\d+\.\d+$" } | Select-Object -First 1
if (-not $release) {
    throw "The official Node.js index did not return a stable Node 22 release."
}

$archiveName = "node-$($release.version)-win-x64.zip"
$runtimePath = Join-Path $runtimeRoot "node-$($release.version)-win-x64"
$nodePath = Join-Path $runtimePath "node.exe"
$npmPath = Join-Path $runtimePath "npm.cmd"

if (-not (Test-Path -LiteralPath $nodePath) -or -not (Test-Path -LiteralPath $npmPath)) {
    New-Item -ItemType Directory -Path $runtimeRoot -Force | Out-Null
    $archivePath = Join-Path $runtimeRoot $archiveName
    $releaseUrl = "https://nodejs.org/dist/$($release.version)"
    $checksums = (Invoke-WebRequest -UseBasicParsing -Uri "$releaseUrl/SHASUMS256.txt" -TimeoutSec 60).Content
    $checksumPattern = "(?m)^([a-f0-9]{64})\s+" + [regex]::Escape($archiveName) + "\r?$"
    $checksumMatch = [regex]::Match($checksums, $checksumPattern)
    if (-not $checksumMatch.Success) {
        throw "The official Node.js checksum was not found for $archiveName."
    }

    Write-Output "Downloading $archiveName"
    Invoke-WebRequest -UseBasicParsing -Uri "$releaseUrl/$archiveName" -OutFile $archivePath -TimeoutSec 300
    $actualHash = (Get-FileHash -LiteralPath $archivePath -Algorithm SHA256).Hash
    if ($actualHash -ne $checksumMatch.Groups[1].Value) {
        throw "The Node.js archive checksum does not match the official checksum."
    }

    Write-Output "Extracting $archiveName"
    Expand-Archive -LiteralPath $archivePath -DestinationPath $runtimeRoot -Force
    Remove-Item -LiteralPath $archivePath
}

$env:Path = "$runtimePath;$env:Path"
Write-Output "Node: $nodePath"
& $nodePath --version
if ($LASTEXITCODE -ne 0) {
    throw "The local Node.js runtime failed to start."
}
Write-Output "npm: $npmPath"
& $npmPath --version
if ($LASTEXITCODE -ne 0) {
    throw "The local npm runtime failed to start."
}
