import sys
sys.stdout.reconfigure(encoding='utf-8')
with open(r'C:\Users\Admin\.openclaw\workspace-skills\web-builder\sites\kiem-tra-gia\index.html','r',encoding='utf-8') as f:
    d = f.read()

start = d.find('controlBar">')
end = d.find('priceModeBar')
print('Full toolbar area:')
print(d[start-50:end+500])
