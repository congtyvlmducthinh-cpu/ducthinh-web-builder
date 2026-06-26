# Check market UI more carefully
import sys
sys.stdout.reconfigure(encoding='utf-8')
with open(r'C:\Users\Admin\.openclaw\workspace-skills\web-builder\sites\kiem-tra-gia\index.html', 'r', encoding='utf-8') as f:
    d = f.read()

# Look for unicode variants
for pat in ['Trung', 'Trung Qu', 'Trung Quốc', 'Trung Qu\\', 'Khác', 'Thị trường']:
    idx = d.find(pat)
    ok = idx >= 0
    print(f'  {pat}: {"✅" if ok else "❌"} (offset {idx})')
    if ok:
        print(f'    Context: {d[idx:idx+80]}')

# Show the area around market toggle
idx = d.find('marketGroup')
if idx >= 0:
    start = max(0, idx-50)
    end = min(len(d), idx+200)
    print(f'\nmarketGroup area:')
    print(d[start:end])
