[CmdletBinding()]
param(
    [Parameter(Mandatory)][ValidatePattern('^[a-zA-Z0-9.-]+$')][string]$Server,
    [ValidatePattern('^[a-zA-Z0-9_-]+$')][string]$User = 'root',
    [string]$IdentityFile = (Join-Path $env:USERPROFILE '.ssh\aquacore_deploy_ed25519'),
    [ValidateRange(1, 65535)][int]$Port = 22,
    [switch]$SkipBuild
)

$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path $PSScriptRoot -Parent
$releaseId = [DateTime]::UtcNow.ToString('yyyyMMddTHHmmssZ') + '-' + ([guid]::NewGuid().ToString('N').Substring(0, 8))
$stage = Join-Path ([IO.Path]::GetTempPath()) "aquacore-$releaseId"
$archive = Join-Path $stage 'site.tar.gz'
$remoteStage = "/tmp/aquacore-$releaseId"
$target = "$User@$Server"
$sshOptions = @('-i', $IdentityFile, '-p', "$Port", '-o', 'BatchMode=yes', '-o', 'ConnectTimeout=15', '-o', 'StrictHostKeyChecking=yes')

function Assert-Exit([string]$Operation) {
    if ($LASTEXITCODE -ne 0) { throw "$Operation failed (exit $LASTEXITCODE)." }
}

if (!(Test-Path -LiteralPath $IdentityFile)) { throw "SSH key not found: $IdentityFile" }
# Fail before building/uploading if authentication or root access is unavailable.
& ssh @sshOptions $target 'test "$(id -u)" = 0'
Assert-Exit 'SSH root access check'

Push-Location $projectRoot
try {
    if (!$SkipBuild) {
        & npm run build
        Assert-Exit 'Production build'
    }
    if (!(Test-Path -LiteralPath (Join-Path $projectRoot 'dist\index.html'))) { throw 'dist/index.html is missing.' }
    New-Item -ItemType Directory -Path $stage | Out-Null
    # Normalize shell scripts even if Git checks them out as CRLF on Windows.
    foreach ($name in @('bootstrap.sh', 'activate-release.sh', 'nginx.conf', 'security.conf')) {
        $text = [IO.File]::ReadAllText((Join-Path $projectRoot "deploy\$name")).Replace("`r`n", "`n")
        [IO.File]::WriteAllText((Join-Path $stage $name), $text, [Text.UTF8Encoding]::new($false))
    }
    & tar -czf $archive -C (Join-Path $projectRoot 'dist') .
    Assert-Exit 'Archive build'
    $digest = (Get-FileHash -LiteralPath $archive -Algorithm SHA256).Hash.ToLowerInvariant()
    & ssh @sshOptions $target "install -d -m 700 $remoteStage"
    Assert-Exit 'Remote staging'
    & scp -i $IdentityFile -P $Port -o BatchMode=yes -o StrictHostKeyChecking=yes $archive (Join-Path $stage 'bootstrap.sh') (Join-Path $stage 'activate-release.sh') (Join-Path $stage 'nginx.conf') (Join-Path $stage 'security.conf') "${target}:${remoteStage}/"
    Assert-Exit 'Upload'
    $remoteCommand = "set -eu; cd $remoteStage; echo '$digest  site.tar.gz' | sha256sum -c -; bash bootstrap.sh; install -d -m 755 /var/www/aquacore/releases/$releaseId; tar -xzf site.tar.gz -C /var/www/aquacore/releases/$releaseId; bash activate-release.sh $releaseId; rm -f $remoteStage/site.tar.gz"
    & ssh @sshOptions $target $remoteCommand
    Assert-Exit 'Release activation'
    Write-Host "Deployed $releaseId to $Server. Verify DNS and HTTPS before announcing the domain."
} finally {
    Pop-Location
    # The resolved directory must be exactly the unique temp staging directory.
    if (Test-Path -LiteralPath $stage) {
        $resolvedStage = (Resolve-Path -LiteralPath $stage).Path
        $tempRoot = [IO.Path]::GetFullPath([IO.Path]::GetTempPath()).TrimEnd('\')
        if ((Split-Path $resolvedStage -Parent) -eq $tempRoot -and (Split-Path $resolvedStage -Leaf) -eq "aquacore-$releaseId") {
            Remove-Item -LiteralPath $resolvedStage -Recurse -Force
        }
    }
}
