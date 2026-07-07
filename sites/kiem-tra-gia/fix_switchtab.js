var fs = require('fs');
var h = fs.readFileSync(__dirname + '/vi.html', 'utf8');

// Add hide fobptscPanel to switchTab after manage panel
var old = 'if (mp) mp.classList.toggle("open", tab === "manage");';
var updated = 'if (mp) mp.classList.toggle("open", tab === "manage");\n  var fp = document.getElementById("fobptscPanel");\n  if (fp) fp.style.display = (tab === "fobptsc") ? "block" : "none";';
h = h.split(old).join(updated);

fs.writeFileSync(__dirname + '/vi.html', h, 'utf8');
console.log('Done - switchTab updated to toggle fobptscPanel');
