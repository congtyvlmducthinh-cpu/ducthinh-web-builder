import sys
sys.stdout.reconfigure(encoding='utf-8')
with open('sites/kiem-tra-gia/index.html','r',encoding='utf-8') as f:
    d = f.read()
idx1 = d.find('<script>') + len('<script>')
idx2 = d.rfind('</script>')
js = d[idx1:idx2]
opens = js.count('{')
closes = js.count('}')
print('Braces:', opens, '=', closes, 'diff:', opens-closes)
opens2 = js.count('(')
closes2 = js.count(')')
print('Parens:', opens2, '=', closes2, 'diff:', opens2-closes2)
dq = js.count('"')
print('Double quotes:', dq, '(even:', dq % 2 == 0, ')')
