# Git Push Helper Script
# Refresh environment variables and push code

Write-Host "Refreshing environment variables..." -ForegroundColor Cyan
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")

Write-Host "Checking Git status..." -ForegroundColor Cyan
git status

Write-Host "`nPushing to GitHub..." -ForegroundColor Cyan
git push

if ($LASTEXITCODE -eq 0) {
    Write-Host "`nSuccess! Code pushed to GitHub." -ForegroundColor Green
} else {
    Write-Host "`nFailed! Please check network connection." -ForegroundColor Red
    Write-Host "You can retry later: git push" -ForegroundColor Yellow
}
