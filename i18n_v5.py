#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# i18n v5 - Multi-language support for kiem-tra-gia

import sys, re, json

sys.stdout.reconfigure(encoding='utf-8')

PATH = 'C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/index.html'

with open(PATH, 'r', encoding='utf-8') as f:
    original = f.read()

# ====== TRANSLATION DICT ======
T = {
    'Kiểm Tra Giá': ['Price Check', '价格查询'],
    'Kiểm Tra Giá - Vật Liệu Mới Đức Thịnh': ['Price Check - Duc Thinh New Materials', '价格查询 - 德盛新材料'],
    '🏭 CÔNG TY TNHH CÔNG NGHỆ VẬT LIỆU MỚI ĐỨC THỊNH': ['🏭 DUC THINH NEW MATERIALS TECHNOLOGY CO., LTD', '🏭 德盛新材料科技有限公司'],
    'ĐC: KCN NGHĨA ĐÀN, XÃ NGHĨA THỌ, TỈNH NGHỆ AN, VIỆT NAM': ['ADDR: NGHIA DAN IP, NGHIA THO COMMUNE, NGHE AN PROVINCE, VIETNAM', '地址：义坛工业区，义寿乡，义安省，越南'],
    'Bảng giá tháng 06/2026': ['Pricelist June 2026', '2026年6月价目表'],
    'Bảng giá': ['Pricelist', '价格表'],
    '💰 Giá bán': ['💰 Pricelist', '💰 价格表'],
    '📋 Giá bán': ['📋 Pricelist', '📋 价格表'],
    '📦 Bao bì': ['📦 Packaging', '📦 包装'],
    '📐 Quy cách khác': ['📐 Other Specs', '📐 其他规格'],
    '📝 Tính giá': ['📝 Cost Calc', '📝 成本计算'],
    '⚙️ Quản lý': ['⚙️ Manage', '⚙️ 管理'],
    '⚙️ Quản lý dữ liệu': ['⚙️ Data management', '⚙️ 数据管理'],
    'Tính giá thành': ['Cost Calculation', '成本计算'],
    '📡 Tra cước biển': ['📡 Freight lookup', '📡 运费查询'],
    '📡 Tra cước': ['📡 Freight', '📡 运费'],
    '📋 Ẩn max tải': ['📋 Hide max load', '📋 隐藏最大装载'],
    '📋 Hiện max tải': ['📋 Show max load', '📋 显示最大装载'],
    '⬇ Tải dữ liệu': ['⬇ Download', '⬇ 下载数据'],
    'Tất cả tiêu chuẩn': ['All standards', '所有标准'],
    'Tất cả hãng': ['All brands', '所有品牌'],
    'Tất cả loại': ['All types', '所有类型'],
    'Tất cả máy': ['All machines', '所有机器'],
    'Tất cả nước': ['All countries', '所有国家'],
    'Nội địa': ['Domestic', '国内'],
    'Xuất khẩu': ['Export', '出口'],
    '💱 Loại tiền:': ['💱 Currency:', '💱 货币：'],
    '🌏 Thị trường:': ['🌏 Market:', '🌏 市场：'],
    '🌏 Khác': ['🌏 Other', '🌏 其他'],
    'Loại LCC:': ['LCC Type:', 'LCC类型：'],
    '🚂 Cước biển:': ['🚂 Sea freight:', '🚂 海运费：'],
    'Phụ phí': ['Surcharge', '附加费'],
    '✅ Chọn tuyến': ['✅ Select route', '✅ 选择航线'],
    'Chọn': ['Select', '选择'],
    '🔍 Tìm sản phẩm...': ['🔍 Search products...', '🔍 搜索产品...'],
    '🔐 Nhập mật khẩu...': ['🔐 Enter password...', '🔐 输入密码...'],
    'Thông tin': ['Info', '信息'],
    'Max tải (tấn)': ['Max load (tons)', '最大装载(吨)'],
    'Giá bán (EXW)': ['Selling price (EXW)', '售价(EXW)'],
    'Giá bán': ['Selling price', '售价'],
    'Mã': ['Code', '代码'],
    'Sản phẩm': ['Product', '产品'],
    '📦 Sản phẩm': ['📦 Product', '📦 产品'],
    '🔖 Sản phẩm': ['🔖 Product', '🔖 产品'],
    'Máy': ['Machine', '机器'],
    '🏭 Máy': ['🏭 Machine', '🏭 机器'],
    'Tiêu chuẩn': ['Standard', '标准'],
    '📋 Tiêu chuẩn': ['📋 Standard', '📋 标准'],
    '📋 Loại quy cách': ['📋 Spec type', '📋 规格类型'],
    'Kích thước': ['Size', '尺寸'],
    '📐 Kích thước': ['📐 Dimensions', '📐 尺寸'],
    'Hoa hồng': ['Commission', '佣金'],
    '💰 Thành tiền': ['💰 Total', '💰 总计'],
    'Tổng giá vốn': ['Total cost price', '总成本'],
    'Tổng hoa hồng': ['Total commission', '总佣金'],
    'Thông tin bao bì': ['Packaging info', '包装信息'],
    'Mã bao': ['Bag code', '袋编码'],
    'Quy cách': ['Spec', '规格'],
    'Số lượng': ['Qty', '数量'],
    'Giá vốn': ['Cost', '成本'],
    'Lợi nhuận': ['Profit', '利润'],
    'Tổng loại bao': ['Bag types', '袋类型'],
    'Bao bì': ['Packaging', '包装'],
    '🛍️ Loại bao': ['🛍️ Bag type', '🛍️ 袋类型'],
    '📏 Quy cách bao': ['📏 Bag spec', '📏 袋规格'],
    'Quy cách khác': ['Other specs', '其他规格'],
    'Tổng quy cách': ['Total specs', '规格总计'],
    '📦 Chọn sản phẩm': ['📦 Select product', '📦 选择产品'],
    '📦 Số lượng (tấn)': ['📦 Quantity (tons)', '📦 数量(吨)'],
    '⚖️ Max tải': ['⚖️ Max load', '⚖️ 最大装载'],
    '⚖️ Số tấn / bao Jumbo': ['⚖️ Tons / Jumbo bag', '⚖️ 吨/吨袋'],
    '⚖️ Số tấn': ['⚖️ Tons', '⚖️ 吨数'],
    '🚛 Phí FOB / tấn': ['🚛 FOB fee / ton', '🚛 离岸费/吨'],
    '⚙️ Máy / Tiêu chuẩn': ['⚙️ Machine / Standard', '⚙️ 机器/标准'],
    'Tùy chọn bao bì': ['Packing options', '包装选项'],
    'Chọn sản phẩm và bao bì để bắt đầu': ['Select product & packaging', '选择产品与包装'],
    '👈 Vui lòng chọn sản phẩm': ['👈 Please select a product', '👈 请选择产品'],
    '❌ Không tìm thấy sản phẩm': ['❌ Product not found', '❌ 未找到产品'],
    'Kết quả tính giá': ['Pricing Result', '计算结果'],
    'Chọn sản phẩm trước': ['Select product first', '请先选择产品'],
    'Hoa hồng cơ bản': ['Base commission', '基本佣金'],
    'Chênh lệch (30%)': ['Profit sharing (30%)', '差额(30%)'],
    '💵 Điều kiện thanh toán': ['💵 Payment terms', '💵 付款条件'],
    '📅 Hiệu lực': ['📅 Validity', '📅 有效期'],
    '📞 Liên hệ': ['📞 Contact info', '📞 联系方式'],
    '👤 Khách hàng': ['👤 Customer', '👤 客户'],
    '👤 Người phụ trách': ['👤 Salesperson', '👤 负责人'],
    '📝 Ghi chú': ['📝 Notes', '📝 备注'],
    '🌊 Cảng đi': ['🌊 Port of loading', '🌊 装运港'],
    '🚚 Giao hàng': ['🚚 Delivery', '🚚 交货'],
    '— Chọn sản phẩm —': ['— Select product —', '— 选择产品 —'],
    '— Chọn máy —': ['— Select machine —', '— 选择机器 —'],
    '— Chọn tiêu chuẩn —': ['— Select standard —', '— 选择标准 —'],
    '— Không chọn —': ['— None —', '— 不选择 —'],
    '— Tự động —': ['— Auto —', '— 自动 —'],
    '— Tự động (theo quy cách bao) —': ['— Auto (per bag spec) —', '— 自动(按袋规格) —'],
    '— Không chọn bao bì —': ['— No packaging —', '— 无包装 —'],
    'Tấn': ['Ton', '吨'],
    'ĐVT': ['Unit', '单位'],
    'Tiền tệ': ['Currency', '货币'],
    'Loại': ['Type', '类型'],
    'Hãng': ['Brand', '品牌'],
    'Nước đến': ['Destination', '目的国'],
    'Cước (USD)': ['Freight (USD)', '运费(美元)'],
    'Máy / Tiêu chuẩn': ['Machine / Standard', '机器/标准'],
    'Loại quy cách': ['Spec type', '规格类型'],
    'Loại bao': ['Bag type', '袋类型'],
    '📄 BÁO GIÁ': ['📄 QUOTATION', '📄 报价单'],
    '📄 Lên báo giá': ['📄 Quotation', '📄 报价单'],
    'Khách hàng': ['Customer', '客户'],
    'Người liên hệ': ['Contact person', '联系人'],
    'Cảng đi': ['Port of loading', '装运港'],
    'Giao hàng': ['Delivery', '交货'],
    'Người phụ trách': ['Salesperson', '负责人'],
    'Thanh toán': ['Payment terms', '付款条件'],
    'Hiệu lực': ['Validity', '有效期'],
    'Ghi chú': ['Notes', '备注'],
    'Ngày:': ['Date:', '日期：'],
    'Khách hàng:': ['Customer:', '客户：'],
    'Người liên hệ:': ['Contact:', '联系人：'],
    'Cảng đi:': ['Port:', '装运港：'],
    'Điều kiện:': ['Terms:', '条件：'],
    'Người phụ trách:': ['Salesperson:', '负责人：'],
    'Thanh toán:': ['Payment:', '付款：'],
    'Hiệu lực:': ['Validity:', '有效期：'],
    'Ghi chú:': ['Notes:', '备注：'],
    '15 ngày': ['15 days', '15天'],
    '30 ngày': ['30 days', '30天'],
    '7 ngày': ['7 days', '7天'],
    'Kể từ ngày ký': ['From signing date', '自签署之日起'],
    'Giá không bao gồm thuế VAT': ['Excluding VAT', '不含增值税'],
    'Số lượng tối thiểu: 1 container 20 feet (khoảng 21 tấn)': ['Min: 1x20ft container (~21 tons)', '最低：1x20尺柜(~21吨)'],
    'Chọn sản phẩm và tính giá trước khi lên báo giá': ['Select product & calc price first', '请先选择产品并计算价格'],
    '⚠️ Chế độ CIF yêu cầu nhập cước biển. Vui lòng nhập Freight USD ở thanh công cụ bên trên.': ['⚠️ CIF mode requires sea freight. Please enter Freight USD above.', '⚠️ CIF模式需要海运费，请在工具栏输入美元运费。'],
    '⚠️ Đang dùng giá bao gồm bao bì tiêu chuẩn. Nếu bao bì khác vui lòng chọn chính xác!': ['⚠️ Standard packaging cost applied. Please select correct packaging!', '⚠️ 标准包装费用已应用，请正确选择包装！'],
    'Giá bao gồm bao bì tiêu chuẩn': ['Includes std packaging', '含标准包装'],
    'Giá chưa bao gồm chi phí vận chuyển': ['Excludes delivery cost', '不含运费'],
}

sorted_keys = sorted(T.keys(), key=lambda k: -len(k))

def decode_unicode(text):
    return re.sub(r'\\u([0-9a-fA-F]{4})', lambda m: chr(int(m.group(1), 16)), text)

# ====== STEP 1: Inject LANG ======
idx = original.find('</script>') + 9

LANG_DICT = {}
for k, v in T.items():
    LANG_DICT[k] = {'en': v[0], 'zh': v[1]}
lang_json = json.dumps(LANG_DICT, ensure_ascii=False, indent=2)

lang_code = '\n<script>\nvar LANG = ' + lang_json + ';\n'
lang_code += 'var CURRENT_LANG = localStorage.getItem("ktg_lang") || "vi";\n'
lang_code += 'function __(s){if(!s||typeof s!=="string")return s;var t=LANG[CURRENT_LANG]&&LANG[CURRENT_LANG][s];return t!==undefined?t:s;}\n'
lang_code += 'function switchLang(l){CURRENT_LANG=l;localStorage.setItem("ktg_lang",l);'
lang_code += 'var btns=document.querySelectorAll(".lang-btn");'
lang_code += 'btns.forEach(function(b){b.classList.toggle("active",b.dataset.lang===CURRENT_LANG);});'
lang_code += 'document.documentElement.lang=CURRENT_LANG==="vi"?"vi":CURRENT_LANG==="en"?"en":"zh";'
lang_code += 'var els=document.querySelectorAll("[data-i18n]");'
lang_code += 'els.forEach(function(el){var key=el.getAttribute("data-i18n");var t=LANG[CURRENT_LANG]&&LANG[CURRENT_LANG][key];if(t!==undefined){el.textContent=t;}});'
lang_code += 'if(typeof render==="function")render();}\n</script>\n'

original = original[:idx] + lang_code + original[idx:]

# ====== STEP 2: lang buttons ======
if 'lang-btn' not in original:
    lang_ui = '<div style="display:flex;gap:3px;margin-left:auto;z-index:1;position:relative">'
    lang_ui += '<button class="lang-btn active" data-lang="vi" onclick="switchLang(\'vi\')" style="padding:3px 9px;border:1px solid rgba(255,255,255,0.3);border-radius:6px;background:transparent;color:#fff;font-size:11px;font-weight:600;cursor:pointer;font-family:var(--font);transition:all .2s">\U0001F1FB\U0001F1F3</button>'
    lang_ui += '<button class="lang-btn" data-lang="en" onclick="switchLang(\'en\')" style="padding:3px 9px;border:1px solid rgba(255,255,255,0.3);border-radius:6px;background:transparent;color:#fff;font-size:11px;font-weight:600;cursor:pointer;font-family:var(--font);transition:all .2s">\U0001F1EC\U0001F1E7</button>'
    lang_ui += '<button class="lang-btn" data-lang="zh" onclick="switchLang(\'zh\')" style="padding:3px 9px;border:1px solid rgba(255,255,255,0.3);border-radius:6px;background:transparent;color:#fff;font-size:11px;font-weight:600;cursor:pointer;font-family:var(--font);transition:all .2s">\U0001F1E8\U0001F1F3</button>'
    lang_ui += '</div>\n<style>\n.lang-btn.active{background:rgba(255,255,255,0.2)!important;border-color:#fff!important;box-shadow:0 0 0 1px rgba(255,255,255,0.4)}\n.lang-btn:hover{background:rgba(255,255,255,0.1)}\n</style>\n'
    original = original.replace('</header>', lang_ui + '</header>')

# ====== STEP 3: LANG script end ======
first_script_end = original.find('</script>') + 9
second_script_end = original.find('</script>', first_script_end) + 9
main_js_start = original.rfind('<script>')

print('LANG script ends:', second_script_end)
print('Main JS starts:', main_js_start)

static_html = original[second_script_end:main_js_start]
after_static = original[main_js_start:]

# ====== STEP 4: data-i18n for static HTML ======
for key in sorted_keys:
    if len(key) < 3:
        continue
    esc = re.escape(key)
    pattern = r'(<[a-zA-Z][^>]*?)(>)((?:[^<]*?)' + esc + r'(?:[^<]*?))(<\/)'
    def replacer(m, key=key):
        if 'data-i18n' in m.group(1):
            return m.group(0)
        esc_key = key.replace('"', '&quot;')
        return m.group(1) + ' data-i18n="' + esc_key + '"' + m.group(2) + m.group(3) + m.group(4)
    static_html = re.sub(pattern, replacer, static_html)

original = original[:second_script_end] + static_html + after_static

# ====== STEP 5: Replace in JS ======
main_js_start = original.rfind('<script>')
main_js_end = original.rfind('</script>') + 9
js_text = original[main_js_start:main_js_end]

# Protect data regions
data_regions = []
for m in re.finditer(r'var (DATA_PRODUCTS|DATA_BAGS|DATA_OTHERS|DATA_MAX_LOADING)\s*=\s*\[', js_text):
    s = m.start()
    depth = 1
    pos = m.end()
    while pos < len(js_text) and depth > 0:
        if js_text[pos] == '[': depth += 1
        elif js_text[pos] == ']': depth -= 1
        pos += 1
    data_regions.append((s, pos))

def is_protected(pos):
    for ds, de in data_regions:
        if ds <= pos < de:
            return True
    return False

# Collect all key positions
all_key_positions = []

# Raw UTF-8 keys
for key in sorted_keys:
    if len(key) < 2:
        continue
    pos = 0
    while True:
        pos = js_text.find(key, pos)
        if pos < 0:
            break
        if not is_protected(pos):
            all_key_positions.append((pos, len(key), key))
        pos += 1

# \\uXXXX encoded keys
for key in sorted_keys:
    if len(key) < 2:
        continue
    enc_key = ''
    for ch in key:
        if ord(ch) > 127:
            enc_key += '\\u{:04x}'.format(ord(ch))
        else:
            enc_key += ch
    if enc_key == key:
        continue
    pos = 0
    while True:
        pos = js_text.find(enc_key, pos)
        if pos < 0:
            break
        if not is_protected(pos):
            all_key_positions.append((pos, len(enc_key), key))
        pos += 1

# Remove duplicates/overlaps
all_key_positions.sort(key=lambda x: x[0])
cleaned = []
for pos, length, key in all_key_positions:
    if cleaned and cleaned[-1][0] + cleaned[-1][1] > pos:
        if length > cleaned[-1][1]:
            cleaned[-1] = (pos, length, key)
        continue
    cleaned.append((pos, length, key))

all_key_positions = cleaned
print(f'Found {len(all_key_positions)} key positions in JS')

# Build result
result = []
prev = 0
repl_count = 0

for pos, length, key in all_key_positions:
    # Check if already wrapped
    before = js_text[max(0,pos-6):pos]
    if '__(' in before:
        result.append(js_text[prev:pos+length])
        prev = pos + length
        continue
    
    result.append(js_text[prev:pos])
    
    esc_key = key.replace('\\', '\\\\').replace("'", "\\'")
    call = "+ __('" + esc_key + "') +"
    result.append(call)
    repl_count += 1
    prev = pos + length

result.append(js_text[prev:])
js_modified = ''.join(result)

# Clean up double separators
js_modified = js_modified.replace(") +  + __('", ") + __('")
js_modified = js_modified.replace("+  + __('", "+ __('")
js_modified = js_modified.replace(") ++ __('", ") + __('")
js_modified = js_modified.replace("++ __('", "+ __('")

original = original[:main_js_start] + js_modified + original[main_js_end:]

# ====== WRITE ======
with open(PATH, 'w', encoding='utf-8') as f:
    f.write(original)

# ====== STATS ======
calls = original.count('__(')
i18n_attrs = original.count('data-i18n="')
data_calls = 0
for name in ['DATA_PRODUCTS', 'DATA_BAGS', 'DATA_OTHERS', 'DATA_MAX_LOADING']:
    idx = original.find('var ' + name)
    if idx > 0:
        end = original.find('];', idx) + 2
        data_calls += original[idx:end].count('__(')

print(f'__() calls: {calls}')
print(f'__() in data (BAD): {data_calls}')
print(f'data-i18n: {i18n_attrs}')
print(f'LANG keys: {len(LANG_DICT)}')
print(f'Replacements: {repl_count}')
print('Done!')
