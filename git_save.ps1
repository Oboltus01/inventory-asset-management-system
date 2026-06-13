$Message = Read-Host "Commit message"

if ([string]::IsNullOrWhiteSpace($Message)) {
    $Message = "Update project"
}

git pull
git add .
git status
git commit -m $Message
git push

Write-Host "Done." -ForegroundColor Green