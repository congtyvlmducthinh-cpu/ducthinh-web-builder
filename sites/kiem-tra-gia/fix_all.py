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
# FIX 1: Remove auto-copy base->_cn/_other inside vndFields loop
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
# FIX 2: Preserve section - use fallback to base value
# ============================================================
OLD_PRESERVE_HEADER = "    // Preserve market-specific fields from template files"
NEW_PRESERVE_HEADER = "    // Market-specific fields: use column if exists, else fall back to base"

OLD_LINES = []
NEW_LINES = []
FIELDS = [
    ('exw_vnd', 'exw_vnd_cn', 'exw_vnd_other'),
    ('exw_usd', 'exw_usd_cn', 'exw_usd_other'),
    ('comm_vnd', 'comm_vnd_cn', 'comm_vnd_other'),
    ('comm_usd', 'comm_usd_cn', 'comm_usd_other'),
    ('pkg25_vnd', 'pkg25_vnd_cn', 'pkg25_vnd_other'),
    ('pkg25_usd', 'pkg25_usd_cn', 'pkg25_usd_other'),
    ('jumbo_vnd', 'jumbo_vnd_cn', 'jumbo_vnd_other'),
    ('jumbo_usd', 'jumbo_usd_cn', 'jumbo_usd_other'),
]

for base, cn, other in FIELDS:
    OLD_LINES.append(f'    if (r.{cn} !== undefined) obj.{cn} = Number(r.{cn});')
    OLD_LINES.append(f'    if (r.{other} !== undefined) obj.{other} = Number(r.{other});')
    NEW_LINES.append(f'    obj.{cn} = r.{cn} !== undefined ? Number(r.{cn}) : obj.{base};')
    NEW_LINES.append(f'    obj.{other} = r.{other} !== undefined ? Number(r.{other}) : obj.{base};')

OLD_PRESERVE_BLOCK = OLD_PRESERVE_HEADER + '\n' + '\n'.join(OLD_LINES)
NEW_PRESERVE_BLOCK = NEW_PRESERVE_HEADER + '\n' + '\n'.join(NEW_LINES)


def apply_import_fixes(content):
    """Apply FIX 1 + FIX 2 to the importProducts function"""
    c = content
    # Old loop appears once
    cnt_old = c.count(OLD_LOOP)
    c = c.replace(OLD_LOOP, NEW_LOOP)
    
    # Old preserve block might have different char encoding
    # Try the exact version first
    c = c.replace(OLD_PRESERVE_BLOCK, NEW_PRESERVE_BLOCK)
    
    # Also try with "market-specific" not capitalized
    alt_old = OLD_PRESERVE_BLOCK.replace("Preserve market-specific", "preserve market-specific")
    alt_new = NEW_PRESERVE_BLOCK.replace("Preserve market-specific", "preserve market-specific")
    c = c.replace(alt_old, alt_new)
    
    return c


# ============================================================
# FIX 3: vi.html - uncomment localStorage loading block
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
# FIX 5: en.html & zh.html - add save button HTML in Manage tab
# ============================================================
SAVE_BTN_HTML_EN = """
<!-- Save to Server Button -->
<div class="manage-actions" style="margin-top:8px">
<h3>&#128190; Server Sync</h3>
<p style="font-size:.85rem;color:var(--muted);margin-bottom:8px">Save current data to server to sync across all 3 languages (vi/en/zh)</p>
<button class="btn-confirm" id="saveServerBtn" onclick="saveToServer()">&#128190; Save to Server</button>
</div>
"""

SAVE_BTN_HTML_ZH = """
<!-- Save to Server Button -->
<div class="manage-actions" style="margin-top:8px">
<h3>&#128190; Server Sync</h3>
<p style="font-size:.85rem;color:var(--muted);margin-bottom:8px">将当前数据保存到服务器以同步所有语言版本（vi/en/zh）</p>
<button class="btn-confirm" id="saveServerBtn" onclick="saveToServer()">&#128190; 保存到服务器</button>
</div>
"""


def add_save_to_en_zh(content, lang):
    """Add both save server function+button to en/zh files"""
    
    # 1. Add saveToServer function before last </script>
    script_pos = content.rfind('</script>')
    c = content[:script_pos] + SAVE_TO_SERVER_FN + '\n' + content[script_pos:]
    
    # 2. Add save button HTML after the existing manage-actions div
    # Find the closing </div> of the manage-actions div
    manage_div_end = c.rfind('</div>', 0, c.find('id="manage"') + 2000)
    # More precisely, find last </div> before the modal overlay
    # Let's find the manage section
    
    # The existing manage-actions div ends with </div> (closing the manage-actions div)
    # Then there's another </div> (closing the manage tab section)
    # Then we want to insert before the modal
    
    # Find the freigthPopup or pwModal that comes after manage
    modal_start = c.find('id="pwModal"')
    if modal_start < 0:
        modal_start = c.find('id="freightPopup"')
    
    # Insert save button before the modal
    if lang == 'en':
        btn_html = SAVE_BTN_HTML_EN
    else:
        btn_html = SAVE_BTN_HTML_ZH
    
    c = c[:modal_start] + btn_html + '\n' + c[modal_start:]
    
    return c


def add_save_call(content):
    """Add saveToServer() call in handleManageFile after render()"""
    # Find "render();" in handleManageFile
    # Look for the pattern: 
    # populateFilters();
    #       render();
    #       status.className = "manage-status-sm ok";
    # Replace: after render() and before status update, add saveToServer()
    
    # Find the section inside handleManageFile
    fn_start = content.find('function handleManageFile')
    if fn_start < 0:
        return content
    
    # Find the specific pattern inside the function
    idx = fn_start
    target = 'status.className = "manage-status-sm ok"'
    target_pos = content.find(target, idx)
    if target_pos < 0:
        # Try alternative wording
        target = 'status.className = "manage-status-sm ok"'
        target_pos = content.find(target, idx)
    
    if target_pos > 0:
        # Insert saveToServer() before status update
        indent = '      '
        insertion = f'{indent}saveToServer();\n'
        content = content[:target_pos] + insertion + content[target_pos:]
        print(f'    Added saveToServer() call before status update at pos {target_pos}')
    else:
        print(f'    WARNING: Could not find status.className after render() to insert saveToServer() call')
    
    return content


# ============================================================
# PROCESS ALL FILES
# ============================================================
print("=" * 60)
print("FIX 1+2: importProducts - fix _cn/_other fallback")
print("FIX 3: vi.html - uncomment localStorage loading")
print("FIX 4+5: en/zh.html - add saveToServer function + button + auto-call")
print("=" * 60)

print("\n=== src/app.js ===")
js = read('src/app.js')
js_fixed = apply_import_fixes(js)
js_final = add_save_call(js_fixed)
write('src/app.js', js_final)

print("\n=== vi.html ===")
vi = read('vi.html')
# vi.html already has saveToServer and saveToServer() call
# Just fix importProducts + uncomment localStorage loading
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
    
    # Check FIX 1: no more obj[k + "_cn"] in the loop
    # The old loop pattern shouldn't exist
    # Check new loop has only obj[k] = ...
    loop_pos = c.find('Object.keys(vndFields).forEach')
    if loop_pos > 0:
        chunk = c[loop_pos:loop_pos+2000]
        if 'obj[k + "_cn"]' in chunk or 'obj[k+"_cn"]' in chunk:
            print(f'  WARNING: Still has old auto-copy _cn pattern!')
        else:
            print(f'  OK: vndFields loop fixed')
    
    # Check FIX 2: preserve section uses fallback
    preserve_pos = c.find('Market-specific fields')
    if preserve_pos > 0:
        chunk = c[preserve_pos:preserve_pos+2000]
        if '!== undefined' in chunk and 'obj.{base}' not in chunk:
            # Check if it has the new fallback pattern
            if '!== undefined ?' in chunk:
                print(f'  OK: Preserve section uses fallback')
            else:
                print(f'  WARNING: Preserve section might still be old style')
        else:
            print(f'  OK: Preserve section updated')
    
    # Check FIX 3 (vi only): localStorage loading uncommented
    ls_pos = c.find('localStorage.getItem("dq_products")')
    if ls_pos > 0:
        before = c[max(0,ls_pos-30):ls_pos]
        if '/*' in before:
            print(f'  WARNING: localStorage loading still commented!')
        else:
            print(f'  OK: localStorage loading active')
    else:
        print(f'  WARNING: localStorage loading block not found!')
    
    # Check FIX 4: saveToServer function exists
    if 'function saveToServer' in c:
        print(f'  OK: saveToServer function exists')
    else:
        print(f'  WARNING: saveToServer function MISSING')
    
    # Check saveToServer button
    if 'saveServerBtn' in c:
        print(f'  OK: saveServerBtn exists')
    else:
        print(f'  WARNING: saveServerBtn MISSING')
    
    # Check saveToServer() call in handleManageFile
    fn_pos = c.find('function handleManageFile')
    if fn_pos > 0:
        fn_end = c.find('\nfunction ', fn_pos+1)
        fn = c[fn_pos:fn_end]
        if 'saveToServer()' in fn:
            print(f'  OK: saveToServer() auto-called in handleManageFile')
        else:
            print(f'  WARNING: saveToServer() NOT auto-called in handleManageFile')

print("\n=== All files processed ===")
