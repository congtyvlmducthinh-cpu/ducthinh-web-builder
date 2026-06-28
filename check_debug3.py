import sys
sys.stdout.reconfigure(encoding='utf-8')
t = open('sites/kiem-tra-gia/index.html', 'rb').read().decode('utf-8')
main_start = t.rfind('<script>')
main_end = t.rfind('</script>') + 9
js = t[main_start:main_end]

# Re-run state machine on full file
i = 0
ranges = []
in_str = False
str_start = 0
str_quote = None
while i < len(js):
    if not in_str:
        if js[i] in ["'", '"']:
            in_str = True
            str_start = i
            str_quote = js[i]
        i += 1
    else:
        if js[i] == '\\' and i+1 < len(js) and js[i+1] == str_quote:
            i += 2
        elif js[i] == str_quote:
            ranges.append((str_start, i+1))
            in_str = False
            i += 1
        else:
            i += 1

# Check if 79193..79200 range is present
found = False
for s, e in ranges:
    if s == 79193 and e == 79201:
        print(f"Found string 79193..79201: {repr(js[s:e])}")
        found = True
        break
    if s == 79193:
        print(f"String at 79193 ends at {e}: {repr(js[s:min(s+80, e)])}")
        found = True

if not found:
    print("String 79193..79201 NOT found!")
    # Find the nearest strings to 79193
    for s, e in ranges:
        if abs(s - 79193) < 10 or abs(e - 79201) < 10:
            print(f"  Near: {s}..{e}: {repr(js[s:e][:50])}")

# Now trace the area 79180..79210 step by step
print("\nTrace 79180..79210:")
i = 79180
in_str = False
str_start = 0
str_quote = None
while i < 79300:
    if not in_str:
        if js[i] in ["'", '"']:
            # Check if previous char suggests this is a string opener
            prev = js[i-1] if i > 0 else ''
            in_str = True
            str_start = i
            str_quote = js[i]
            print(f"  OPEN  @ {i}: {repr(js[i])} (prev={repr(prev)}, context={repr(js[max(79175,i-5):i+5])})")
        i += 1
    else:
        if js[i] == '\\' and i+1 < len(js) and js[i+1] == str_quote:
            print(f"  ESC   @ {i}: escaped {str_quote}")
            i += 2
        elif js[i] == str_quote:
            print(f"  CLOSE @ {i}: {repr(js[i])} (string={repr(js[str_start:i+1])})")
            in_str = False
            i += 1
        else:
            i += 1
