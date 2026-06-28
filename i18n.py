#!/usr/bin/env python3
"""
Multi-language injector - safe approach:
1. Inject LANG infrastructure (not replacing LANG keys themselves)
2. Replace strings ONLY in HTML display context (between > and <)
3. Replace strings ONLY in placeholder="..." attributes
4. NEVER touch JS data variables or code
"""
import re, json

PATH = 'C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/index.html'

with open(PATH, 'r', encoding='utf-8') as f:
    content = f.read()

# ===== TRANSLATION DICT (vi -> en, zh) =====
T = {
    "Kiểm Tra Giá": ["Price Check", "价格查询"],
    "Kiểm Tra Giá - Vật Liệu Mới Đức Thịnh": ["Price Check - Duc Thinh New Materials", "价格查询 - 德盛新材料"],
    "🏭 CÔNG TY TNHH CÔNG NGHỆ VẬT LIỆU MỚI ĐỨC THỊNH": ["🏭 DUC THINH NEW MATERIALS TECHNOLOGY CO., LTD", "🏭 德盛新材料科技有限公司"],
    "ĐC: KCN NGHĨA ĐÀN, XÃ NGHĨA THỌ, TỈNH NGHỆ AN, VIỆT NAM": ["ADDR: NGHIA DAN IP, NGHIA THO COMMUNE, NGHE AN PROVINCE, VIETNAM", "地址：义坛工业区，义寿乡，义安省，越南"],
    "💰 Giá bán": ["💰 Pricelist", "💰 价格表"],
    "📋 Giá bán": ["📋 Pricelist", "📋 价格表"],
    "📦 Bao bì": ["📦 Packaging", "📦 包装"],
    "📐 Quy cách khác": ["📐 Other Specs", "📐 其他规格"],
    "⚙️ Quản lý": ["⚙️ Manage", "⚙️ 管理"],
    "📝 Tính giá": ["📝 Cost Calc", "📝 成本计算"],
    "📡 Tra cước": ["📡 Freight", "📡 运费"],
    "📡 Tra cước biển": ["📡 Freight lookup", "📡 运费查询"],
    "📋 Ẩn max tải": ["📋 Hide max load", "📋 隐藏最大装载"],
    "📋 Hiện max tải": ["📋 Show max load", "📋 显示最大装载"],
    "⬇ Tải dữ liệu": ["⬇ Download", "⬇ 下载数据"],
    "Nội địa": ["Domestic", "国内"],
    "Xuất khẩu": ["Export", "出口"],
    "Tất cả hãng": ["All brands", "所有品牌"],
    "Tất cả loại": ["All types", "所有类型"],
    "Tất cả máy": ["All machines", "所有机器"],
    "Tất cả nước": ["All countries", "所有国家"],
    "Tất cả tiêu chuẩn": ["All standards", "所有标准"],
    "💱 Loại tiền:": ["💱 Currency:", "💱 货币:"],
    "🌏 Thị trường:": ["🌏 Market:", "🌏 市场:"],
    "Sản phẩm": ["Product", "产品"],
    "Mã bao": ["Bag code", "袋编码"],
    "Quy cách bao": ["Bag spec", "袋规格"],
    "Hãng": ["Brand", "品牌"],
    "Loại": ["Type", "类型"],
    "Nước đến": ["Destination", "目的国"],
    "Cước (USD)": ["Freight (USD)", "运费(美元)"],
    "Giá": ["Price", "价格"],
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
    "title-text": ["title-text", "title-text"],
}

# Build LANG JS object
LANG_OBJ = {k: {"en": v[0], "zh": v[1]} for k, v in T.items()}
lang_json = json.dumps(LANG_OBJ, ensure_ascii=False, indent=2)

# ===== 1. Inject LANG after CDN script =====
idx = content.find('</script>') + 9  # after first </script> (CDN)
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

# ===== 3. Replace strings in HTML display context =====
# Find the main JS block (last <script>)
main_js_start = content.rfind('<script>')
main_js_end = content.rfind('</script>')

# Split into sections
before_main_js = content[:main_js_start]  # HTML + CSS
main_js = content[main_js_start:main_js_end + 9]  # The JS
after_main_js = content[main_js_end + 9:]  # After main JS

print(f"HTML section: {len(before_main_js)} chars")
print(f"JS section: {len(main_js)} chars")
print(f"After: {len(after_main_js)} chars")

# ===== Replace in HTML section (between > and < tags) =====
html_part = before_main_js

# Find all text between > and <
def replace_html_text(html, translations):
    """Replace text content between HTML tags"""
    result = []
    i = 0
    in_tag = False
    in_attr = False
    text_buf = ""
    
    while i < len(html):
        ch = html[i]
        
        if ch == '<' and not in_tag and not in_attr:
            # Flush text buffer
            if text_buf.strip():
                # Try to translate
                text = text_buf
                for vn, en, zh in translations:
                    if vn in text and vn != "title-text":
                        text = text.replace(vn, f'<lang>{vn}</lang>')
                text_buf = text
            
            result.append(text_buf)
            text_buf = ""
            in_tag = True
            result.append('<')
        elif ch == '>' and in_tag:
            in_tag = False
            result.append('>')
        elif ch == '"' and in_tag:
            in_attr = not in_attr
            result.append('"')
        else:
            if in_tag or in_attr:
                result.append(ch)
            else:
                text_buf += ch
        
        i += 1
    
    # Flush remaining
    if text_buf:
        result.append(text_buf)
    
    return ''.join(result)

# Build translation list sorted by length
tl = sorted([(k, v[0], v[1]) for k, v in T.items() if k != "title-text"], key=lambda x: -len(x[0]))

# Simple approach: replace each key with __('key') in HTML text nodes
# Use regex to find text between > and <
def wrap_html_strings(html):
    """Wrap Vietnamese strings in HTML text with __()"""
    # Pattern: text between > and <
    def replace_text(match):
        text = match.group(1)
        if not text.strip():
            return match.group(0)
        # Only replace if text contains a Vietnamese key
        for vn, en, zh in tl:
            if vn in text:
                text = text.replace(vn, "{{__('" + vn.replace("'", "\\'") + "')}}")
        return f'>{text}<'
    
    # Process >text< patterns
    result = re.sub(r'>([^<]+)<', replace_text, html)
    
    # Also handle placeholder attributes
    def replace_placeholder(match):
        attr = match.group(0)
        for vn, en, zh in tl:
            if vn in attr:
                attr = attr.replace(vn, "{{__('" + vn.replace("'", "\\'") + "')}}")
        return attr
    
    # placeholder="..." or placeholder='...'
    result = re.sub(r'placeholder="([^"]*)"', replace_placeholder, result)
    result = re.sub(r"placeholder='([^']*)'", replace_placeholder, result)
    
    return result

html_part = wrap_html_strings(html_part)

# ===== Replace in JS section =====
# We need to be very careful here. Only replace:
# 1. Strings inside JS '+ ... +' concatenation
# 2. Strings inside placeholder="..." in generated HTML

def replace_js_display_strings(js):
    """Replace Vietnamese strings that appear as display text in JS"""
    # Only replace strings that appear in:
    # 1. + 'text' + (inside concatenation)
    # 2. placeholder='text'
    # 3. >text< (inside generated HTML strings)
    
    # Process line by line
    lines = js.split('\n')
    for line_idx in range(len(lines)):
        line = lines[line_idx]
        
        # Check if this line has Vietnamese in a display context
        for vn, en, zh in tl:
            if vn not in line:
                continue
            
            # Skip DATA variable declarations
            if line.strip().startswith('var DATA_'):
                continue
            
            # Replace in placeholder patterns
            line = re.sub(
                r'placeholder="([^"]*' + re.escape(vn) + r'[^"]*)"',
                lambda m: 'placeholder="' + m.group(1).replace(vn, "{{__('" + vn.replace("'", "\\'") + "')}}") + '"',
                line
            )
            
            # Replace in >text< patterns within JS strings
            if vn in line:
                # Check if it's inside a JS string (quoted)
                # We'll do a simple replacement of the key wrapped in quotes
                # but only if it's clearly a display string
                pass
        
        lines[line_idx] = line
    
    return '\n'.join(lines)

# Replace in JS  
js_part = replace_js_display_strings(main_js)

# Reassemble
content = html_part + js_part + after_main_js

# Replace {{__('')}} markers with actual __() JS calls
# The markers are used because Python can't output JS __() correctly
content = content.replace("{{__('", "+ __('").replace("')}}", "') +")

# ===== WRITE =====
with open(PATH, 'w', encoding='utf-8') as f:
    f.write(content)

# Count replacements
count = content.count("__(")
print(f"\nTotal __() calls: {count}")
print("Done!")
