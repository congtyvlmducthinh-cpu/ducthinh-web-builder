import sys, re
sys.stdout.reconfigure(encoding='utf-8')
t = open('C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/index.html', 'rb').read().decode('utf-8')

# Find main JS
main_start = t.rfind('<script>')
main_end = t.rfind('</script>') + 9
js = t[main_start:main_end]

# Find renderPriceTab
idx = js.find('function renderPriceTab')
end = js.find('function renderCalcTab', idx)
body = js[idx:end]

# Print full renderPriceTab
print('=== renderPriceTab FULL (first 2000 chars) ===')
print(body[:2000])

print('\n\n=== renderPriceTab FULL (2000-4000) ===')
print(body[2000:4000])

print('\n\n=== renderPriceTab FULL (4000-end) ===')
print(body[4000:])
