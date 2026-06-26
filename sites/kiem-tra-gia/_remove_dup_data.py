import sys
sys.stdout.reconfigure(encoding='utf-8')
with open(r'C:\Users\Admin\.openclaw\workspace-skills\web-builder\sites\kiem-tra-gia\index.html','r',encoding='utf-8') as f:
    d = f.read()

# Remove second data set: from '// App\n\n// App\n// Data\n' at ~60080 to '};' ending DATA_COST_FOB at 74991
# Let's find exact boundaries
second_start = d.find('\n// App\n\n// Data\n', 59000)
print(f'Second set starts at: {second_start}')

# Show the exact text
print(f'Context: {repr(d[second_start:second_start+50])}')

# End: DATA_COST_FOB ends with '};' at 74991
# Let me find the exact end of the second DATA_COST_FOB
idx_cf2 = d.find('var DATA_COST_FOB = {', 70000)
# Find ending }; of the object
# The format is: var DATA_COST_FOB = {14:{...},28:{...}};
brace = 0
started = False
for i in range(idx_cf2, len(d)):
    if d[i] == '{': brace += 1
    elif d[i] == '}':
        brace -= 1
        if started and brace == 0:
            end_cf2 = i + 1  # include the closing }
            break
    if not started and brace > 0:
        started = True

# Find the ; after the }
semi = d.find(';', end_cf2)
if semi >= 0:
    end_cf2 = semi + 1

print(f'DATA_COST_FOB #2 ends at: {end_cf2}')
print(f'Context: {repr(d[end_cf2-20:end_cf2+50])}')

# The duplicate block is from second_start to end_cf2
new_d = d[:second_start] + d[end_cf2:]
print(f'\nOld size: {len(d)}')
print(f'New size: {len(new_d)}')
print(f'Removed: {len(d) - len(new_d)} chars')

# Verify only one set remains
for var_name in ['DATA_PRODUCTS', 'DATA_BAGS', 'DATA_OTHERS', 'DATA_MAX_LOADING', 'DATA_COST_FOB']:
    idx = new_d.find('var ' + var_name)
    count = 0
    while idx >= 0:
        count += 1
        idx = new_d.find('var ' + var_name, idx + 1)
    print(f'{var_name}: {count} declaration(s)')

# Write
with open(r'C:\Users\Admin\.openclaw\workspace-skills\web-builder\sites\kiem-tra-gia\index.html','w',encoding='utf-8') as f:
    f.write(new_d)

print('\nFile updated successfully!')
