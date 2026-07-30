var fs = require('fs');
var files = ['sites/kiem-tra-gia/vi.html', 'sites/kiem-tra-gia/en.html', 'sites/kiem-tra-gia/zh.html'];
var toasts = {
  'sites/kiem-tra-gia/vi.html': '✅ Đã lưu cấu hình FOB PTSC!',
  'sites/kiem-tra-gia/en.html': '✅ FOB PTSC config saved!',
  'sites/kiem-tra-gia/zh.html': '✅ FOB PTSC 设置已保存！'
};
var btnRegex = /onclick="fobPtscSaveCfg\(\);saveToServer\(\)"/g;

files.forEach(function(f) {
  var s = fs.readFileSync(f, 'utf8');
  var msg = toasts[f];
  
  // 1. Add showToast function right before fobPtscSaveCfg
  var toastFn = "\nfunction showToast(msg, color) {\n  var t = document.createElement('div');\n  t.style.cssText = 'position:fixed;bottom:30px;left:50%;transform:translateX(-50%);background:'+(color||'#2e7d32')+';color:#fff;padding:10px 24px;border-radius:8px;font-size:15px;z-index:99999;box-shadow:0 4px 12px rgba(0,0,0,0.3);transition:opacity 0.3s';\n  t.textContent = msg;\n  document.body.appendChild(t);\n  setTimeout(function(){ t.style.opacity='0'; setTimeout(function(){t.remove()},400); }, 2000);\n}\n";
  
  var fnIdx = s.indexOf('function fobPtscSaveCfg()');
  s = s.substring(0, fnIdx) + toastFn + s.substring(fnIdx);
  
  // 2. Replace button onclick to include showToast
  s = s.replace(btnRegex, 'onclick="fobPtscSaveCfg();saveToServer();showToast(\'' + msg.replace(/'/g,"\\'") + '\')"');
  
  fs.writeFileSync(f, s, 'utf8');
  console.log(f + ': ✅ Added toast');
});
