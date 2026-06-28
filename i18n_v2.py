#!/usr/bin/env python3
"""
Multi-language injector v2 - single pass, key-safe
1. Inject LANG infrastructure after CDN
2. Inject lang buttons in header
3. One-pass replace Vietnamese strings with __('...') using longest-first,
   replacing UNIQ placeholder so no secondary match occurs
"""
import re, json

PATH = 'C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/index.html'

with open(PATH, 'r', encoding='utf-8') as f:
    content = f.read()

# ===== TRANSLATION DICT =====
T = {
    "Kiểm Tra Giá - Vật Liệu Mới Đức Thịnh": ["Price Check - Duc Thinh New Materials", "价格查询 - 德盛新材料"],
    "Kiểm Tra Giá": ["Price Check", "价格查询"],
    "🏭 CÔNG TY TNHH CÔNG NGHỆ VẬT LIỆU MỚI ĐỨC THỊNH": ["🏭 DUC THINH NEW MATERIALS TECHNOLOGY CO., LTD", "🏭 德盛新材料科技有限公司"],
    "ĐC: KCN NGHĨA ĐÀN, XÃ NGHĨA THỌ, TỈNH NGHỆ AN, VIỆT NAM": ["ADDR: NGHIA DAN IP, NGHIA THO COMMUNE, NGHE AN PROVINCE, VIETNAM", "地址：义坛工业区，义寿乡，义安省，越南"],
    "💰 Giá bán": ["💰 Pricelist", "💰 价格表"],
    "📋 Giá bán": ["📋 Pricelist", "📋 价格表"],
    "📦 Bao bì": ["📦 Packaging", "📦 包装"],
    "📐 Quy cách khác": ["📐 Other Specs", "📐 其他规格"],
    "⚙️ Quản lý": ["⚙️ Manage", "⚙️ 管理"],
    "📝 Tính giá": ["📝 Cost Calc", "📝 成本计算"],
    "📡 Tra cước biển": ["📡 Freight lookup", "📡 运费查询"],
    "📡 Tra cước": ["📡 Freight", "📡 运费"],
    "📋 Ẩn max tải": ["📋 Hide max load", "📋 隐藏最大装载"],
    "📋 Hiện max tải": ["📋 Show max load", "📋 显示最大装载"],
    "⬇ Tải dữ liệu": ["⬇ Download", "⬇ 下载数据"],
    "Tất cả tiêu chuẩn": ["All standards", "所有标准"],
    "Tất cả hãng": ["All brands", "所有品牌"],
    "Tất cả loại": ["All types", "所有类型"],
    "Tất cả máy": ["All machines", "所有机器"],
    "Tất cả nước": ["All countries", "所有国家"],
    "Nội địa": ["Domestic", "国内"],
    "Xuất khẩu": ["Export", "出口"],
    "💱 Loại tiền:": ["💱 Currency:", "💱 货币:"],
    "🌏 Thị trường:": ["🌏 Market:", "🌏 市场:"],
    "Sản phẩm": ["Product", "产品"],
    "Mã bao": ["Bag code", "袋编码"],
    "Quy cách bao": ["Bag spec", "袋规格"],
    "Hãng": ["Brand", "品牌"],
    "Loại": ["Type", "类型"],
    "Nước đến": ["Destination", "目的国"],
    "Cước (USD)": ["Freight (USD)", "运费(美元)"],
    "Giá vốn": ["Cost", "成本"],
    "Lợi nhuận": ["Profit", "利润"],
    "Tiền tệ": ["Currency", "货币"],
    "Số lượng": ["Qty", "数量"],
    "ĐVT": ["Unit", "单位"],
    "Thông tin bao bì": ["Packaging info", "包装信息"],
    "Tên sản phẩm": ["Product name", "产品名称"],
    "Quy cách": ["Spec", "规格"],
    "Bảng giá": ["Pricelist", "价格表"],
    "Tổng loại bao": ["Bag types", "袋类型"],
    "Tổng quy cách": ["Total specs", "规格总计"],
    "Bao bì": ["Packaging", "包装"],
    "Chọn sản phẩm và bao bì để bắt đầu": ["Select product", "选择产品"],
    "👈 Vui lòng chọn sản phẩm": ["👈 Select product", "👈 请选择产品"],
    "❌ Không tìm thấy sản phẩm": ["❌ Not found", "❌ 未找到产品"],
    "Kết quả tính giá": ["Result", "计算结果"],
    "Chọn sản phẩm trước": ["Select product first", "请先选择产品"],
    "🔖 Sản phẩm": ["🔖 Product", "🔖 产品"],
    "🏭 Máy": ["🏭 Machine", "🏭 机器"],
    "📋 Tiêu chuẩn": ["📋 Standard", "📋 标准"],
    "📋 Loại quy cách": ["📋 Spec type", "📋 规格类型"],
    "🛍️ Loại bao": ["🛍️ Bag type", "🛍️ 袋类型"],
    "📏 Quy cách bao": ["📏 Bag spec", "📏 袋规格"],
    "⚖️ Số tấn": ["⚖️ Tons", "⚖️ 吨数"],
    "— Chọn sản phẩm —": ["— Select product —", "— 选择产品 —"],
    "— Chọn máy —": ["— Select machine —", "— 选择机器 —"],
    "— Chọn tiêu chuẩn —": ["— Select standard —", "— 选择标准 —"],
    "— Không chọn —": ["— None —", "— 不选择 —"],
    "— Tự động —": ["— Auto —", "— 自动 —"],
    "Tấn": ["Ton", "吨"],
    "⚖️ Max tải": ["⚖️ Max load", "⚖️ 最大装载"],
    "⚖️ Số tấn / bao Jumbo": ["⚖️ Tons / Jumbo bag", "⚖️ 吨/吨袋"],
    "🚛 Phí FOB / tấn": ["🚛 FOB fee / ton", "🚛 离岸费/吨"],
    "📐 Kích thước": ["📐 Dimensions", "📐 尺寸"],
    "⚙️ Máy / Tiêu chuẩn": ["⚙️ Machine / Standard", "⚙️ 机器/标准"],
    "📦 Sản phẩm": ["📦 Product", "📦 产品"],
    "Tùy chọn bao bì": ["Packing options", "包装选项"],
    "Tính giá thành": ["Cost calc", "成本计算"],
    "Hoa hồng cơ bản": ["Base commission", "基本佣金"],
    "Chênh lệch (30%)": ["Margin (30%)", "差额(30%)"],
    "Tổng giá vốn": ["Total cost", "总成本"],
    "Tổng hoa hồng": ["Total commission", "总佣金"],
    "🔒 Chức năng quản lý yêu cầu mật khẩu": ["🔒 Password required", "🔒 需要密码"],
    "🔒 Nhập mật khẩu để tải / upload / cập nhật dữ liệu": ["🔒 Password to manage", "🔒 密码管理"],
    "🔐 Nhập mật khẩu": ["🔐 Enter password", "🔐 输入密码"],
    "🔑 Đăng nhập": ["🔑 Login", "🔑 登录"],
    "❌ Sai mật khẩu!": ["❌ Wrong password!", "❌ 密码错误!"],
    "Xác nhận": ["Confirm", "确认"],
    "Hủy": ["Cancel", "取消"],
    "Đóng": ["Close", "关闭"],
    "Upload dữ liệu": ["Upload data", "上传数据"],
    "Kéo thả file vào đây": ["Drop file here", "拖放文件"],
    "hoặc bấm để chọn": ["or click", "或点击选择"],
    "📤 Upload dữ liệu mới": ["📤 Upload", "📤 上传"],
    "📄 Mẫu bao bì": ["📄 Packing template", "📄 包装模板"],
    "📄 Mẫu giá bán": ["📄 Price template", "📄 价格模板"],
    "📄 Mẫu max tải": ["📄 Max load template", "📄 最大装载模板"],
    "📄 Mẫu quy cách khác": ["📄 Other spec template", "📄 其他规格模板"],
    "📊 Mẫu đầy đủ": ["📊 Full template", "📊 完整模板"],
    "⚙️ Quản lý dữ liệu": ["⚙️ Data management", "⚙️ 数据管理"],
    "Cập nhật": ["Update", "更新"],
    "📄 BÁO GIÁ": ["📄 QUOTATION", "📄 报价单"],
    "📄 Lên báo giá": ["📄 Quotation", "📄 报价"],
    "Khách hàng": ["Customer", "客户"],
    "Người liên hệ": ["Contact", "联系人"],
    "Cảng đi": ["Port of loading", "装运港"],
    "Giao hàng": ["Delivery", "交货"],
    "Người phụ trách": ["Salesperson", "负责人"],
    "Thanh toán": ["Payment terms", "付款条件"],
    "Hiệu lực": ["Validity", "有效期"],
    "Ghi chú": ["Notes", "备注"],
    "15 ngày": ["15 days", "15天"],
    "30 ngày": ["30 days", "30天"],
    "7 ngày": ["7 days", "7天"],
    "Kể từ ngày ký": ["From signing", "自签署之日起"],
    "Giá không bao gồm thuế VAT": ["Excluding VAT", "不含增值税"],
    "Số lượng tối thiểu: 1 container 20 feet (khoảng 21 tấn)": ["Min: 1x20ft (~21 tons)", "最低：1x20尺柜(~21吨)"],
    "📦 Số lượng (tấn)": ["📦 Qty (tons)", "📦 数量(吨)"],
    "💵 Điều kiện thanh toán": ["💵 Payment terms", "💵 付款条件"],
    "📅 Hiệu lực": ["📅 Validity", "📅 有效期"],
    "📞 Liên hệ": ["📞 Contact", "📞 联系方式"],
    "👤 Khách hàng": ["👤 Customer", "👤 客户"],
    "👤 Người phụ trách": ["👤 Salesperson", "👤 负责人"],
    "📝 Ghi chú": ["📝 Notes", "📝 备注"],
    "🌊 Cảng đi": ["🌊 Port", "🌊 装运港"],
    "🚚 Giao hàng": ["🚚 Delivery", "🚚 交货"],
    "Chọn sản phẩm và tính giá trước khi lên báo giá": ["Select product first", "请先选择产品"],
    "Loại LCC:": ["LCC Type:", "LCC类型:"],
    "🚂 Cước biển:": ["🚂 Sea freight:", "🚂 海运费:"],
    "Phụ phí": ["Surcharge", "附加费"],
    "🌏 Khác": ["🌏 Other", "🌏 其他"],
    "✅ Chọn tuyến": ["✅ Select route", "✅ 选择航线"],
    "Chọn": ["Select", "选择"],
    "Giá chưa bao gồm chi phí vận chuyển đến kho người mua": ["Excludes delivery", "不含运输费"],
    "Giá đã bao gồm chi phí vận chuyển đến kho người mua": ["Includes delivery", "已含运输费"],
    "⚠️ Đang dùng giá bao gồm bao bì tiêu chuẩn. Nếu bao bì khác vui lòng chọn chính xác!": ["⚠️ Standard packaging cost", "⚠️ 标准包装费用"],
    "Khách hàng:": ["Customer:", "客户："],
    "Người liên hệ:": ["Contact:", "联系人："],
    "Cảng đi:": ["Port:", "装运港："],
    "Điều kiện:": ["Terms:", "条件："],
    "Người phụ trách:": ["Salesperson:", "负责人："],
    "Thanh toán:": ["Payment:", "付款："],
    "Hiệu lực:": ["Validity:", "有效期："],
    "Ghi chú:": ["Notes:", "备注："],
    "Ngày:": ["Date:", "日期："],
    "Nhập giá bán...": ["Enter price...", "输入售价..."],
    "Nhân viên phụ trách...": ["Salesperson...", "负责人..."],
    "Tên khách hàng...": ["Customer name...", "客户名称..."],
    "Người liên hệ...": ["Contact...", "联系人..."],
    "Cảng đi (nếu có)...": ["Port (if any)...", "装运港..."],
    "Điều kiện giao hàng...": ["Delivery terms...", "交货条件..."],
    "Email khách hàng...": ["Customer email...", "客户邮箱..."],
    "Ghi chú thêm...": ["Additional notes...", "附加备注..."],
    "— Tự động (theo quy cách bao) —": ["— Auto (per bag spec) —", "— 自动(按袋规格) —"],
    "— Không chọn bao bì —": ["— No packaging —", "— 无包装 —"],
    "Quy cách khác": ["Other specs", "其他规格"],
}

# Sort keys by length descending (longest first to avoid partial matches)
sorted_keys = sorted(T.keys(), key=lambda k: -len(k))

# ===== 1. Inject LANG after CDN =====
idx = content.find('</script>') + 9
LANG_DICT = {k: {"en": v[0], "zh": v[1]} for k, v in T.items()}
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
  var btns = document.querySelectorAll(".lang-btn");
  btns.forEach(function(b) {{ b.classList.toggle("active", b.dataset.lang === CURRENT_LANG); }});
  document.documentElement.lang = CURRENT_LANG === "vi" ? "vi" : CURRENT_LANG === "en" ? "en" : "zh";
  render();
}}
</script>
'''
content = content[:idx] + lang_code + content[idx:]

# ===== 2. Lang buttons in header =====
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
content = content.replace('</header>', lang_ui + '</header>')

# ===== 3. One-pass replacement using sentinel =====
# Strategy: replace each Vietnamese string with a unique sentinel,
# then convert sentinels to __('...') calls.
# DB strings "25KG" and "Jumbo" in data should NOT be replaced.
# Also the inside of the LANG object we just injected shoud NOT be replaced.

# Find the LANG object we just injected and mark it as protected
lang_obj_start = content.find("// ===== ĐA NGÔN NGỮ =====")
lang_obj_end = content.find("</script>", lang_obj_start) + 9

# Find main JS block (last <script> after LANG)
main_js_start = content.rfind('<script>')

# The LANG script is BETWEEN first </script> extension and last <script>
# Let's find it properly
first_script_end = content.find('src=')  # CDN script
first_script_end = content.find('</script>', first_script_end) + 9

# The LANG script is right after first_script_end
# The main script is the LAST <script> tag
last_script = content.rfind('<script>')

print(f"LANG object at: {lang_obj_start}-{lang_obj_end}")
print(f"Main script at: {last_script}")

# Protect the injected LANG section
protected_marker = "###PROTECTED###"
protected_region = content[first_script_end:last_script]
content = content[:first_script_end] + protected_marker + content[last_script:]

# Protect DATA declarations
def protect_data(html):
    """Keep DATA_* values as-is"""
    # Find all var DATA_... assignments
    data_areas = []
    for m in re.finditer(r'var (DATA_PRODUCTS|DATA_BAGS|DATA_OTHERS|DATA_MAX_LOADING)\s*=\s*\[', html):
        start = m.start()
        # Find matching ]
        depth = 1
        pos = m.end()
        while pos < len(html) and depth > 0:
            if html[pos] == '[':
                depth += 1
            elif html[pos] == ']':
                depth -= 1
            pos += 1
        data_areas.append((start, pos))
    
    # Replace each data area with a marker
    # We do this in reverse order to preserve positions
    markers = {}
    for start, end in reversed(data_areas):
        key = f"###DATA_{len(markers)}###"
        markers[key] = html[start:end]
        html = html[:start] + key + html[end:]
    
    return html, markers

content, data_markers = protect_data(content)

# Also protect any <script src=...> tags (CDN)
def protect_cdn(html):
    cdn_areas = []
    for m in re.finditer(r'<script\s+[^>]*src=[^>]+></script>', html):
        cdn_areas.append((m.start(), m.end()))
    markers = {}
    for start, end in reversed(cdn_areas):
        key = f"###CDN_{len(markers)}###"
        markers[key] = html[start:end]
        html = html[:start] + key + html[end:]
    return html, markers

content, cdn_markers = protect_data(content)

# Actually we already have data_markers that includes the content
# Let me re-do with a simpler approach: protect regions by marker

# Re-load the file and do a clean approach
with open(PATH, 'r', encoding='utf-8') as f:
    original = f.read()

# Step 1: Inject LANG infrastructure
idx = original.find('</script>') + 9
original = original[:idx] + lang_code + original[idx:]

# Step 2: Lang buttons
original = original.replace('</header>', lang_ui + '</header>')

# Step 3: Find protected regions
# LANG script - the one we injected
lang_start = original.find("// ===== ĐA NGÔN NGỮ =====")
lang_end = original.find("</script>", lang_start) + 9

# DATA regions
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

# Step 4: Single-pass replacement using sentinel
# Replace all Vietnamese keys with a unique sentinel like @@__KEYID@@
# Then convert all sentinels to __('key') calls
# This avoids re-replacement issues

sentinel_map = {}  # sentinel -> original key

for key in sorted_keys:
    # Choose a sentinel that won't appear naturally
    # Use the key index as identifier
    sid = f"@@_{len(sentinel_map)}_@@"
    sentinel_map[sid] = key

result = []
i = 0
while i < len(original):
    # Check if we're in a protected region
    in_protected = False
    if lang_start <= i < lang_end:
        # Copy everything until lang_end
        result.append(original[i:lang_end])
        i = lang_end
        in_protected = True
        continue
    
    for ds, de in data_regions:
        if ds <= i < de:
            result.append(original[i:de])
            i = de
            in_protected = True
            break
    
    if in_protected:
        continue
    
    # Check if this position matches any key (longest first)
    matched = False
    for key in sorted_keys:
        if original[i:i+len(key)] == key:
            sid = None
            for s, k in sentinel_map.items():
                if k == key:
                    sid = s
                    break
            if not sid:
                sid = f"@@_{len(sentinel_map)}_@@"
                sentinel_map[sid] = key
            
            result.append(sid)
            i += len(key)
            matched = True
            break
    
    if not matched:
        result.append(original[i])
        i += 1

text = ''.join(result)

# Step 5: Convert sentinels to __() calls
for sid, key in sorted(sentinel_map.items(), key=lambda x: -len(x[1])):
    # Escape single quotes in the key for JS
    escaped_key = key.replace("'", "\\'").replace('\\', '\\\\')
    call = "+ __('" + escaped_key + "') +"
    text = text.replace(sid, call)

# Step 6: Clean up edge cases
# If __() call appears at start/end of a JS expression, clean up
# E.g.: someVar = "+ __('text') +"  -> someVar = __('text')
# But this is fine for display purposes

# Replace empty calls: " + __('') + " -> just empty
text = text.replace("+ __('') +", "")

with open(PATH, 'w', encoding='utf-8') as f:
    f.write(text)

count = text.count("__(")
print(f"\nTotal __() calls: {count}")

# Check for nesting
nesting = text.count("__('+ __(") + text.count('__("+ __(')
print(f"Nested calls: {nesting}")

if nesting > 0:
    print("WARNING: Nested calls detected! Some keys may contain substrings of other keys.")
    # Find examples
    for m in re.finditer(r"__\(\s*[^)]*__\([^)]*\)", text):
        ctx = text[max(0, m.start()-20):m.end()+20]
        print(f"  Nesting at char {m.start()}: ...{ctx}...")

print("Done!")
