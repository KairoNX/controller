# Fix Prisma Generate - Kill Node processes and regenerate
Write-Host "Stopping Node processes..." -ForegroundColor Yellow
Get-Process -Name node -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
Start-Sleep -Seconds 2
Write-Host "Running Prisma Generate..." -ForegroundColor Green
npx prisma generate

