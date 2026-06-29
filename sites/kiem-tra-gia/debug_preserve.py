import os

SRC = 'C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia'

# Let's carefully check what's ACTUALLY in the file at the preserve location
for name in ['vi.html']:
    path = os.path.join(SRC, name)
    with open(path, 'r', encoding='utf-8') as f:
        c = f.read()
    
    # Find "Preserve market" exactly
    idx = c.find('Preserve market')
    print(f'=== {name} ===')
    print(f'Found "Preserve market" at pos {idx}')
    print(f'Character around it: {repr(c[idx:idx+100])}')
    
    # Also check what the OLD_PRESERVE_BLOCK header looks like
    header = '    // Preserve market-specific fields from template files'
    print(f'\nLooking for header: {repr(header)}')
    idx2 = c.find(header)
    print(f'Header found at: {idx2}')
    
    if idx2 > 0:
        # Check the exact 16 following lines
        rest = c[idx2:idx2+3000]
        lines = rest.split('\n')
        print(f'\nNumber of lines in chunk: {len(lines)}')
        for i, line in enumerate(lines[:18]):
            print(f'  Line {i}: {repr(line)}')
    
    # Now check what the NEW header will produce
    NEW_PRESERVE_HEADER = "    // Market-specific fields: use column if exists, else fall back to base"
    print(f'\nNew header: {repr(NEW_PRESERVE_HEADER)}')
    
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
    
    OLD_LINES = []
    for base, cn, other in FIELDS:
        OLD_LINES.append(f'    if (r.{cn} !== undefined) obj.{cn} = Number(r.{cn});')
        OLD_LINES.append(f'    if (r.{other} !== undefined) obj.{other} = Number(r.{other});')
    
    OLD_PRESERVE_BLOCK = header + '\n' + '\n'.join(OLD_LINES)
    print(f'\nOld block first 200 chars: {repr(OLD_PRESERVE_BLOCK[:200])}')
    print(f'Old block last 200 chars: {repr(OLD_PRESERVE_BLOCK[-200:])}')
    
    # Now check if this appears in file
    if OLD_PRESERVE_BLOCK in c:
        print('\nOLD_PRESERVE_BLOCK FOUND in file!')
    else:
        print('\nOLD_PRESERVE_BLOCK NOT FOUND in file!')
        # Check partial matches
        for i, line in enumerate(OLD_LINES):
            if line in c:
                print(f'  Line {i} found: {line}')
            else:
                print(f'  Line {i} NOT found: {line}')
