import sys
sys.stdout.reconfigure(encoding='utf-8')
PATH = 'C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/index.html'
t = open(PATH, 'rb').read().decode('utf-8')

# The 2nd script is from 27313 to ~144827 (the main script)
# The 1st script is some CDN/other thing from 0-270

# Find what's at position 79200 in the FULL file (not relative to script)
# 27313 + 79200 = approximately 106513
check = 106513
print(f'Full file position ~{check}:')
print(repr(t[check-10:check+10]))

# Actually the huge string is at js position 79200, meaning full position ~106513
# Let me look at the area before and after
for pos in range(check-5, check+5):
    print(f'{pos}: {repr(t[pos])} -> {repr(t[max(0,pos-5):pos+15])}')
