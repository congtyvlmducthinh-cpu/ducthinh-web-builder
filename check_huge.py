import sys
sys.stdout.reconfigure(encoding='utf-8')
t = open('sites/kiem-tra-gia/index.html', 'rb').read().decode('utf-8')
main_start = t.rfind('<script>')
main_end = t.rfind('</script>') + 9
js = t[main_start:main_end]

# The huge "string" 79200-93876 - let me check what's actually inside
content = js[79201:93876]
num_single = 0
num_escaped = 0
j = 0
while j < len(content):
    if content[j] == '\\':
        if j+1 < len(content) and content[j+1] == "'":
            num_escaped += 1
            j += 2
            continue
        else:
            j += 1
            continue
    if content[j] == "'":
        num_single += 1
        j += 1
        if num_single <= 3:
            print(f'  Unescaped quote at content position {j}: context={repr(content[max(0,j-20):j+20])}')
    j += 1

print(f'Unescaped single quotes in range 79201..93876: {num_single}')
print(f'Escaped single quotes: {num_escaped}')

# So the "big string" is a parsing artifact - it's NOT actually a string literal
# The OLD parser has a bug: it doesn't detect "'"=' as end-of-string properly
