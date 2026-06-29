c = open('C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/vi_live.html', encoding='utf-8').read()
print('switchTab call to pricelist:', 'switchTab' in c)
print('manage html id:', 'id="manage"' in c)
print('renderPriceTab:', 'renderPriceTab' in c)
print('renderManageTab:', 'renderManageTab' in c)
print('renderBagsTab:', 'renderBagsTab' in c)
print('renderOthersTab:', 'renderOthersTab' in c)
print('Has manage section in html:', c.find('id="manage"'), c.find('Quản lý dữ liệu'))

# Find the init-like block
for term in ['currentTab=', 'activeTab=', 'updateDataInfo', 'populateFilters']:
    i = c.find(term)
    if i >= 0:
        print(f'{term} at {i}: {c[i:i+100].encode("ascii","replace").decode()}')
