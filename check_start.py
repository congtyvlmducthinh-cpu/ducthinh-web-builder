import sys
sys.stdout.reconfigure(encoding='utf-8')
t = open('sites/kiem-tra-gia/index.html', 'rb').read().decode('utf-8')
main_start = t.rfind('<script>')
main_end = t.rfind('</script>') + 9
js = t[main_start:main_end]

# Find position of FIRST single quote after 79200
pos = js.find("'", 79201)
print(f"First single quote after position 79201: {pos}")
print(f"Context: {repr(js[max(79195,pos-5):pos+10])}")
print()

# Find position of ALL single quotes in range 79201..80000
print("All single quotes in range 79201..80000:")
for p in range(79201, 80000):
    if js[p] == "'":
        print(f"  {p}: {repr(js[max(79195,p-5):p+10])}")
