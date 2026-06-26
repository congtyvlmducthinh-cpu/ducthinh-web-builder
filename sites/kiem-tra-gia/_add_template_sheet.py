import sys
sys.stdout.reconfigure(encoding='utf-8')
with open(r'C:\Users\Admin\.openclaw\workspace-skills\web-builder\sites\kiem-tra-gia\index.html','r',encoding='utf-8') as f:
    d = f.read()

# Also add "Template" to product sheet name variants so template files work
old = '''var prodSheet = hasSheet(["Products", "products", "Sản phẩm", "sản phẩm", "Product", "product"]);'''
new = '''var prodSheet = hasSheet(["Products", "products", "Sản phẩm", "sản phẩm", "Product", "product", "Template"]);'''

# Also add to bags and others just in case
old2 = '''var bagSheet = hasSheet(["Bags", "bags", "Bao bì", "bao bì", "Bao", "bao", "Bag"]);'''
new2 = '''var bagSheet = hasSheet(["Bags", "bags", "Bao bì", "bao bì", "Bao", "bao", "Bag", "Template"]);'''

old3 = '''var otherSheet = hasSheet(["Others", "others", "Quy cách khác", "Other", "other"]);'''
new3 = '''var otherSheet = hasSheet(["Others", "others", "Quy cách khác", "Other", "other", "Template"]);'''

# Actually there are 2 copies of handleManageFile (the function definition and the inline code)
# Let's find and replace all instances
d2 = d.replace(old, new).replace(old2, new2).replace(old3, new3)

with open(r'C:\Users\Admin\.openclaw\workspace-skills\web-builder\sites\kiem-tra-gia\index.html','w',encoding='utf-8') as f:
    f.write(d2)

print(f'Size: {len(d)} -> {len(d2)}')
print('Added "Template" to sheet name variants')
