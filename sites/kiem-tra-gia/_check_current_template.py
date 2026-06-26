import sys
sys.stdout.reconfigure(encoding='utf-8')
with open(r'C:\Users\Admin\.openclaw\workspace-skills\web-builder\sites\kiem-tra-gia\index.html','r',encoding='utf-8') as f:
    d = f.read()

# Check current template headers
idx = d.find('"Mau_gia_ban.xlsx"')
print(d[idx:idx+250])
print()
idx2 = d.find('prodHeaders')
print(d[idx2:idx2+250])
