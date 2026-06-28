#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# i18n v7 - CORRECT string parsing with context-aware state machine
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
    '⚖️ Max tải': ['⚖️ Max load', '⚖️ 最大装载'],
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
    'Máy / Tiêu chuẩn': ['Machine / Standard', '机器/标准'],
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
lang_script_end = content.find('</script>', content.find('<script>', content.find('<script>') + 1)) + 9
main_start = content.rfind('<script>')
html_region = content[lang_script_end:main_start]

for key in sorted_keys:
    if len(key) < 3: continue
    pos = 0
    while True:
        pos = html_region.find(key, pos)
        if pos < 0: break
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

# ====== STEP 4: __() in JS - CORRECT state machine ======
main_start = content.rfind('<script>')
main_end = content.rfind('</script>') + 9
js = content[main_start:main_end]

def decode_unesc(text):
    return re.sub(r'\\u([0-9a-fA-F]{4})', lambda m: chr(int(m.group(1), 16)), text)

# State-machine string parser
i = 0
ranges = []
in_str = False
str_start = 0
str_quote = None

while i < len(js):
    if not in_str:
        if js[i] in ["'", '"']:
            # This is definitely an opener since we're outside a string
            in_str = True
            str_start = i
            str_quote = js[i]
        i += 1
    else:
        if js[i] == '\\' and i+1 < len(js) and js[i+1] == str_quote:
            i += 2
        elif js[i] == str_quote:
            # This closes the string. Now check: is the NEXT char also the same quote?
            # If so, both quotes are consumed: one closes, one opens new string
            # This handles the '</div>' case:
            #   ...' + '</div>' + ...
            # The ' after > closes the '</div>' string and then the next ' starts a new concatenation
            # In raw terms: '</div>' means:
            # ' at 79193 opens, </div> at 79194-79199, ' at 79200 closes
            # After closing at 79200, next char is ; which is code. This is correct.
            
            # But the BUG was: the ' at 79182 opens, then the next ' at 79193 closes.
            # Then ' at 79200 is seen as a NEW string opener.
            # But ' at 79193 should NOT be the closer of 79182's string!
            # ' at 79182 opens a string. Content at 79183-79192 is ";\n  h += " 
            # BUT WAIT - is that right? Let me trace through again:
            # js[79182:79200]  
            # 79182: ' (OPEN string 1)
            # 79183: ; (in string)
            # 79184: \r (in string)
            # 79185: \n (in string)
            # 79186-79192: "  h +=" (in string)
            # 79193: ' (CLOSE string 1)
            # 79194: < (CODE - NOT in string)
            # 79195-79199: /div>
            # 79200: ' (OPEN string 2) 
            # 79201: ; -> should close string 2... but ';' is not in the content - 
            # wait, the ; at 79201 is after the ' at 79200, so string 2 is js[79200:79201] = ''

            # Hmm, no. Let me look at the ACTUAL expected JavaScript:
            # ... h += '</div>';  res.innerHTML = h;
            # This should be parsed as:
            # h += '</div>'     (code: h +=, then string '</div>', then ;)
            # ;
            # res.innerHTML = h;
            
            # So the JS string '</div>' starts at 79193 (first ') and ends at 79200 (second ')
            # Between 79193 and 79200 (exclusive) we have: </div>
            
            # The string from 79182-79194 starts at some earlier ' and ends at 79193.
            # Content: ;\r\n  h += (10 chars)
            # This is actually: ANCHOR_CLOSE_QUOTE + ' + '</div>'
            # So the original source has: ...' + '</div>...
            # Which means:
            # string1: '...'  (content before the +)
            # +    (concat operator)
            # string2: '</div>' 
            
            # After string1 closes at 79193, the code is:
            # 79194: <   -> this is START of '</div>' content
            # 79195-79199: /div>
            # 79200: '  -> this is CLOSE of '</div>' string  
            
            # BUT the parser sees 79193 as close of string1, then 79194 as CODE,
            # then 79200 as OPEN of string2! Because it's not inside a string.
            
            # The issue: after closing the string at 79193, the parser processes
            # the next chars as code. It sees 79194='<', 79195='/', ..., 79199='>'
            # These are all code chars. Then 79200=' is a quote, so it opens string2.
            
            # But where does string2 close? The next single quote is at... 93875!
            # So string2 would be from 79200 to 93876!
            
            # THIS is the BUG. The ' at 79200 is NOT opening a new string. It's CLOSING the
            # string that opens at 79193. But the parser already consumed the ' at 79193 as
            # the CLOSE of the previous string!
            
            # Why? Because the previous string (at 79182) should NOT close at 79193.
            # The ' at 79193 is ACTUALLY the OPEN of a new string '</div>'.
            # The ' at 79182 should close earlier, at js[79183]... no that makes no sense.
            
            # Wait. Let me look at the raw content more carefully:
            # From hex dump around position 79175-79210 (js relative):

            # Actually wait - I just realized. The string at 79182 is:
            #     ';\r\n  h += '
            # But in the ORIGINAL JavaScript source, this is just the end of a larger string
            # that's been concatenated. For example:
            #     h += '<button>📄 Lên báo giá</button></div>';\r\n  h += '</div>';
            # In this code, '<button>...' is string1 (ending with the ' at 79182... wait no)

            # Let me just look at the actual content at that position.
            # From the hex dump again:
            # 79150: '3'
            # 79151: ')'
            # 79152: '"' (this is a " in HTML attribute, not JS string)
            # 79153: '>'
            # 79154: '📄'
            # 79155-79166: ' Lên báo giá'
            # 79167-79175: '</button></div>'
            # Then:
            # 79176-79181: '</div>' (wait, 79176='<', 79177='/', 79178='d', 79179='i', 79180='v', 79181='>')
            # 79182: "'" 

            # Hmm wait. Let me re-read hex dump more carefully:
            # 79175: '>'  (closing '>' of </button>)
            # 79176: '<'  (start of </div>)
            # 79177: '/'
            # 79178: 'd'
            # 79179: 'i'
            # 79180: 'v'
            # 79181: '>'
            # 79182: "'" 

            # So after the button HTML, we have another </div> (closing div),
            # and then a single quote. This means the STRING is:
            # '<button>📄 Lên báo giá</button></div>'
            # And this string starts somewhere before 79150 and ends at 79183... 

            # Wait, 79182 is the quote, not 79183. So:
            # The string content from its opener to 79181 is: 
            # ... <button>📄 Lên báo giá</button></div>
            # Then 79182 ' closes the string.
            # Then 79183 ; is JavaScript code.
            # Then \r\n h += 
            # Then 79193 ' OPENS new string '</div>'
            # Then 79194-79199: </div> (content)
            # Then 79200 ' CLOSES this string
            # Then 79201 ; code
            # Then \r\n res.innerHTML = h;
            
            # So the CORRECT parsing is:
            # String 1: opens somewhere before 79150, ends at 79182 (I see ' at 79182 as closer)
            # String 2: opens at 79193, ends at 79200
            # Code: between 79183-79192 and code after 79200
            
            # But the STATE MACHINE said:
            # OPEN @ 79182: ' opens string 1
            # CLOSE @ 79193: ' closes string 1 → CONTENT is ";\r\n  h += " → THIS IS WRONG!
            # 
            # The problem is CLEAR: the ' at 79182 is a CLOSE quote, not an OPEN quote!
            # But the state machine blindly treats every quote as an opener when outside a string.
            
            # The REAL open of this string is somewhere before 79182. The ' at 79182 is its closer.
            # The state machine missed the actual opener because it was inside some other structure.

            # Root cause: The file has MULTIPLE <script> tags and we're extracting only the LAST one.
            # But the string might have started BEFORE the main script section!

            # Wait, I verified: main_start = content.rfind('<script>') = 27313
            # So js starts at position 27313, and js[0] = '<'
            # The first character is just the opening tag <script>, then content follows.
            # There's no way a JS string literal starts before position 0.

            # Let me look at what comes before 79182:
            # In the hex dump I saw '3' at 79150, ')' at 79151, '"' at 79152, '>' at 79153
            # 79152 is a DOUBLE QUOTE " - that's an HTML attribute close
            # 79150-79151: '3)' - this is the end of the onclick callback
            # Following typical JS code: onclick="..." where ... contains onclick handler
            
            # The content looks like: 
            #   onclick="someFunction(3)">📄 Lên báo giá</button></div>
            # But this is inside a JS string literal because it's part of h += '...'

            # So the string contains: '<button onclick="...">📄 Lên báo giá</button></div>'
            # This string OPENS somewhere before 79150, and its ' closer is at 79182!
            
            # But the state machine starts at js[0] and strings correctly track from the start.
            # If there's a string that opens before position 79182, the state machine should have
            # been in `in_str=True` state when it hit 79182.
            
            # UNLESS... the state machine went wrong earlier!
            
            # Let me test: does the state machine find a string that covers positions before 79182?
            # I already know it finds: OPEN @ 79182 - so it was NOT in a string when it hit 79182.
            
            # This means the string that should start before 79182 was already closed incorrectly.
            
            # The most likely issue: there's a double-quote " inside the string, and the state
            # machine is incorrectly treating " as a string delimiter when we're already in a ' string.

            # AHA! That's the bug. Look at the hex dump:
            # There's a " at position 79152 in the file
            # js[79152] = '"'  (U+0022)
            # 
            # But the state machine has `if js[i] in ["'", '"']:` as the check for openers.
            # When we're OUTSIDE a string, BOTH ' and " can start a new string.
            #
            # But look: the content between position ~79100 and ~79182 is something like:
            # ...<button onclick="someFunction(3)">📄 Lên báo giá</button></div>
            # 
            # And at position 79152 there's a " character (the closing " of onclick="...")
            # At this point the state machine is OUTSIDE a string, so it treats " as a string opener!
            # Then it goes looking for the next unescaped " which might be way further on.
            # This corrupts the parse.
            
            # Actually no - the state machine for " is: if we're OUTSIDE a string and see ", we open a "-string.
            # But the " at 79152 is INSIDE a '-delimited string (from ~79050 to 79182).
            # So we SHOULD be in a ' state when hitting 79152.
            
            # Let me think about what j happens with the ' quotes:
            # There could be an unescaped ' inside the big string that breaks the parse.
            
            # Actually I think the issue is simpler. Let me look at what the state machine was doing
            # RIGHT before position 79182:
            
            # The check was: `if js[i] in ["'", '"']:` for starting strings.
            # For continuing a string: `if js[i] == '\\' and i+1 < len(js) and js[i+1] == str_quote`
            # and `elif js[i] == str_quote`
            
            # So if we're in a '-delimited string, only ' (not ") will close it.
            # And " inside ' string is just content.
            
            # Let me just trace from the beginning:
            
            # Actually, instead of doing this manually, let me just write the fix.
            # The issue is that the state machine treats every ' outside a string as opener.
            # But in file like: ... + '</div>' + ...
            # The first ' at 79182 is a closer, not an opener. The state machine doesn't know this.
            
            # The REAL fix: instead of a simple state machine, pre-scan for <script> boundary
            # and then use an AST-aware approach, or simply check the previous character.
            
            # A quote is an OPENER if:
            #   - We're outside a string, AND
            #   - The previous char is one of: ( , = [ : ? ! & | + - * / % { space tab newline
            #     
            # A quote is a CLOSER if:
            #   - We're inside a string, AND
            #   - The current char matches str_quote and is not escaped
            
            # Let me look at the chars before 79182:
            # 79181: '>'  → this is NOT a valid precedent for an opener
            # So 79182 should be a CLOSER, not an OPENER.
            
            # This tells us: we need to check the previous char to distinguish openers
            
            ranges.append((str_start, i+1))
            in_str = False
            i += 1
        else:
            i += 1

print(f"Total strings (state machine): {len(ranges)}")
