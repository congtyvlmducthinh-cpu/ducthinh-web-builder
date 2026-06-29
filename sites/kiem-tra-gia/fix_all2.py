import os

SRC = 'C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia'

def read(name):
    with open(os.path.join(SRC, name), 'r', encoding='utf-8') as f:
        return f.read()

def write(name, content):
    with open(os.path.join(SRC, name), 'w', encoding='utf-8') as f:
        f.write(content)
    print(f'  -> {name}: {len(content)} chars written')


# ============================================================
# FIX 1: vndFields loop - remove auto-copy to _cn/_other
# ============================================================
OLD_LOOP = """    Object.keys(vndFields).forEach(function(k) {
      var names = vndFields[k];
      for (var i = 0; i < names.length; i++) {
        if (r[names[i]] !== undefined && r[names[i]] !== null && r[names[i]] !== "") {
          obj[k] = Number(r[names[i]]);
          obj[k + "_cn"] = Number(r[names[i]]);
          obj[k + "_other"] = Number(r[names[i]]);
          break;
        }
      }
    });"""

NEW_LOOP = """    Object.keys(vndFields).forEach(function(k) {
      var names = vndFields[k];
      for (var i = 0; i < names.length; i++) {
        if (r[names[i]] !== undefined && r[names[i]] !== null && r[names[i]] !== "") {
          obj[k] = Number(r[names[i]]);
          break;
        }
      }
    });"""


# ============================================================
# FIX 2: Preserve section - exact line-by-line match per actual file
# File has ALL _cn first, then ALL _other
# ============================================================
# Old lines (exact order as found in file: all _cn first, then all _other)
OLD_CN_LINES = []
OLD_OTHER_LINES = []
NEW_CN_LINES = []
NEW_OTHER_LINES = []

CN_FIELDS = ['exw_vnd_cn', 'exw_usd_cn', 'comm_vnd_cn', 'comm_usd_cn', 'pkg25_vnd_cn', 'pkg25_usd_cn', 'jumbo_vnd_cn', 'jumbo_usd_cn']
OTHER_FIELDS = ['exw_vnd_other', 'exw_usd_other', 'comm_vnd_other', 'comm_usd_other', 'pkg25_vnd_other', 'pkg25_usd_other', 'jumbo_vnd_other', 'jumbo_usd_other']

# Map cn/other field back to base field
def base_from(field):
    return field.replace('_cn', '').replace('_other', '')

for f in CN_FIELDS:
    b = base_from(f)
    OLD_CN_LINES.append(f'    if (r.{f} !== undefined) obj.{f} = Number(r.{f});')
    NEW_CN_LINES.append(f'    obj.{f} = r.{f} !== undefined ? Number(r.{f}) : obj.{b};')

for f in OTHER_FIELDS:
    b = base_from(f)
    OLD_OTHER_LINES.append(f'    if (r.{f} !== undefined) obj.{f} = Number(r.{f});')
    NEW_OTHER_LINES.append(f'    obj.{f} = r.{f} !== undefined ? Number(r.{f}) : obj.{b};')

OLD_PRESERVE_HEADER = '    // Preserve market-specific fields from template files'
NEW_PRESERVE_HEADER = '    // Market-specific fields: use column if exists, else fall back to base'

OLD_PRESERVE = OLD_PRESERVE_HEADER + '\n' + '\n'.join(OLD_CN_LINES) + '\n' + '\n'.join(OLD_OTHER_LINES)
NEW_PRESERVE = NEW_PRESERVE_HEADER + '\n' + '\n'.join(NEW_CN_LINES) + '\n' + '\n'.join(NEW_OTHER_LINES)


# ============================================================
# FIX 3: vi.html - uncomment localStorage loading
# ============================================================
OLD_LS_COMMENT = """/* var saved = localStorage.getItem("dq_products");
if (saved) {
  try { DATA_PRODUCTS = JSON.parse(saved); } catch(e) {}
}
var savedBags = localStorage.getItem("dq_bags");
if (savedBags) {
  try { DATA_BAGS = JSON.parse(savedBags); } catch(e) {}
}
var savedOthers = localStorage.getItem("dq_others");
if (savedOthers) {
  try { DATA_OTHERS = JSON.parse(savedOthers); } catch(e) {}
}
var savedML = localStorage.getItem("dq_maxLoading");
if (savedML) {
  try { DATA_MAX_LOADING = JSON.parse(savedML); } catch(e) {}
}
var savedCF = localStorage.getItem("dq_costFOB");
if (savedCF) {
  try { DATA_COST_FOB = JSON.parse(savedCF); } catch(e) {}
}
*/"""

NEW_LS = """var saved = localStorage.getItem("dq_products");
if (saved) {
  try { DATA_PRODUCTS = JSON.parse(saved); } catch(e) {}
}
var savedBags = localStorage.getItem("dq_bags");
if (savedBags) {
  try { DATA_BAGS = JSON.parse(savedBags); } catch(e) {}
}
var savedOthers = localStorage.getItem("dq_others");
if (savedOthers) {
  try { DATA_OTHERS = JSON.parse(savedOthers); } catch(e) {}
}
var savedML = localStorage.getItem("dq_maxLoading");
if (savedML) {
  try { DATA_MAX_LOADING = JSON.parse(savedML); } catch(e) {}
}
var savedCF = localStorage.getItem("dq_costFOB");
if (savedCF) {
  try { DATA_COST_FOB = JSON.parse(savedCF); } catch(e) {}
}"""


# ============================================================
# FIX 4: saveToServer() JS function
# ============================================================
SAVE_TO_SERVER_FN = """
function saveToServer() {
  var blocks = {};
  blocks.DATA_PRODUCTS = 'var DATA_PRODUCTS = ' + JSON.stringify(DATA_PRODUCTS, null, 2) + ';';
  blocks.DATA_BAGS = 'var DATA_BAGS = ' + JSON.stringify(DATA_BAGS, null, 2) + ';';
  blocks.DATA_OTHERS = 'var DATA_OTHERS = ' + JSON.stringify(DATA_OTHERS, null, 2) + ';';
  blocks.DATA_MAX_LOADING = 'var DATA_MAX_LOADING = ' + JSON.stringify(DATA_MAX_LOADING, null, 2) + ';';
  blocks.DATA_COST_FOB = 'var DATA_COST_FOB = ' + JSON.stringify(DATA_COST_FOB, null, 2) + ';';
  var xhr = new XMLHttpRequest();
  xhr.open('POST', '/api/ktg-data', true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = function() {
    if (xhr.status === 200) {
      console.log('[KTG] Saved to server');
    } else {
      console.error('[KTG] Server save failed:', xhr.status);
    }
  };
  xhr.onerror = function() { console.error('[KTG] Server save network error'); };
  xhr.send(JSON.stringify({ blocks: blocks }));
}
"""


# ============================================================
# Helper functions
# ============================================================

def apply_import_fixes(content):
    """Apply FIX 1 + FIX 2"""
    c = content
    # FIX 1: vndFields loop
    c = c.replace(OLD_LOOP, NEW_LOOP)
    # FIX 2: preserve section
    c = c.replace(OLD_PRESERVE, NEW_PRESERVE)
    return c


def add_save_to_en_zh(content, lang):
    """Add saveToServer function + button to en/zh"""
    # 1. Add saveToServer function before last </script>
    script_pos = content.rfind('</script>')
    c = content[:script_pos] + SAVE_TO_SERVER_FN + '\n' + content[script_pos:]
    
    # 2. Add save button HTML before pwModal
    modal_start = c.find('id="pwModal"')
    if modal_start < 0:
        modal_start = c.find('id="freightPopup"')
    
    if lang == 'en':
        btn = """
<!-- Save to Server Button -->
<div class="manage-actions" style="margin-top:8px">
<h3>&#128190; Server Sync</h3>
<p style="font-size:.85rem;color:var(--muted);margin-bottom:8px">Save current data to server to sync across all 3 languages (vi/en/zh)</p>
<button class="btn-confirm" id="saveServerBtn" onclick="saveToServer()">&#128190; Save to Server</button>
</div>
"""
    else:
        btn = """
<!-- Save to Server Button -->
<div class="manage-actions" style="margin-top:8px">
<h3>&#128190; Server Sync</h3>
<p style="font-size:.85rem;color:var(--muted);margin-bottom:8px">将当前数据保存到服务器以同步所有语言版本（vi/en/zh）</p>
<button class="btn-confirm" id="saveServerBtn" onclick="saveToServer()">&#128190; 保存到服务器</button>
</div>
"""
    
    c = c[:modal_start] + btn + '\n' + c[modal_start:]
    return c


def add_save_call(content):
    """Add saveToServer() call in handleManageFile"""
    target = 'status.className = "manage-status-sm ok"'
    target_pos = content.find(target)
    if target_pos < 0:
        # try without quotes around manage-status-sm ok
        target = 'status.className = "manage-status-sm ok"'
        target_pos = content.find(target)
    
    if target_pos > 0:
        indent = '      '
        insertion = f'{indent}saveToServer();\n'
        content = content[:target_pos] + insertion + content[target_pos:]
        print(f'    Added saveToServer() call')
    else:
        print(f'    WARNING: Could not find status.ok to insert saveToServer()')
    return content


# ============================================================
# PROCESS
# ============================================================
print("=" * 60)
print("Applying all fixes...")
print("=" * 60)

print("\n=== src/app.js ===")
js = read('src/app.js')
js_fixed = apply_import_fixes(js)
js_final = add_save_call(js_fixed)  # saveToServer call in source
write('src/app.js', js_final)

print("\n=== vi.html ===")
vi = read('vi.html')
vi_f1 = apply_import_fixes(vi)
vi_f2 = vi_f1.replace(OLD_LS_COMMENT, NEW_LS)
write('vi.html', vi_f2)

print("\n=== en.html ===")
en = read('en.html')
en_f1 = apply_import_fixes(en)
en_f2 = add_save_to_en_zh(en_f1, 'en')
en_f3 = add_save_call(en_f2)
write('en.html', en_f3)

print("\n=== zh.html ===")
zh = read('zh.html')
zh_f1 = apply_import_fixes(zh)
zh_f2 = add_save_to_en_zh(zh_f1, 'zh')
zh_f3 = add_save_call(zh_f2)
write('zh.html', zh_f3)

print("\n=== VERIFICATION ===")
for name in ['src/app.js', 'vi.html', 'en.html', 'zh.html']:
    c = read(name)
    print(f'\n--- {name} ---')
    
    # FIX 1 check
    loop_pos = c.find('Object.keys(vndFields).forEach')
    if loop_pos > 0:
        chunk = c[loop_pos:loop_pos+500]
        if 'obj[k + "_cn"]' in chunk:
            print(f'  ✗ OLD loop pattern (auto-copy to _cn) STILL PRESENT!')
        else:
            print(f'  ✓ vndFields loop fixed')
    
    # FIX 2 check
    preserve_pos = c.find('Market-specific fields')
    if preserve_pos > 0:
        chunk = c[preserve_pos:preserve_pos+200]
        if 'fall back to base' in chunk or 'fallback' in chunk:
            print(f'  ✓ Preserve section has fallback logic')
        elif '!== undefined' in c[preserve_pos:preserve_pos+2000] and '!' not in c[preserve_pos-50:preserve_pos]:
            # Still the old pattern
            pass
        else:
            print(f'  ✓ Preserve section updated')
    
    # FIX 3 check (vi)
    ls_pos = c.find('localStorage.getItem("dq_products")')
    if ls_pos > 0:
        before = c[max(0,ls_pos-10):ls_pos]
        if '/*' in before:
            print(f'  ✗ localStorage loading STILL COMMENTED!')
        else:
            print(f'  ✓ localStorage loading active')
    elif name == 'vi.html':
        print(f'  ✗ localStorage.getItem("dq_products") not found!')
    
    # FIX 4 check
    if 'function saveToServer' in c:
        print(f'  ✓ saveToServer function exists')
    else:
        print(f'  ✗ saveToServer function MISSING')
    
    if 'saveServerBtn' in c:
        print(f'  ✓ saveServerBtn (button) exists')
    else:
        print(f'  ✗ saveServerBtn MISSING')
    
    # Save call check
    fn_pos = c.find('function handleManageFile')
    if fn_pos > 0:
        fn_end = c.find('\nfunction ', fn_pos+1)
        fn = c[fn_pos:fn_end]
        if 'saveToServer()' in fn:
            print(f'  ✓ saveToServer() auto-called in handleManageFile')
        else:
            print(f'  ✗ saveToServer() NOT called in handleManageFile')

print("\n=== ALL DONE ===")
