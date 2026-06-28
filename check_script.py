import sys
sys.stdout.reconfigure(encoding='utf-8')
PATH = 'C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/index.html'
t = open(PATH, 'rb').read().decode('utf-8')

first_close = t.find('</script>')
second_open = t.find('<script>', first_close)
second_close = t.find('</script>', second_open)

lang_start = t.find('<!-- LANG', second_close)

main_start = t.rfind('<script>')
main_end = t.rfind('</script>') + 9

print(f'First script: -{first_close}')
print(f'Second script: {second_open}-{second_close}')
print(f'LANG start: {lang_start}')
print(f'Main script: {main_start}-{main_end}')
print(f'Size: {len(t)}')
print(f'Third script tag count: {t.count("<script>", second_close)}')
