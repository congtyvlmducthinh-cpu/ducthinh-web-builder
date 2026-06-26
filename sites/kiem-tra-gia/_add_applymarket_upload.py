import sys
sys.stdout.reconfigure(encoding='utf-8')
with open(r'C:\Users\Admin\.openclaw\workspace-skills\web-builder\sites\kiem-tra-gia\index.html','r',encoding='utf-8') as f:
    d = f.read()

# After upload handler updates DATA_PRODUCTS, add applyMarket()
# Look for the line: document.getElementById("mProdCnt").textContent = DATA_PRODUCTS.length;
# Add applyMarket() before that

old = '''      document.getElementById("mProdCnt").textContent = DATA_PRODUCTS.length;
      document.getElementById("mBagCnt").textContent = DATA_BAGS.length;
      document.getElementById("mOtherCnt").textContent = DATA_OTHERS.length;'''

new = '''      applyMarket();
      document.getElementById("mProdCnt").textContent = DATA_PRODUCTS.length;
      document.getElementById("mBagCnt").textContent = DATA_BAGS.length;
      document.getElementById("mOtherCnt").textContent = DATA_OTHERS.length;'''

d2 = d.replace(old, new)

with open(r'C:\Users\Admin\.openclaw\workspace-skills\web-builder\sites\kiem-tra-gia\index.html','w',encoding='utf-8') as f:
    f.write(d2)

print('Added applyMarket() after upload!')
print(f'Size: {len(d)} -> {len(d2)}')

# Verify
cnt = d2.count('applyMarket();')
print(f'applyMarket() calls: {cnt}')
