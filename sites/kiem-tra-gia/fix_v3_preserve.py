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
# FIX: importProducts - remove preserve section entirely
# ============================================================
# The preserve section's old comment header
OLD_COMMENT = '    // Preserve market-specific fields from template files'
NEW_COMMENT = '    // Market-specific fields: always base value (not from Excel)'

# Build old preserve block (all _cn first, then all _other - exact file order)
CN_FIELDS = ['exw_vnd_cn', 'exw_usd_cn', 'comm_vnd_cn', 'comm_usd_cn', 'pkg25_vnd_cn', 'pkg25_usd_cn', 'jumbo_vnd_cn', 'jumbo_usd_cn']
OTHER_FIELDS = ['exw_vnd_other', 'exw_usd_other', 'comm_vnd_other', 'comm_usd_other', 'pkg25_vnd_other', 'pkg25_usd_other', 'jumbo_vnd_other', 'jumbo_usd_other']
BASE_FIELDS = ['exw_vnd', 'exw_usd', 'comm_vnd', 'comm_usd', 'pkg25_vnd', 'pkg25_usd', 'jumbo_vnd', 'jumbo_usd']

OLD_CN_LINES = [f'    if (r.{f} !== undefined) obj.{f} = Number(r.{f});' for f in CN_FIELDS]
OLD_OTHER_LINES = [f'    if (r.{f} !== undefined) obj.{f} = Number(r.{f});' for f in OTHER_FIELDS]
NEW_CN_LINES = [f'    obj.{f} = obj.{f.replace("_cn","")};' for f in CN_FIELDS]
NEW_OTHER_LINES = [f'    obj.{f} = obj.{f.replace("_other","")};' for f in OTHER_FIELDS]

# Also handle the "new fallback" version (from fix_all2.py) - in case it was already applied
NEW_FALLBACK_CN = [f'    obj.{f} = r.{f} !== undefined ? Number(r.{f}) : obj.{f.replace("_cn","")};' for f in CN_FIELDS]
NEW_FALLBACK_OTHER = [f'    obj.{f} = r.{f} !== undefined ? Number(r.{f}) : obj.{f.replace("_other","")};' for f in OTHER_FIELDS]

# OLD version (original, still in vi.html if patch didn't work)
OLD_BLOCK = OLD_COMMENT + '\n' + '\n'.join(OLD_CN_LINES) + '\n' + '\n'.join(OLD_OTHER_LINES)

# NEW FALLBACK version (from fix_all2.py - applied to app.js already)
FALLBACK_BLOCK = '    // Market-specific fields: use column if exists, else fall back to base' + '\n' + '\n'.join(NEW_FALLBACK_CN) + '\n' + '\n'.join(NEW_FALLBACK_OTHER)

# We want: always = base value, ignore Excel column
ALWAYS_BASE_BLOCK = NEW_COMMENT + '\n' + '\n'.join(NEW_CN_LINES) + '\n' + '\n'.join(NEW_OTHER_LINES)

print("=== Fix importProducts: remove preserve from Excel ===")
print()

for name in ['src/app.js', 'vi.html', 'en.html', 'zh.html']:
    path = os.path.join(SRC, name)
    with open(path, 'r', encoding='utf-8') as f:
        c = f.read()
    orig = c
    
    # Apply the fix
    # Try to find the preserve section in any of its versions
    
    # Version 1: already the fallback version (from previous fix)
    if 'Market-specific fields: use column if exists, else fall back to base' in c:
        print(f'{name}: Found fallback version, replacing...')
        c = c.replace(FALLBACK_BLOCK, ALWAYS_BASE_BLOCK)
    elif 'Market-specific fields: always base value' in c:
        print(f'{name}: Already fixed!')
        continue
    # Version 2: original "Preserve market-specific fields from template files"
    elif 'Preserve market-specific fields from template files' in c:
        print(f'{name}: Found original preserve block...')
        c = c.replace(OLD_BLOCK, ALWAYS_BASE_BLOCK)
    else:
        print(f'{name}: WARNING - Could not find any preserve block!')
        # Debug: search for r.exw_vnd_cn
        idx = c.find('exw_vnd_cn')
        if idx > 0:
            print(f'  Found exw_vnd_cn at {idx}: {repr(c[max(0,idx-30):idx+50])}')
        else:
            print(f'  No exw_vnd_cn found at all!')
        continue
    
    if c != orig:
        write(name, c)
        print(f'  ✓ Fixed')
    else:
        print(f'  ✗ No change (replace failed)')

print("\nDone!")
