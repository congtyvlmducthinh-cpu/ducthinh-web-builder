import sys
sys.stdout.reconfigure(encoding='utf-8')
with open(r'C:\Users\Admin\.openclaw\workspace-skills\web-builder\sites\kiem-tra-gia\index.html','r',encoding='utf-8') as f:
    d = f.read()

# Show the exact area after qNote field up to the closing </div> of q-modal-form
idx = d.find('<div style="grid-column:1/-1"><label>📝 Ghi chú</label>')
if idx >= 0:
    end = d.find('</div>', idx)
    print('From qNote:')
    print(repr(d[idx:end+30]))
    
# Show the closing of q-modal-form
form_start = d.find('<div class="q-modal-form">')
form_html = d[form_start:]
form_end = form_html.find('</div>')
depth = 1
pos = len('<div class="q-modal-form">')
while depth > 0 and pos < len(form_html):
    if form_html[pos:pos+4] == '<div':
        depth += 1
        pos += 4
    elif form_html[pos:pos+6] == '</div>':
        depth -= 1
        if depth == 0:
            break
        pos += 6
    else:
        pos += 1
print('\nClosing of q-modal-form:')
print(repr(form_html[pos:pos+100]))
