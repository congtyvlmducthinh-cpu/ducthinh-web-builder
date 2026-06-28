import sys
sys.stdout.reconfigure(encoding='utf-8')
t = open('sites/kiem-tra-gia/index.html', 'rb').read().decode('utf-8')
main_start = t.rfind('<script>')
main_end = t.rfind('</script>') + 9
js = t[main_start:main_end]

# Let me understand: the state machine hits ' at 79200 and treats it as a string opener
# Then it finds the next ' at 93875, making a string from 79200..93876 (14674 chars)
# 
# But 79200 is actually a string CLOSER (ending '</div>')
# And 93875 is a string OPENER (starting '<option value=...')
#	
# Why does the state machine think 79200 is an opening quote?
# Because it's not inside a string when it hits 79200.
# But 79200 IS a closing quote! It's ending the string that started at 79193.
#
# The state machine should have ended the string at 79193..79200 correctly.
# Let me verify the range 79193..79200 is in the state machine output.

found = False
for s, e in ranges:
    if s == 79193 and e == 79201:
        found = True
        print(f"Found string 79193..79201: {repr(js[s:e])}")
        break

# Let me check if the state machine actually found this
# I'll re-run the state machine just on this area
i = 79180
in_str = False
str_start = 0
str_quote = None

while i < 79250:
    if not in_str:
        if js[i] in ["'", '"']:
            in_str = True
            str_start = i
            str_quote = js[i]
            print(f"OPEN at {i} ({repr(js[i])})")
        i += 1
    else:
        if js[i] == '\\' and i+1 < len(js) and js[i+1] == str_quote:
            i += 2
        elif js[i] == str_quote:
            print(f"CLOSE at {i} ({repr(js[i])}) string: {repr(js[str_start:i+1])}")
            in_str = False
            i += 1
        else:
            i += 1
