import sys
sys.stdout.reconfigure(encoding='utf-8')
with open(r'C:\Users\Admin\.openclaw\workspace-skills\web-builder\sites\kiem-tra-gia\index.html','r',encoding='utf-8') as f:
    d = f.read()

# Replace the prodHeaders in downloadFullTemplate
old = 'var prodHeaders = ["code","size","standard","machine","exw_vnd","exw_usd","comm_vnd","comm_usd","pkg25_vnd","pkg25_usd","jumbo_vnd","jumbo_usd","exw_vnd_cn","exw_usd_cn","comm_vnd_cn","comm_usd_cn","pkg25_vnd_cn","pkg25_usd_cn","jumbo_vnd_cn","jumbo_usd_cn","exw_vnd_other","exw_usd_other","comm_vnd_other","comm_usd_other","pkg25_vnd_other","pkg25_usd_other","jumbo_vnd_other","jumbo_usd_other"];'
new = 'var prodHeaders = ["code","size","standard","machine","exw_vnd","exw_usd","comm_vnd","comm_usd","pkg25_vnd","pkg25_usd","jumbo_vnd","jumbo_usd"];'

d2 = d.replace(old, new)

with open(r'C:\Users\Admin\.openclaw\workspace-skills\web-builder\sites\kiem-tra-gia\index.html','w',encoding='utf-8') as f:
    f.write(d2)

print('Updated full template too!')

# Verify all _cn/_other headers removed from template functions
for m in ['Mau_gia_ban', 'Mau_Day_Du', 'prodHeaders']:
    idx = d2.find(m)
    if idx >= 0:
        print(f'{m} at {idx}:')
        print(d2[idx:idx+250])
        print()
