$content = Get-Content 'd:\hbd\app.jsx' -Raw -Encoding UTF8
$pattern = '<div className="cake-top">[^<]*</div>\s*<div className="cake-candles">[^<]*</div>'
$replacement = '<img src="/birthday-cake.png" alt="Birthday Cake" className="cake-image" />'
$content = $content -replace $pattern, $replacement
Set-Content 'd:\hbd\app.jsx' -Value $content -Encoding UTF8 -NoNewline
