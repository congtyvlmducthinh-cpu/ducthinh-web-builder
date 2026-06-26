import sys
sys.stdout.reconfigure(encoding='utf-8')
with open(r'C:\Users\Admin\.openclaw\workspace-skills\web-builder\sites\kiem-tra-gia\index.html','r',encoding='utf-8') as f:
    d = f.read()

# Second set starts at 60081
# Let me find where the manage code starts (the third set)
# DATA_PRODUCTS #3 is at 120979

print('Second set area:')
# Show from 59800 (before DATA_COST_FOB #1) to 75000 (after DATA_BAGS #2)
# DATA_COST_FOB #1 ends at ~60080
# DATA_PRODUCTS #2 starts at 60081
# Let's see what's right before DATA_PRODUCTS #2
print(repr(d[60000:60090]))
print()

# DATA_PRODUCTS #2 ends at 70383
# DATA_BAGS #2 starts at 70384
print(repr(d[70380:70400]))
print()

# DATA_BAGS #2 ends at 71935
# DATA_OTHERS #2 starts at 71936
print(repr(d[71930:71950]))
print()

# DATA_OTHERS #2 ends at 72654
# DATA_MAX_LOADING #2 starts at 72655
print(repr(d[72650:72670]))
print()

# DATA_MAX_LOADING #2 ends at ~74758
# DATA_COST_FOB #2 starts at 74759
print(repr(d[74750:74780]))
print()

# DATA_COST_FOB #2 ends at ~76000ish
# Let's find end of DATA_COST_FOB #2
idx_cf = d.find('var DATA_COST_FOB = {', 70000)
end_cf = d.find('};', idx_cf)
print(f'DATA_COST_FOB #2: {idx_cf} to {end_cf+2}')
print(repr(d[end_cf+1:end_cf+150]))
