import sys
sys.stdout.reconfigure(encoding='utf-8')
with open(r'C:\Users\Admin\.openclaw\workspace-skills\web-builder\sites\kiem-tra-gia\index.html','r',encoding='utf-8') as f:
    d = f.read()

# Update downloadTemplate headers — add "size" after "code"
old = '''    headers = ["code","standard","machine","exw_vnd_cn","exw_usd_cn","comm_vnd_cn","comm_usd_cn","pkg25_vnd_cn","pkg25_usd_cn","jumbo_vnd_cn","jumbo_usd_cn","exw_vnd_other","exw_usd_other","comm_vnd_other","comm_usd_other","pkg25_vnd_other","pkg25_usd_other","jumbo_vnd_other","jumbo_usd_other"];'''

new = '''    headers = ["code","size","standard","machine","exw_vnd_cn","exw_usd_cn","comm_vnd_cn","comm_usd_cn","pkg25_vnd_cn","pkg25_usd_cn","jumbo_vnd_cn","jumbo_usd_cn","exw_vnd_other","exw_usd_other","comm_vnd_other","comm_usd_other","pkg25_vnd_other","pkg25_usd_other","jumbo_vnd_other","jumbo_usd_other"];'''

d2 = d.replace(old, new)

# Update prodHeaders in downloadFullTemplate
old2 = '''var prodHeaders = ["code","standard","machine","exw_vnd_cn","exw_usd_cn","comm_vnd_cn","comm_usd_cn","pkg25_vnd_cn","pkg25_usd_cn","jumbo_vnd_cn","jumbo_usd_cn","exw_vnd_other","exw_usd_other","comm_vnd_other","comm_usd_other","pkg25_vnd_other","pkg25_usd_other","jumbo_vnd_other","jumbo_usd_other"];'''

new2 = '''var prodHeaders = ["code","size","standard","machine","exw_vnd_cn","exw_usd_cn","comm_vnd_cn","comm_usd_cn","pkg25_vnd_cn","pkg25_usd_cn","jumbo_vnd_cn","jumbo_usd_cn","exw_vnd_other","exw_usd_other","comm_vnd_other","comm_usd_other","pkg25_vnd_other","pkg25_usd_other","jumbo_vnd_other","jumbo_usd_other"];'''

d3 = d2.replace(old2, new2)

with open(r'C:\Users\Admin\.openclaw\workspace-skills\web-builder\sites\kiem-tra-gia\index.html','w',encoding='utf-8') as f:
    f.write(d3)

print(f'Size: {len(d)} -> {len(d3)}')
print('Added "size" column to templates')
