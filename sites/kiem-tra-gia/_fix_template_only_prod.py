import sys
sys.stdout.reconfigure(encoding='utf-8')
with open(r'C:\Users\Admin\.openclaw\workspace-skills\web-builder\sites\kiem-tra-gia\index.html','r',encoding='utf-8') as f:
    d = f.read()

# Wrong: bagSheet/otherSheet also match "Template"
# Fix: only prodSheet should match "Template"
old2 = '''var bagSheet = hasSheet(["Bags", "bags", "Bao bì", "bao bì", "Bao", "bao", "Bag", "Template"]);'''
new2 = '''var bagSheet = hasSheet(["Bags", "bags", "Bao bì", "bao bì", "Bao", "bao", "Bag"]);'''

old3 = '''var otherSheet = hasSheet(["Others", "others", "Quy cách khác", "Other", "other", "Template"]);'''
new3 = '''var otherSheet = hasSheet(["Others", "others", "Quy cách khác", "Other", "other"]);'''

d2 = d.replace(old2, new2).replace(old3, new3)

# Verify only 1 occurrence of "Template" in hasSheet arrays
cnt_prod = d2.count('Products', 0, 100000)  # check first half
import re
matches = re.findall(r'hasSheet\(\[.*?\]\)', d2, re.DOTALL)
print("hasSheet calls:")
for m in matches:
    print(f'  {m}')

with open(r'C:\Users\Admin\.openclaw\workspace-skills\web-builder\sites\kiem-tra-gia\index.html','w',encoding='utf-8') as f:
    f.write(d2)

print(f'\nSize: {len(d)} -> {len(d2)}')
