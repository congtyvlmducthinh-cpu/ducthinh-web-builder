#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# i18n v6 - FIXED multi-language support
import sys, re, json

sys.stdout.reconfigure(encoding='utf-8')
PATH = 'C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/index.html'

with open(PATH, 'r', encoding='utf-8') as f:
    content = f.read()

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
    '🌏 Thị trường:': ['💱 Market:', '💱 市场：'],
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
    '⚖️ Số tấn / bao Jumbo': ['⚖️ Tons / Jumbo bag', '⚖️ 吨/吨袋'],
    '⚖️ Số tấn': ['⚖️ Tons', '⚖️ 吨数'],
    '🚛 Phí FOB / tấn': ['🚛 FOB fee / ton', '🚛 离岸费/吨'],
    '⚙️ Máy / Tiêu chuẩn': ['⚙️ Machine / Standard', '⚙️ 机器/标准'],
    'Tùy chọn bao bì': ['Packing options', '包装选项'],
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
    'Loại quy cách': ['Spec type', '规格类型'],
    'Loại bao': ['Bag type', '袋类型'],
    '📄 BÁO GIÁ': ['📄 QUOTATION', '📄 报价单'],
    '📄 Lên báo giá': ['📄 Quotation', '📄 报价单'],
    'Khách hàng': ['Customer', '客户'],
    'Cảng đi': ['Port of loading', '装运港'],
    'Người phụ trách': ['Salesperson', '负责人'],
    'Thanh toán': ['Payment terms', '付款条件'],
    'Hiệu lực': ['Validity', '有效期'],
    'Ghi chú': ['Notes', '备注'],
    'Ngày:': ['Date:', '日期：'],
    'Khách hàng:': ['Customer:', '客户：'],
    'Cảng đi:': ['Port:', '装运港：'],
    'Điều kiện:': ['Terms:', '条件：'],
    'Người phụ trách:': ['Salesperson:', '负责人：'],
    'Thanh toán:': ['Payment:', '付款：'],
    'Hiệu lực:': ['Validity:', '有效期：'],
    'Ghi chú:': ['Notes:', '备注：'],
    '15 ngày': ['15 days', '15天'],
    '30 ngày': ['30 days', '30天'],
    '7 ngày': ['7 days', '7天'],
    'Giá không bao gồm thuế VAT': ['Excluding VAT', '不含增值税'],
    'Số lượng tối thiểu: 1 container 20 feet (khoảng 21 tấn)': ['Min: 1x20ft container (~21 tons)', '最低：1x20尺柜(~21吨)'],
    '⚠️ Chế độ CIF yêu cầu nhập cước biển. Vui lòng nhập Freight USD ở thanh công cụ bên trên.': ['⚠️ CIF mode requires sea freight. Please enter Freight USD above.', '⚠️ CIF模式需要海运费，请在工具栏输入美元运费。'],
    '⚠️ Đang dùng giá bao gồm bao bì tiêu chuẩn. Nếu bao bì khác vui lòng chọn chính xác!': ['⚠️ Standard packaging cost applied. Please select correct packaging!', '⚠️ 标准包装费用已应用，请正确选择包装！'],
    'Chọn sản phẩm và bao bì để bắt đầu': ['Select product & packaging', '选择产品与包装'],
    'Chọn sản phẩm và tính giá trước khi lên báo giá': ['Select product & calc price first', '请先选择产品并计算价格'],
}

sorted_keys = sorted(T.keys(), key=lambda k: -len(k))

# Build LANG JSON
LANG_DICT = {}
for k, v in T.items():
    LANG_DICT[k] = {'en': v[0], 'zh': v[1]}
lang_json = json.dumps(LANG_DICT, ensure_ascii=False, indent=2)

# ====== STEP 1: Inject LANG infrastructure ======
idx = content.find('</script>') + 9
lang_script = '\n<script>\nvar LANG = ' + lang_json + ';\n'
lang_script += 'var CURRENT_LANG = localStorage.getItem("ktg_lang") || "vi";\n'
lang_script += 'function __(s){if(!s||typeof s!=="string")return s;var t=LANG[CURRENT_LANG]&&LANG[CURRENT_LANG][s];return t!==undefined?t:s;}\n'
lang_script += 'function switchLang(l){CURRENT_LANG=l;localStorage.setItem("ktg_lang",l);'
lang_script += 'document.querySelectorAll(".lang-btn").forEach(function(b){b.classList.toggle("active",b.dataset.lang===CURRENT_LANG);});'
lang_script += 'document.documentElement.lang=CURRENT_LANG==="vi"?"vi":CURRENT_LANG==="en"?"en":"zh";'
lang_script += 'document.querySelectorAll("[data-i18n]").forEach(function(el){var key=el.getAttribute("data-i18n");var t=LANG[CURRENT_LANG]&&LANG[CURRENT_LANG][key];if(t!==undefined)el.textContent=t;});'
lang_script += 'if(typeof render==="function")render();}\n</script>\n'
content = content[:idx] + lang_script + content[idx:]

# ====== STEP 2: Lang buttons ======
lang_ui = (
    '\n<div style="display:flex;gap:3px;margin-left:auto;z-index:1;position:relative">'
    '<button class="lang-btn active" data-lang="vi" onclick="switchLang(\'vi\')" style="padding:3px 9px;border:1px solid rgba(255,255,255,0.3);border-radius:6px;background:transparent;color:#fff;font-size:11px;font-weight:600;cursor:pointer;transition:all .2s">\U0001f1fb\U0001f1f3</button>'
    '<button class="lang-btn" data-lang="en" onclick="switchLang(\'en\')" style="padding:3px 9px;border:1px solid rgba(255,255,255,0.3);border-radius:6px;background:transparent;color:#fff;font-size:11px;font-weight:600;cursor:pointer;transition:all .2s">\U0001f1ec\U0001f1e7</button>'
    '<button class="lang-btn" data-lang="zh" onclick="switchLang(\'zh\')" style="padding:3px 9px;border:1px solid rgba(255,255,255,0.3);border-radius:6px;background:transparent;color:#fff;font-size:11px;font-weight:600;cursor:pointer;transition:all .2s">\U0001f1e8\U0001f1f3</button>'
    '</div>\n<style>\n.lang-btn.active{background:rgba(255,255,255,0.2)!important;border-color:#fff!important;box-shadow:0 0 0 1px rgba(255,255,255,0.4)}\n.lang-btn:hover{background:rgba(255,255,255,0.1)}\n</style>'
)
content = content.replace('</header>', lang_ui + '\n</header>')

# ====== STEP 3: data-i18n for static HTML ======
# HTML is between LANG script and MAIN script
lang_script_end = content.find('</script>', content.find('<script>', content.find('<script>') + 1)) + 9
main_start = content.rfind('<script>')
html_region = content[lang_script_end:main_start]

for key in sorted_keys:
    if len(key) < 3:
        continue
    pos = 0
    while True:
        pos = html_region.find(key, pos)
        if pos < 0: break
        # Check it's text content (between > and <)
        prev_gt = html_region.rfind('>', max(0,pos-200), pos)
        next_lt = html_region.find('<', pos)
        if prev_gt >= 0 and next_lt >= 0:
            tag_start = html_region.rfind('<', max(0,prev_gt-200), prev_gt + 1)
            if tag_start >= 0:
                tag_end = html_region.find('>', tag_start)
                if tag_end > tag_start and tag_end < pos:
                    tag = html_region[tag_start:tag_end+1]
                    if 'data-i18n' not in tag:
                        esc_key = key.replace('"', '&quot;')
                        new_tag = tag[:-1] + ' data-i18n="' + esc_key + '"' + tag[-1]
                        html_region = html_region[:tag_start] + new_tag + html_region[tag_end+1:]
                        pos += len(new_tag) - len(tag)
        pos += 1

content = content[:lang_script_end] + html_region + content[main_start:]

# ====== STEP 4: __() in JS - CORRECT string splitting ======
main_start = content.rfind('<script>')
main_end = content.rfind('</script>') + 9
js = content[main_start:main_end]

# Find all string literal ranges
string_ranges = []
i = 0
while i < len(js):
    if js[i] in "'\"":
        q = js[i]
        s = i
        i += 1
        while i < len(js):
            if js[i] == '\\':
                i += 2; continue
            if js[i] == q:
                string_ranges.append((s, i+1, q))
                break
            i += 1
    i += 1

# Map: (str_start, str_end) -> new_string_with_splits
# We need to process each string and split it around ALL keys
repl_map = {}

def decode_unesc(text):
    return re.sub(r'\\u([0-9a-fA-F]{4})', lambda m: chr(int(m.group(1), 16)), text)

for s_start, s_end, s_quote in sorted(string_ranges):
    str_content = js[s_start+1:s_end-1]
    
    # Find all keys in this string
    key_positions = []
    for key in sorted_keys:
        if len(key) < 2: continue
        # Find UTF-8 key
        kpos = 0
        while True:
            kpos = str_content.find(key, kpos)
            if kpos < 0: break
            key_positions.append((kpos, len(key), key))
            kpos += 1
        
        # Find \\uXXXX encoded key
        enc = decode_unesc(key)
        if enc != key:
            kpos = 0
            while True:
                kpos = str_content.find(enc, kpos)
                if kpos < 0: break
                key_positions.append((kpos, len(enc), key))
                kpos += 1
    
    if not key_positions:
        continue
    
    # Deduplicate & sort
    key_positions.sort()
    deduped = []
    for kp in key_positions:
        if deduped and deduped[-1][0] + deduped[-1][1] > kp[0]:
            if kp[1] > deduped[-1][1]:
                deduped[-1] = kp
        else:
            deduped.append(kp)
    
    # Build replacement
    parts = []
    prev = 0
    for kp in deduped:
        kp_pos, kp_len, kp_key = kp
        if kp_pos > prev:
            segment = str_content[prev:kp_pos]
            parts.append(s_quote + segment + s_quote)
        esc = kp_key.replace('\\', '\\\\').replace("'", "\\'").replace('\n', '\\n')
        parts.append("+ __('" + esc + "') +")
        prev = kp_pos + kp_len
    
    if prev < len(str_content):
        segment = str_content[prev:]
        parts.append(s_quote + segment + s_quote)
    
    new_str = ''.join(parts)
    if new_str != s_quote + str_content + s_quote:
        repl_map[(s_start, s_end)] = new_str

print(f'Found {len(repl_map)} string literals to split')

# Apply in reverse order
for (s_start, s_end), new in sorted(repl_map.items(), key=lambda x: -x[0][0]):
    js = js[:s_start] + new + js[s_end:]

content = content[:main_start] + js + content[main_end:]

# ====== WRITE ======
with open(PATH, 'w', encoding='utf-8') as f:
    f.write(content)

calls = content.count("__(")
i18n_attrs = content.count('data-i18n=')
print(f'__() calls: {calls}')
print(f'data-i18n: {i18n_attrs}')
print('Done!')
