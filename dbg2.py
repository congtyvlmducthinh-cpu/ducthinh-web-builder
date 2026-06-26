import sys
sys.stdout.reconfigure(encoding='utf-8')
with open('sites/kiem-tra-gia/index.html','rb') as f:
    raw = f.read()
idx = raw.find(b'calcCcyVnd')
print('Raw bytes around calcCcyVnd:')
b = raw[idx-10:idx+100]
print(b)
print()
print('Decoded:', b.decode('utf-8', errors='replace'))
