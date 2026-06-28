import sys
sys.stdout.reconfigure(encoding='utf-8')
PATH = 'C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/index.html'
with open(PATH, 'r', encoding='utf-8') as f:
    text = f.read()

# Check: is header inside JS or static HTML?
# Find the main script tags
last_script_open = text.rfind('<script>' + '\n' if text[text.rfind('<script>'):text.rfind('<script>')+9] == '<script>\n' else '')
# Find all script tags
import re
for m in re.finditer(r'<script[^>]*>', text):
    pos = m.start()
    # Find matching </script>
    end = text.find('</script>', pos)
    snippet = text[m.start():end]
    print(f'<script> at {m.start()}-{end}: starts with {snippet[:50]}...')
    print(f'  contains "render()": {"render()" in snippet}')
    
# Check first 30 lines
lines = text.split('\n')
print('\n=== First 30 lines ===')
for i in range(min(30, len(lines))):
    print(f'{i+1}: {repr(lines[i][:100])}')
