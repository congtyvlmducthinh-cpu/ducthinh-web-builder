import sys
sys.stdout.reconfigure(encoding='utf-8')
with open(r'C:\Users\Admin\.openclaw\workspace-skills\web-builder\sites\kiem-tra-gia\index.html','r',encoding='utf-8') as f:
    d = f.read()

# Show full manageDashboard HTML
idx = d.find('id="manageDashboard"')
end = d.find('</div>\n\n</div>\n\n</div>', idx) + 80
if end < 80:
    end = d.find('<script>', idx)
print(d[idx:end])
