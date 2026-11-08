$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.IO.Compression
Add-Type -AssemblyName System.IO.Compression.FileSystem

$siteRoot = $PSScriptRoot
$exportRoot = Join-Path $siteRoot 'out'
if (-not (Test-Path -LiteralPath (Join-Path $exportRoot 'index.html'))) { throw 'Run npm run build before packaging the website.' }
$releasePath = Join-Path $siteRoot 'release'
New-Item -ItemType Directory -Path $releasePath -Force | Out-Null
$archivePath = Join-Path $releasePath 'velkira-sundays-hosting.zip'
$publicFiles = @(Get-ChildItem -LiteralPath $exportRoot -File -Recurse)

$zipStream = [System.IO.File]::Open($archivePath,[System.IO.FileMode]::Create)
try {
    $zipWriter = New-Object System.IO.Compression.ZipArchive($zipStream,[System.IO.Compression.ZipArchiveMode]::Create)
    try {
        foreach ($publicFile in $publicFiles) {
            if (-not $publicFile.FullName.StartsWith($exportRoot + '\')) { throw 'File outside export root.' }
            if ($publicFile.Length -gt 25MB) { throw "Asset exceeds 25 MiB: $($publicFile.Name)" }
            $entryName = $publicFile.FullName.Substring($exportRoot.Length + 1).Replace('\','/')
            [System.IO.Compression.ZipFileExtensions]::CreateEntryFromFile($zipWriter,$publicFile.FullName,$entryName,[System.IO.Compression.CompressionLevel]::Optimal) | Out-Null
        }
    } finally { if ($zipWriter) { $zipWriter.Dispose() } }
} finally { $zipStream.Dispose() }

$package = [System.IO.Compression.ZipFile]::OpenRead($archivePath)
try {
    $names = $package.Entries.FullName
    foreach ($required in @('index.html','demos/sunsdays/index.html','demos/sunsdays/assets/hero-v1.webm','demos/luma-support/index.html','assets/concepts/luma-support.svg')) {
        if ($names -notcontains $required) { throw "Package missing $required" }
    }
    if ($names -match '(^|/)(\.git|dokumen|tests|release)/') { throw 'Internal files found in package.' }
    if ($names.Count -gt 1000) { throw 'Package exceeds dashboard upload file limit.' }
    Write-Output "ZIP verified: $($names.Count) files. $archivePath"
} finally { $package.Dispose() }
