$content = Get-Content 'd:\hbd\app.jsx' -Raw -Encoding UTF8
$content = $content -replace '/memoriii\.jpg', '/making-memories.png'
Set-Content 'd:\hbd\app.jsx' -Value $content -Encoding UTF8 -NoNewline
Write-Host "Updated successfully"
