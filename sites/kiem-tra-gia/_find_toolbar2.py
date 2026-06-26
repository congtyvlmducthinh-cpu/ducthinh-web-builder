# Find where toolbar HTML is
import sys
sys.stdout.reconfigure(encoding='utf-8')
with open(r'C:\Users\Admin\.openclaw\workspace-skills\web-builder\sites\kiem-tra-gia\index.html','r',encoding='utf-8') as f:
    d = f.read()

# Search by looking at the toolbar container
# Find the toolbar div that contains btn-group/currency toggle
idx = d.find('💰 Tiền tệ:')
if idx >= 0:
    line_s = d.rfind('\n', 0, idx)
    line_e = d.find('\n', idx)
    print(f'"💰 Tiền tệ:" at line {d[:idx].count(chr(10))+1}')
    print(f'  Context: {d[idx-40:idx+100]}')

# Find freightGroup
idx2 = d.find('freightGroup')
if idx2 >= 0:
    line_s = d.rfind('\n', 0, idx2)
    line_e = d.find('\n', idx2)
    print(f'freightGroup at line {d[:idx2].count(chr(10))+1}')
    print(f'  Context: {d[idx2-40:idx2+100]}')

# Search for "marketGroup" in the ENTIRE file
idx3 = d.find('marketGroup')
print(f'\nmarketGroup overall: {idx3}')

# Check: anything with "Thị trường" text?
idx4 = d.find('Thị trường')
print(f'"Thị trường" overall: {idx4}')
