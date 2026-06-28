#!/usr/bin/env python3
"""
i18n v4 - correct approach:
1. LANG infra after CDN
2. Static HTML: add data-i18n attributes with the Vietnamese key for switchLang() to update
3. Dynamic JS: wrap with __('...') calls
4. switchLang() updates both static AND dynamic elements
"""
import re, json

PATH = 'C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/index.html'

with open(PATH, 'r', encoding='utf-8') as f:
    original = f.read()

# === TRANSLATION DICT ===
T = {
    'Kiểm Tra Giá': ['Price Check', '价格查询'],
    'Kiểm Tra Giá - Vật Liệu Mới Đức Thịnh': ['Price Check - Duc Thinh New Materials', '价格查询 - 德盛新材料'],
    '🏭 CÔNG TY TNHH CÔNG NGHỆ VẬT LIỆU MỚI ĐỨC THỊNH': ['🏭 DUC THINH NEW MATERIALS TECHNOLOGY CO., LTD', '🏭 德盛新材料科技有限公司'],
    'ĐC: KCN NGHĨA ĐÀN, XÃ NGHĨA THỌ, TỈNH NGHỆ AN, VIỆT NAM': ['ADDR: NGHIA DAN IP, NGHIA THO COMMUNE, NGHE AN PROVINCE, VIETNAM', '地址：义坛工业区，义寿乡，义安省，越南'],
    'Bảng giá tháng 06/2026': ['Pricelist June 2026', '2026年6月价目表'],
    '💰 Giá bán': ['💰 Pricelist', '💰 价格表'],
    '📋 Giá bán': ['📋 Pricelist', '📋 价格表'],
    '📦 Bao bì': ['📦 Packaging', '📦 包装'],
    '📐 Quy cách khác': ['📐 Other Specs', '📐 其他规格'],
    '⚙️ Quản lý': ['⚙️ Manage', '⚙️ 管理'],
    '📝 Tính giá': ['📝 Cost Calc', '📝 成本计算'],
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
    '💱 Loại tiền:': ['💱 Currency:', '💱 货币:'],
    '🌏 Thị trường:': ['🌏 Market:', '🌏 市场:'],
    'Sản phẩm': ['Product', '产品'],
    'Mã bao': ['Bag code', '袋编码'],
    'Quy cách bao': ['Bag spec', '袋规格'],
    'Hãng': ['Brand', '品牌'],
    'Loại': ['Type', '类型'],
    'Nước đến': ['Destination', '目的国'],
    'Cước (USD)': ['Freight (USD)', '运费(美元)'],
    'Giá vốn': ['Cost', '成本'],
    'Lợi nhuận': ['Profit', '利润'],
    'Tiền tệ': ['Currency', '货币'],
    'Số lượng': ['Qty', '数量'],
    'ĐVT': ['Unit', '单位'],
    'Thông tin bao bì': ['Packaging info', '包装信息'],
    'Tên sản phẩm': ['Product name', '产品名称'],
    'Quy cách': ['Spec', '规格'],
    'Bảng giá': ['Pricelist', '价格表'],
    'Tổng loại bao': ['Bag types', '袋类型'],
    'Tổng quy cách': ['Total specs', '规格总计'],
    'Bao bì': ['Packaging', '包装'],
    'Chọn sản phẩm và bao bì để bắt đầu': ['Select product & packaging', '选择产品与包装'],
    '👈 Vui lòng chọn sản phẩm': ['👈 Please select a product', '👈 请选择产品'],
    '❌ Không tìm thấy sản phẩm': ['❌ Product not found', '❌ 未找到产品'],
    'Kết quả tính giá': ['Pricing Result', '计算结果'],
    'Chọn sản phẩm trước': ['Select product first', '请先选择产品'],
    '🔖 Sản phẩm': ['🔖 Product', '🔖 产品'],
    '🏭 Máy': ['🏭 Machine', '🏭 机器'],
    '📋 Tiêu chuẩn': ['📋 Standard', '📋 标准'],
    '📋 Loại quy cách': ['📋 Spec type', '📋 规格类型'],
    '🛍️ Loại bao': ['🛍️ Bag type', '🛍️ 袋类型'],
    '📏 Quy cách bao': ['📏 Bag spec', '📏 袋规格'],
    '⚖️ Số tấn': ['⚖️ Tons', '⚖️ 吨数'],
    '— Chọn sản phẩm —': ['— Select product —', '— 选择产品 —'],
    '— Chọn máy —': ['— Select machine —', '— 选择机器 —'],
    '— Chọn tiêu chuẩn —': ['— Select standard —', '— 选择标准 —'],
    '— Không chọn —': ['— None —', '— 不选择 —'],
    '— Tự động —': ['— Auto —', '— 自动 —'],
    'Tấn': ['Ton', '吨'],
    '⚖️ Max tải': ['⚖️ Max load', '⚖️ 最大装载'],
    '⚖️ Số tấn / bao Jumbo': ['⚖️ Tons / Jumbo bag', '⚖️ 吨/吨袋'],
    '🚛 Phí FOB / tấn': ['🚛 FOB fee / ton', '🚛 离岸费/吨'],
    '📐 Kích thước': ['📐 Dimensions', '📐 尺寸'],
    '⚙️ Máy / Tiêu chuẩn': ['⚙️ Machine / Standard', '⚙️ 机器/标准'],
    '📦 Sản phẩm': ['📦 Product', '📦 产品'],
    'Tùy chọn bao bì': ['Packing options', '包装选项'],
    'Tính giá thành': ['Cost Calculation', '成本计算'],
    'Hoa hồng cơ bản': ['Base commission', '基本佣金'],
    'Chênh lệch (30%)': ['Profit sharing (30%)', '差额(30%)'],
    'Tổng giá vốn': ['Total cost price', '总成本'],
    'Tổng hoa hồng': ['Total commission', '总佣金'],
    '🔒 Chức năng quản lý yêu cầu mật khẩu': ['🔒 Password required', '🔒 需要密码'],
    '🔒 Nhập mật khẩu để tải / upload / cập nhật dữ liệu': ['🔒 Enter password', '🔒 输入密码管理数据'],
    '🔐 Nhập mật khẩu': ['🔐 Enter password', '🔐 输入密码'],
    '🔑 Đăng nhập': ['🔑 Login', '🔑 登录'],
    '❌ Sai mật khẩu!': ['❌ Wrong password!', '❌ 密码错误!'],
    'Xác nhận': ['Confirm', '确认'],
    'Hủy': ['Cancel', '取消'],
    'Đóng': ['Close', '关闭'],
    'Upload dữ liệu': ['Upload data', '上传数据'],
    'Kéo thả file vào đây': ['Drop file here', '拖放文件'],
    'hoặc bấm để chọn': ['or click to select', '或点击选择'],
    '📤 Upload dữ liệu mới': ['📤 Upload new data', '📤 上传新数据'],
    '📄 Mẫu bao bì': ['📄 Packing template', '📄 包装模板'],
    '📄 Mẫu giá bán': ['📄 Price template', '📄 价格模板'],
    '📄 Mẫu max tải': ['📄 Max load template', '📄 最大装载模板'],
    '📄 Mẫu quy cách khác': ['📄 Other spec template', '📄 其他规格模板'],
    '📊 Mẫu đầy đủ': ['📊 Full template', '📊 完整模板'],
    '⚙️ Quản lý dữ liệu': ['⚙️ Data management', '⚙️ 数据管理'],
    'Cập nhật': ['Update', '更新'],
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
    '15 ngày': ['15 days', '15天'],
    '30 ngày': ['30 days', '30天'],
    '7 ngày': ['7 days', '7天'],
    'Kể từ ngày ký': ['From signing date', '自签署之日起'],
    'Giá không bao gồm thuế VAT': ['Excluding VAT', '不含增值税'],
    'Số lượng tối thiểu: 1 container 20 feet (khoảng 21 tấn)': ['Min: 1x20ft container (~21 tons)', '最低：1x20尺柜(~21吨)'],
    '📦 Số lượng (tấn)': ['📦 Quantity (tons)', '📦 数量(吨)'],
    '💵 Điều kiện thanh toán': ['💵 Payment terms', '💵 付款条件'],
    '📅 Hiệu lực': ['📅 Validity', '📅 有效期'],
    '📞 Liên hệ': ['📞 Contact info', '📞 联系方式'],
    '👤 Khách hàng': ['👤 Customer', '👤 客户'],
    '👤 Người phụ trách': ['👤 Salesperson', '👤 负责人'],
    '📝 Ghi chú': ['📝 Notes', '📝 备注'],
    '🌊 Cảng đi': ['🌊 Port of loading', '🌊 装运港'],
    '🚚 Giao hàng': ['🚚 Delivery', '🚚 交货'],
    'Chọn sản phẩm và tính giá trước khi lên báo giá': ['Select product & calc price first', '请先选择产品并计算价格'],
    'Loại LCC:': ['LCC Type:', 'LCC类型:'],
    '🚂 Cước biển:': ['🚂 Sea freight:', '🚂 海运费:'],
    'Phụ phí': ['Surcharge', '附加费'],
    '🌏 Khác': ['🌏 Other', '🌏 其他'],
    '✅ Chọn tuyến': ['✅ Select route', '✅ 选择航线'],
    'Chọn': ['Select', '选择'],
    'Giá chưa bao gồm chi phí vận chuyển đến kho người mua': ['Excludes delivery to buyer warehouse', '不含运输至买方仓库费用'],
    'Giá đã bao gồm chi phí vận chuyển đến kho người mua': ['Includes delivery to buyer warehouse', '已含运输至买方仓库费用'],
    '⚠️ Đang dùng giá bao gồm bao bì tiêu chuẩn. Nếu bao bì khác vui lòng chọn chính xác!': ['⚠️ Standard packaging cost applied. Please select correct packaging!', '⚠️ 标准包装费用已应用，请正确选择包装！'],
    'Khách hàng:': ['Customer:', '客户：'],
    'Người liên hệ:': ['Contact:', '联系人：'],
    'Cảng đi:': ['Port:', '装运港：'],
    'Điều kiện:': ['Terms:', '条件：'],
    'Người phụ trách:': ['Salesperson:', '负责人：'],
    'Thanh toán:': ['Payment:', '付款：'],
    'Hiệu lực:': ['Validity:', '有效期：'],
    'Ghi chú:': ['Notes:', '备注：'],
    'Ngày:': ['Date:', '日期：'],
    'Nhập giá bán...': ['Enter price...', '输入售价...'],
    'Nhân viên phụ trách...': ['Salesperson...', '负责人...'],
    'Tên khách hàng...': ['Customer name...', '客户名称...'],
    'Người liên hệ...': ['Contact person...', '联系人...'],
    'Cảng đi (nếu có)...': ['Port (if any)...', '装运港(如有)...'],
    'Điều kiện giao hàng...': ['Delivery terms...', '交货条件...'],
    'Email khách hàng...': ['Customer email...', '客户邮箱...'],
    'Ghi chú thêm...': ['Additional notes...', '附加备注...'],
    '— Tự động (theo quy cách bao) —': ['— Auto (per bag spec) —', '— 自动(按袋规格) —'],
    '— Không chọn bao bì —': ['— No packaging —', '— 无包装 —'],
    'Quy cách khác': ['Other specs', '其他规格'],
}

sorted_keys = sorted(T.keys(), key=lambda k: -len(k))

# === STEP 1: LANG object after CDN ===
idx = original.find('</script>') + 9
LANG_DICT = {k: {'en': v[0], 'zh': v[1]} for k, v in T.items()}
lang_json = json.dumps(LANG_DICT, ensure_ascii=False, indent=2)

lang_code = f'''
<script>
// ===== ĐA NGÔN NGỮ =====
var LANG = {lang_json};

var CURRENT_LANG = localStorage.getItem("ktg_lang") || "vi";
function __(s) {{
  if (!s || typeof s !== "string") return s;
  var t = LANG[CURRENT_LANG] && LANG[CURRENT_LANG][s];
  return t !== undefined ? t : s;
}}
function switchLang(l) {{
  CURRENT_LANG = l;
  localStorage.setItem("ktg_lang", l);
  // Update lang buttons
  var btns = document.querySelectorAll(".lang-btn");
  btns.forEach(function(b) {{ b.classList.toggle("active", b.dataset.lang === CURRENT_LANG); }});
  document.documentElement.lang = CURRENT_LANG === "vi" ? "vi" : CURRENT_LANG === "en" ? "en" : "zh";
  
  // Update static elements with data-i18n
  var els = document.querySelectorAll("[data-i18n]");
  els.forEach(function(el) {{
    var key = el.getAttribute("data-i18n");
    var t = LANG[CURRENT_LANG] && LANG[CURRENT_LANG][key];
    if (t !== undefined) {{
      el.textContent = t;
    }}
  }});
  
  // Re-render dynamic content
  if (typeof render === "function") render();
}}
</script>
'''
original = original[:idx] + lang_code + original[idx:]

# === STEP 2: Lang buttons in header ===
lang_ui = '''<div style="display:flex;gap:3px;margin-left:auto;z-index:1;position:relative">
<button class="lang-btn active" data-lang="vi" onclick="switchLang('vi')" style="padding:3px 9px;border:1px solid rgba(255,255,255,0.3);border-radius:6px;background:transparent;color:#fff;font-size:11px;font-weight:600;cursor:pointer;font-family:var(--font);transition:all .2s">\U0001F1FB\U0001F1F3</button>
<button class="lang-btn" data-lang="en" onclick="switchLang('en')" style="padding:3px 9px;border:1px solid rgba(255,255,255,0.3);border-radius:6px;background:transparent;color:#fff;font-size:11px;font-weight:600;cursor:pointer;font-family:var(--font);transition:all .2s">\U0001F1EC\U0001F1E7</button>
<button class="lang-btn" data-lang="zh" onclick="switchLang('zh')" style="padding:3px 9px;border:1px solid rgba(255,255,255,0.3);border-radius:6px;background:transparent;color:#fff;font-size:11px;font-weight:600;cursor:pointer;font-family:var(--font);transition:all .2s">\U0001F1E8\U0001F1F3</button>
</div>
<style>
.lang-btn.active{background:rgba(255,255,255,0.2)!important;border-color:#fff!important;box-shadow:0 0 0 1px rgba(255,255,255,0.4)}
.lang-btn:hover{background:rgba(255,255,255,0.1)}
</style>
'''
original = original.replace('</header>', lang_ui + '</header>')

# === STEP 3: Add data-i18n to static HTML elements ===
# We need to find the boundary between LANG script end and main JS start
lang_script_end = original.find('</script>', idx) + 9
# Main JS starts at last <script>
main_js_start = original.rfind('<script>')

print(f'LANG script ends at: {lang_script_end}')
print(f'Main JS starts at: {main_js_start}')

# Only operate on static HTML section
static_html = original[lang_script_end:main_js_start]
after_static = original[main_js_start:]

# For each Vietnamese key found in static HTML text content,
# wrap the element with data-i18n attribute
# Strategy: process tag by tag
def add_i18n_to_static(html):
    """For each text node between >...< containing a Vietnamese key, 
    add data-i18n to the parent tag"""
    result = []
    i = 0
    in_tag = False
    text_buf = ""
    current_tag = ""
    tag_start = 0
    
    while i < len(html):
        ch = html[i]
        
        if ch == '<' and not in_tag:
            # Flush text buffer
            if text_buf.strip():
                # Check if any key is in this text
                for key in sorted_keys:
                    if key in text_buf:
                        # Add data-i18n to the most recent opening tag
                        # Find the matching tag
                        idx2 = len(''.join(result))
                        result_str = ''.join(result)
                        # Find the last '<...' before this text
                        tag_open_idx = result_str.rfind('<', 0, idx2)
                        # Skip if already has data-i18n
                        if 'data-i18n=' in result_str[tag_open_idx:idx2] and result_str[tag_open_idx:idx2].count('<') == 1:
                            continue
                        if tag_open_idx >= 0:
                            tag = result_str[tag_open_idx:idx2]
                            if '>' not in tag and not tag.startswith('</') and not tag.startswith('<!--'):
                                # Find position in result
                                att_pos = len(result) - 1
                                if isinstance(result[att_pos], str):
                                    old = result[att_pos]
                                    # Insert data-i18n before closing >
                                    esc_key = key.replace('"', '&quot;')
                                    new_tag = old.replace('>', f' data-i18n="{esc_key}">')
                                    if new_tag != old:
                                        result[att_pos] = new_tag
                    # Replace key text with wrapped span for better control
                    # Actually just leave text as-is, the data-i18n on parent handles it
                pass
            
            result.append(text_buf)
            text_buf = ""
            in_tag = True
            tag_start = i
            result.append('<')
        elif ch == '>' and in_tag:
            in_tag = False
            result.append('>')
        elif ch == '"' and in_tag:
            # Attribute value toggle
            if '<script' in ''.join(result[-20:]).lower() or '<style' in ''.join(result[-20:]).lower():
                # Skip script/style content
                result.append(ch)
            else:
                result.append(ch)
        else:
            if in_tag:
                result.append(ch)
            else:
                text_buf += ch
        
        i += 1
    
    if text_buf:
        result.append(text_buf)
    
    return ''.join(result)

# Simpler approach: for each relevant tag, find the children text and add data-i18n
# Let's just do a regex-based approach to add data-i18n to elements containing Vietnamese

processed_html = static_html

# For each key, find elements that contain that text and wrap with data-i18n
# We match: <tag...>...TEXT...</tag> -> <tag... data-i18n="KEY">...TEXT...</tag>
# Only if the tag doesn't already have data-i18n
for key in sorted_keys:
    # Skip very short keys that might cause false matches
    if len(key) < 3:
        continue
    esc = re.escape(key)
    # <tag...>...KEY...</tag>
    # Only match if key appears as text content (not attribute)
    pattern = r'(<[a-zA-Z][^>]*?)(>)((?:[^<]*?)' + esc + r'(?:[^<]*?))(<\/)'
    
    def replacer(m, key=key):
        tag_open = m.group(1)
        if 'data-i18n' in tag_open:
            return m.group(0)
        esc_key = key.replace('"', '&quot;')
        return f'{tag_open} data-i18n="{esc_key}"{m.group(2)}{m.group(3)}{m.group(4)}'
    
    processed_html = re.sub(pattern, replacer, processed_html)

# For title tag specifically
for key in sorted_keys:
    if key in processed_html:
        esc = re.escape(key)
        pattern = r'(<title>)([^<]*?' + esc + r'[^<]*?)(</title>)'
        processed_html = re.sub(pattern, replacer, processed_html)

# Also add data-i18n for placeholder attributes
for key in sorted_keys:
    esc = re.escape(key)
    pattern = r'(placeholder=")([^"]*?' + esc + r'[^"]*?)(")'
    def pl_replacer(m, key=key):
        esc_key = key.replace('"', '&quot;')
        return f'{m.group(1)}{m.group(2)}{m.group(3)} data-i18n="{esc_key}"'
    processed_html = re.sub(pattern, pl_replacer, processed_html)

# Reassemble
original = original[:lang_script_end] + processed_html + after_static

# === STEP 4: Now replace strings only in the JS section (dynamic content) ===
# Find the new main JS boundaries
main_js_start = original.rfind('<script>')
main_js_end = original.rfind('</script>') + 9

print(f'Main JS: {main_js_start}-{main_js_end}')

# Find data regions to protect
data_regions = []
for m in re.finditer(r'var (DATA_PRODUCTS|DATA_BAGS|DATA_OTHERS|DATA_MAX_LOADING)\s*=\s*\[', original):
    s = m.start()
    depth = 1
    pos = m.end()
    while pos < len(original) and depth > 0:
        if original[pos] == '[': depth += 1
        elif original[pos] == ']': depth -= 1
        pos += 1
    data_regions.append((s, pos))

print(f'Data regions: {data_regions[:2]}...')

# Process ONLY the JS section, replace keys with __('KEY')
js_text = original[main_js_start:main_js_end]
js_result = []
i = 0

while i < len(js_text):
    protected = False
    abs_pos = main_js_start + i
    for ds, de in data_regions:
        if ds <= abs_pos < de:
            js_result.append(js_text[i])
            i += 1
            protected = True
            break
    if protected:
        continue
    
    matched = False
    for key in sorted_keys:
        if len(key) < 2:
            continue
        if js_text[i:i+len(key)] == key:
            esc = key.replace('\\', '\\\\').replace("'", "\\'")
            call = "+ __('" + esc + "') +"
            js_result.append(call)
            i += len(key)
            matched = True
            break
    
    if not matched:
        js_result.append(js_text[i])
        i += 1

js_modified = ''.join(js_result)

# Special handling: fix __() around data values "25KG" and "Jumbo"
# These appear in JS as + ... "25KG" or + ... "Jumbo" from the DATA_BAGS
# They should NOT be translated
# Our protection already handles DATA_BAGS, but these also appear in JS code
# Let's check: the DATA_BAGS section uses "spec": spec_value from data
# But the render code also creates <option> values from these
# We'll leave __() for those since they'll just display the original value

# Reassemble
original = original[:main_js_start] + js_modified + original[main_js_end:]

# === WRITE ===
with open(PATH, 'w', encoding='utf-8') as f:
    f.write(original)

# Stats
total_calls = original.count('__(')
data_calls = 0
for name in ['DATA_PRODUCTS', 'DATA_BAGS', 'DATA_OTHERS', 'DATA_MAX_LOADING']:
    idx = original.find('var ' + name)
    if idx > 0:
        end = original.find('];', idx) + 2
        data_calls += original[idx:end].count('__(')

i18n_attrs = original.count('data-i18n="')

print(f'\n__() calls (total): {total_calls}')
print(f'__() calls in data (BAD): {data_calls}')
print(f'data-i18n attributes: {i18n_attrs}')

# Check for __() inside data areas
if data_calls > 0:
    print('WARNING: __() found in data areas!')
else:
    print('All data areas are clean!')

print('Done!')
