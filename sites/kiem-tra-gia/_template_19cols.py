import sys
sys.stdout.reconfigure(encoding='utf-8')
with open(r'C:\Users\Admin\.openclaw\workspace-skills\web-builder\sites\kiem-tra-gia\index.html','r',encoding='utf-8') as f:
    d = f.read()

# Update downloadTemplate - 19 cols matching Excel
old_headers = '''    headers = ["code","size","standard","machine","exw_vnd","exw_usd","comm_vnd","comm_usd","pkg25_vnd","pkg25_usd","jumbo_vnd","jumbo_usd"];'''

new_headers = '''    headers = ["code","standard","machine","exw_vnd_cn","exw_usd_cn","comm_vnd_cn","comm_usd_cn","pkg25_vnd_cn","pkg25_usd_cn","jumbo_vnd_cn","jumbo_usd_cn","exw_vnd_other","exw_usd_other","comm_vnd_other","comm_usd_other","pkg25_vnd_other","pkg25_usd_other","jumbo_vnd_other","jumbo_usd_other"];'''

d2 = d.replace(old_headers, new_headers)

# Update prodHeaders in downloadFullTemplate too
old_prod = '''var prodHeaders = ["code","size","standard","machine","exw_vnd","exw_usd","comm_vnd","comm_usd","pkg25_vnd","pkg25_usd","jumbo_vnd","jumbo_usd"];'''
new_prod = '''var prodHeaders = ["code","standard","machine","exw_vnd_cn","exw_usd_cn","comm_vnd_cn","comm_usd_cn","pkg25_vnd_cn","pkg25_usd_cn","jumbo_vnd_cn","jumbo_usd_cn","exw_vnd_other","exw_usd_other","comm_vnd_other","comm_usd_other","pkg25_vnd_other","pkg25_usd_other","jumbo_vnd_other","jumbo_usd_other"];'''

d3 = d2.replace(old_prod, new_prod)

with open(r'C:\Users\Admin\.openclaw\workspace-skills\web-builder\sites\kiem-tra-gia\index.html','w',encoding='utf-8') as f:
    f.write(d3)

print(f'Size: {len(d)} -> {len(d3)}')

# Verify
idx = d3.find('Mau_gia_ban')
print(d3[idx:idx+300])
print()
idx2 = d3.find('prodHeaders')
print(d3[idx2:idx2+300])
