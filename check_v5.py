import sys, re
sys.stdout.reconfigure(encoding='utf-8')
with open('C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/index.html', 'r', encoding='utf-8') as f:
    t = f.read()

idx = t.find('function renderPriceTab')
if idx > 0:
    end = t.find('function renderCalcTab', idx)
    body = t[idx:end]
    calls = body.count('__(')
    print('renderPriceTab:', calls, '__() calls in', len(body), 'bytes')
    for m in re.finditer(r"__\([^)]*\)", body):
        ctx = t[max(0,m.start()-10):m.end()+5]
        safe = ctx.encode('utf-8', errors='replace').decode('utf-8')
        print('  ', safe[:90])

idx2 = t.find('function renderBagsTab')
if idx2 > 0:
    end2 = t.find('function renderOthersTab', idx2)
    if end2 < 0:
        end2 = idx2 + 2000
    body = t[idx2:end2]
    c2 = body.count('__(')
    print('\nrenderBagsTab:', c2, '__() calls')

idx3 = t.find('function renderCalcTab')
if idx3 > 0:
    end3 = t.find('function render', idx3+50)
    if end3 < 0:
        end3 = idx3 + 10000
    body = t[idx3:end3]
    c3 = body.count('__(')
    print('renderCalcTab:', c3, '__() calls')
    for m in re.finditer(r"__\([^)]*\)", body):
        ctx = t[max(0,m.start()-10):m.end()+5]
        safe = ctx.encode('utf-8', errors='replace').decode('utf-8')
        print('  ', safe[:90])

idx4 = t.rfind('function render()')
if idx4 > 0:
    end4 = t.find('function updateDataInfo', idx4)
    body = t[idx4:end4]
    c4 = body.count('__(')
    print('\nrender():', c4, '__() calls')

opens = t.count('__(')
closes = t.count(') +')
print('\n__() open parens:', opens)
print(') + close pairs:', closes)
