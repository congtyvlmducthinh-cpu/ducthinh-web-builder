import os

SRC = 'C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia'

# Check if there's a server-side file for the API
for name in os.listdir(SRC):
    if 'server' in name.lower() or 'api' in name.lower():
        print(f'  {name}')

# Check _fix-server files
print('\nChecking server files:')
import glob
for f in glob.glob(SRC + '/_*server*'):
    sz = os.path.getsize(f)
    print(f'  {os.path.basename(f)} ({sz} bytes)')

# Also check src directory
src_dir = SRC + '/src'
if os.path.isdir(src_dir):
    print(f'\nFiles in src/:')
    for f in os.listdir(src_dir):
        sz = os.path.getsize(src_dir + '/' + f)
        print(f'  {f} ({sz} bytes)')
