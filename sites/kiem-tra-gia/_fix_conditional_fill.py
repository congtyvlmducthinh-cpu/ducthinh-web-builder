import sys
sys.stdout.reconfigure(encoding='utf-8')
with open(r'C:\Users\Admin\.openclaw\workspace-skills\web-builder\sites\kiem-tra-gia\index.html','r',encoding='utf-8') as f:
    d = f.read()

# Find the auto-fill block — only fill _cn/_other if they don't already exist
old = '''          // Fill market variants from base prices
          s.forEach(function(p) {
            p.exw_vnd_cn = p.exw_vnd; p.exw_vnd_other = p.exw_vnd;
            p.exw_usd_cn = p.exw_usd; p.exw_usd_other = p.exw_usd;
            p.comm_vnd_cn = p.comm_vnd; p.comm_vnd_other = p.comm_vnd;
            p.comm_usd_cn = p.comm_usd; p.comm_usd_other = p.comm_usd;
            p.pkg25_vnd_cn = p.pkg25_vnd; p.pkg25_vnd_other = p.pkg25_vnd;
            p.pkg25_usd_cn = p.pkg25_usd; p.pkg25_usd_other = p.pkg25_usd;
            p.jumbo_vnd_cn = p.jumbo_vnd; p.jumbo_vnd_other = p.jumbo_vnd;
            p.jumbo_usd_cn = p.jumbo_usd; p.jumbo_usd_other = p.jumbo_usd;
          });'''

new = '''          // Fill _cn and _other from base prices if not present (12-col upload)
          s.forEach(function(p) {
            if (p.exw_vnd_cn === undefined && p.exw_vnd !== undefined) {
              p.exw_vnd_cn = p.exw_vnd; p.exw_vnd_other = p.exw_vnd;
              p.exw_usd_cn = p.exw_usd; p.exw_usd_other = p.exw_usd;
              p.comm_vnd_cn = p.comm_vnd; p.comm_vnd_other = p.comm_vnd;
              p.comm_usd_cn = p.comm_usd; p.comm_usd_other = p.comm_usd;
              p.pkg25_vnd_cn = p.pkg25_vnd; p.pkg25_vnd_other = p.pkg25_vnd;
              p.pkg25_usd_cn = p.pkg25_usd; p.pkg25_usd_other = p.pkg25_usd;
              p.jumbo_vnd_cn = p.jumbo_vnd; p.jumbo_vnd_other = p.jumbo_vnd;
              p.jumbo_usd_cn = p.jumbo_usd; p.jumbo_usd_other = p.jumbo_usd;
            }
          });'''

d2 = d.replace(old, new)

with open(r'C:\Users\Admin\.openclaw\workspace-skills\web-builder\sites\kiem-tra-gia\index.html','w',encoding='utf-8') as f:
    f.write(d2)

print(f'Size: {len(d)} -> {len(d2)}')
