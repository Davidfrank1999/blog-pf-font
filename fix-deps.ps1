Write-Host "🔄 Fixing dependencies... Killing Node processes first"
taskkill /f /im node.exe 2>$null

Write-Host "🗑️ Removing node_modules"
Remove-Item -Recurse -Force .\node_modules\ 2>$null

Write-Host "🗑️ Removing package-lock.json"
Remove-Item -Force .\package-lock.json 2>$null

Write-Host "📦 Installing dependencies fresh..."
npm install

Write-Host "DONE! You can now run: npm run dev"
