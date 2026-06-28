import sys
sys.stdout.reconfigure(encoding='utf-8')
t = open('sites/kiem-tra-gia/index.html', 'rb').read().decode('utf-8')
main_start = t.rfind('<script>')
main_end = t.rfind('</script>') + 9
js = t[main_start:main_end]

# Show context around the 3021-char string (72515-75538)  
print('String at 72515:')
print('  Opening context:', repr(js[72515:72530]))
print('  Closing context:', repr(js[75530:75545]))

# Show context around the 14674-char string (79200-93876)
print()
print('String at 79200:')
print('  Opening context:', repr(js[79200:79230]))
# Find its closing quote
print('  Checking js[93870:93880]:', repr(js[93870:93880]))
# And what comes after
print('  After close:', repr(js[93876:93900]))

# Show context around the 3021 char string - what's between 79200 and the opening at 72515
# Does 75538 actually contain a close quote?
print()
print('  js[75537:75540]:', repr(js[75537:75540]))
print('  js[75538]:', repr(js[75538]))
