import sys
sys.stdout.reconfigure(encoding='utf-8')
with open(r'C:\Users\Admin\.openclaw\workspace-skills\web-builder\sites\kiem-tra-gia\index.html','r',encoding='utf-8') as f:
    d = f.read()
lines = d.split('\n')

# The duplicate block: line 419 '// Data' through line 441 (end of DATA_COST_FOB)
# Line 419 = index 418 in 0-based
# Find the last line of the second set (right before line 442 '// App')
print('Line 419:', repr(lines[418]))
print('Line 441:', repr(lines[440]))
print('Line 442:', repr(lines[441]))

# Let's find exact character positions
# Content of lines 419-441 (inclusive) = 418..441 in 0-based
dup_start_char = d.find('\n// App\n\n// App\n// Data\nvar DATA_PRODUCTS = [{', 40000)
print(f'\ndup_start_char: {dup_start_char}')
if dup_start_char >= 0:
    print(f'Context: {repr(d[dup_start_char:dup_start_char+100])}')

# Now find where the dup ends (after DATA_COST_FOB #2)
# Look for '};\n\n// App\n\n// App\n// App\nvar currency'
dup_end_char = d.find('};\n\n// App\n\n// App\n// App\nvar currency', dup_start_char)
print(f'\ndup_end_char: {dup_end_char}')
if dup_end_char >= 0:
    # The }; ends DATA_COST_FOB 
    end_pos = dup_end_char + 2  # include the };
    print(f'End at pos {end_pos}, context: {repr(d[end_pos:end_pos+100])}')
    
    # Remove it
    new_d = d[:dup_start_char] + d[end_pos:]
    
    with open(r'C:\Users\Admin\.openclaw\workspace-skills\web-builder\sites\kiem-tra-gia\index.html','w',encoding='utf-8') as f:
        f.write(new_d)
    
    print(f'\nOld size: {len(d)}')
    print(f'New size: {len(new_d)}')
    
    # Verify
    for var_name in ['DATA_PRODUCTS', 'DATA_BAGS', 'DATA_OTHERS', 'DATA_MAX_LOADING', 'DATA_COST_FOB']:
        cnt = new_d.count('var ' + var_name + ' =')
        print(f'{var_name}: {cnt}')
else:
    print('Could not find end marker, checking alternatives...')
    # Look for }};\n\n// App pattern (end of DATA_COST_FOB)
    idx = d.find('}};\n', dup_start_char)
    print(f'}}; found at {idx}' if idx >= 0 else '}}; not found')
