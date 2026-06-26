import sys
sys.stdout.reconfigure(encoding="utf-8")
with open("sites/kiem-tra-gia/index.html","r",encoding="utf-8") as f:
    d = f.read()
s = d.index("<script>") + 8
e = d.rindex("</script>")
js = d[s:e]
lines = js.split("\n")
# Find tab initialization
for i, line in enumerate(lines):
    if "init" in line.lower() and ("function" in line or "=" in line):
        if "init" in line.lower() and len(line) < 80:
            print(f"{i}: {line.strip()[:100]}")
    if "tabclick" in line.lower() or "tab" in line.lower() and "click" in line.lower() and "listener" not in line.lower():
        print(f"{i}: {line.strip()[:100]}")
    if "switchTab" in line or "opentab" in line.lower() or "activateTab" in line:
        print(f"{i}: {line.strip()[:100]}")
