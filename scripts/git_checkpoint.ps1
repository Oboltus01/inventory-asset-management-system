param(
    [string]$Message = "",
    [switch]$NoPush
)

$ErrorActionPreference = "Stop"

Write-Host ""
Write-Host "=== Git Checkpoint Script ===" -ForegroundColor Cyan
Write-Host ""

# Check that current folder is inside a Git repository
git rev-parse --is-inside-work-tree *> $null

if ($LASTEXITCODE -ne 0) {
    Write-Host "Error: current folder is not a Git repository." -ForegroundColor Red
    exit 1
}

$branch = git branch --show-current

Write-Host "Current branch: $branch" -ForegroundColor Yellow
Write-Host ""

Write-Host "Current status:" -ForegroundColor Cyan
git status --short
Write-Host ""

$changes = git status --porcelain

if (-not $changes) {
    Write-Host "No local changes to commit." -ForegroundColor Green

    if (-not $NoPush) {
        Write-Host ""
        Write-Host "Checking if local commits need to be pushed..." -ForegroundColor Cyan
        git push origin $branch
    }

    Write-Host ""
    Write-Host "Final status:" -ForegroundColor Cyan
    git status

    exit 0
}

if ([string]::IsNullOrWhiteSpace($Message)) {
    $Message = Read-Host "Enter commit message"
}

if ([string]::IsNullOrWhiteSpace($Message)) {
    Write-Host "Error: commit message cannot be empty." -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "Adding files..." -ForegroundColor Cyan
git add .

if ($LASTEXITCODE -ne 0) {
    Write-Host "Error: git add failed." -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "Creating commit..." -ForegroundColor Cyan
git commit -m "$Message"

if ($LASTEXITCODE -ne 0) {
    Write-Host "Error: git commit failed." -ForegroundColor Red
    exit 1
}

if (-not $NoPush) {
    Write-Host ""
    Write-Host "Pushing to origin/$branch..." -ForegroundColor Cyan
    git push origin $branch

    if ($LASTEXITCODE -ne 0) {
        Write-Host "Error: git push failed." -ForegroundColor Red
        exit 1
    }
}

Write-Host ""
Write-Host "Final status:" -ForegroundColor Cyan
git status

Write-Host ""
Write-Host "Checkpoint completed successfully." -ForegroundColor Green