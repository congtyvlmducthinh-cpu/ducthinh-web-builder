en = 'C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/en.html'

with open(en,'r',encoding='utf-8') as f:
    c = f.read()

print(f'File length: {len(c)}')

# Find ALL </script> occurrences
pos = 0
count = 0
while True:
    pos = c.find('</script>', pos)
    if pos < 0: break
    print(f'</script> #{count} at position {pos}')
    pos += 9
    count += 1

# So for en.html, find the LAST </script> 
last_script = c.rfind('</script>')
print(f'\nLast </script> at {last_script}')
print(f'File ends at {len(c)}')
pre = c[last_script-1500:last_script]
with open('C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/en_last_script.txt','w',encoding='utf-8') as f:
    f.write(pre)
print(f'Written en_last_script.txt ({len(pre)} chars)')

# Same for zh
with open('C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/zh.html','r',encoding='utf-8') as f:
    z = f.read()

last_script_z = z.rfind('</script>')
pre_z = z[last_script_z-1500:last_script_z]
with open('C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/zh_last_script.txt','w',encoding='utf-8') as f:
    f.write(pre_z)
print(f'\nzh.html: Last </script> at {last_script_z}')
print(f'File ends at {len(z)}')
print(f'Written zh_last_script.txt ({len(pre_z)} chars)')
