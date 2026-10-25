$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.IO.Compression
Add-Type -AssemblyName System.IO.Compression.FileSystem

$siteRoot = $PSScriptRoot
$releasePath = Join-Path $siteRoot 'release'
New-Item -ItemType Directory -Path $releasePath -Force | Out-Null
$archivePath = Join-Path $releasePath 'velkira-sundays-hosting.zip'
$publicFiles = @('index.html','styles.css','script.js','animations.js','hero-video.js','config.js') | ForEach-Object { Get-Item -LiteralPath (Join-Path $siteRoot $_) }
$publicFiles += @(Get-ChildItem -LiteralPath (Join-Path $siteRoot 'assets'),(Join-Path $siteRoot 'demos') -File -Recurse)

$zipStream = [System.IO.File]::Open($archivePath,[System.IO.FileMode]::Create)
try {
    $zipWriter = New-Object System.IO.Compression.ZipArchive($zipStream,[System.IO.Compression.ZipArchiveMode]::Create)
    try {
        foreach ($publicFile in $publicFiles) {
            if (-not $publicFile.FullName.StartsWith($siteRoot + '\')) { throw 'File outside website root.' }
            if ($publicFile.Length -gt 25MB) { throw "Asset exceeds 25 MiB: $($publicFile.Name)" }
            $entryName = $publicFile.FullName.Substring($siteRoot.Length + 1).Replace('\','/')
            [System.IO.Compression.ZipFileExtensions]::CreateEntryFromFile($zipWriter,$publicFile.FullName,$entryName,[System.IO.Compression.CompressionLevel]::Optimal) | Out-Null
        }
    } finally { if ($zipWriter) { $zipWriter.Dispose() } }
} finally { $zipStream.Dispose() }

$package = [System.IO.Compression.ZipFile]::OpenRead($archivePath)
try {
    $names = $package.Entries.FullName
    foreach ($required in @('index.html','demos/sunsdays/index.html','demos/sunsdays/assets/hero-v1.webm')) {
        if ($names -notcontains $required) { throw "Package missing $required" }
    }
    if ($names -match '(^|/)(\.git|dokumen|tests|release)/') { throw 'Internal files found in package.' }
    if ($names.Count -gt 1000) { throw 'Package exceeds dashboard upload file limit.' }
    Write-Output "ZIP verified: $($names.Count) files. $archivePath"
} finally { $package.Dispose() }
