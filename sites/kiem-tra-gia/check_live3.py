import urllib.request
url = 'https://tools.ducthinhmaterials.com/kiem-tra-gia/vi.html'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'})
resp = urllib.request.urlopen(req)
html = resp.read().decode('utf-8')
# Check for pricelist tab content or mainContainer
if 'mainContainer' in html:
    print('CONTAINS mainContainer')
if 'pricelist' in html:
    print('CONTAINS pricelist')
if 'renderPriceTab' in html:
    print('CONTAINS renderPriceTab')
if 'switchTab' in html:
    print('CONTAINS switchTab')
# Check for the broken regex pattern
if '//(vi|en|zh)' in html:
    print('WARNING: Broken regex pattern still in live!')
else:
    print('OK: No broken regex pattern')

# Count some key identifiers
for term in ['tab-buttons','price-mode-bar','searchBox','manage-panel']:
    count = html.count(term)
    print(f'{term}: {count} occurrences')
