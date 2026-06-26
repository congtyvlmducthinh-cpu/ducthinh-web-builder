import sys
sys.stdout.reconfigure(encoding='utf-8')
with open('sites/kiem-tra-gia/index.html','r',encoding='utf-8') as f:
    d = f.read()
idx = d.find('function renderCalcTab()')
end = d.find('function renderBagsTab()', idx)
sub = d[idx:end]

opens = sub.count('<div')
closes = sub.count('</div>')
print('div opens:', opens, ', closes:', closes, ', diff:', opens-closes)

left_opens = sub.count('calc-left')
right_opens = sub.count('calc-right')
print('calc-left:', left_opens, ', calc-right:', right_opens)

l_idx = sub.find('calc-left')
r_idx = sub.find('calc-right')
left_content = sub[l_idx:r_idx]
print('Left panel length:', len(left_content))

l_div = left_content.count('<div')
l_close = left_content.count('</div>')
print('Left section div opens:', l_div, ', closes:', l_close, ', diff:', l_div - l_close)
