import sys
sys.stdout.reconfigure(encoding='utf-8')
with open(r'C:\Users\Admin\.openclaw\workspace-skills\web-builder\sites\kiem-tra-gia\index.html','r',encoding='utf-8') as f:
    d = f.read()

# First DATA_PRODUCTS at 26429 (has _cn/_other fields - KEEP THIS)
idx1 = d.find('var DATA_PRODUCTS = [\n')
end1 = d.find('];', idx1 + 30)
print(f'First DATA_PRODUCTS: {idx1}..{end1+2} (line: {d[:idx1].count(chr(10))+1})')
print(f'  First 100 chars: {repr(d[idx1:idx1+100])}')

# Second DATA_PRODUCTS at 60081 (NO _cn/_other fields - REMOVE THIS)
idx2 = d.find('var DATA_PRODUCTS = [{', 30000)
end2 = d.find('];', idx2 + 30)
print(f'\nSecond DATA_PRODUCTS: {idx2}..{end2+2}')
print(f'  First 100 chars: {repr(d[idx2:idx2+100])}')

# Show context around second one
print(f'\nContext before second:')
print(repr(d[idx2-100:idx2]))
print(f'\nContext after second:')
print(repr(d[end2+1:end2+101]))
