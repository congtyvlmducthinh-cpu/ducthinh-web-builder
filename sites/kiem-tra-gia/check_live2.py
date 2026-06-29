import urllib.request, os
url = 'https://tools.ducthinhmaterials.com/kiem-tra-gia/vi.html'
req = urllib.request.Request(url, headers={
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    'Cache-Control': 'no-cache'
})
resp = urllib.request.urlopen(req)
html = resp.read().decode('utf-8')
with open('C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/vi_live.html','w',encoding='utf-8') as f:
    f.write(html)
print('Downloaded', len(html), 'chars')
# Check if regex line has our fix
idx = html.find('detectCurrentLang')
if idx > 0:
    snippet = html[idx:idx+100]
    print('Live detectCurrentLang:', snippet)
