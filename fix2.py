import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('sites/kiem-tra-gia/index.html','r',encoding='utf-8') as f:
    d = f.read()

# Find the exact lines
import re

# Search for calcCcyVnd line
idx = d.find('calcCcyVnd')
print(f'calcCcyVnd at {idx}')
print(repr(d[idx-5:idx+120]))

# Search for ... (2 duplicate lines)
idx2 = d.find('...(2 duplicate lines')
print(f'...(2 duplicate lines at {idx2}')
print(repr(d[idx2-10:idx2+30]))
