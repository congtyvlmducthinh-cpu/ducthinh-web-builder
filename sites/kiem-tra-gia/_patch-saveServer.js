var fs = require("fs");
var js = fs.readFileSync("src/app.js", "utf-8");

var idx = js.indexOf("function manageLogin()");
if (idx < 0) { console.log("ERROR: cannot find manageLogin"); process.exit(1); }

var before = js.substring(0, idx);
var after = js.substring(idx);

var saveFunc = [
  "",
  '// ====== SAVE DATA TO SERVER ======',
  'function detectCurrentLang() {',
  '  var path = window.location.pathname;',
  '  var m = path.match(/\/(vi|en|zh)(?:\.html)?(?:\/|$)/);',
  '  return m ? m[1] : "vi";',
  '}',
  "",
  'function saveToServer() {',
  '  var btn = document.getElementById("saveServerBtn");',
  '  if (!btn) return;',
  '  var origText = btn.textContent;',
  '  btn.textContent = "\u23f3 \u0110ang l\u01b0u...";',
  '  btn.disabled = true;',
  '  var status = document.getElementById("manageUploadStatus");',
  "",
  '  var payload = {',
  '    lang: "__ALL__",',
  '    blocks: {',
  '      DATA_PRODUCTS: "var DATA_PRODUCTS = " + JSON.stringify(DATA_PRODUCTS, null, 2) + ";",',
  '      DATA_BAGS: "var DATA_BAGS = " + JSON.stringify(DATA_BAGS, null, 2) + ";",',
  '      DATA_OTHERS: "var DATA_OTHERS = " + JSON.stringify(DATA_OTHERS, null, 2) + ";"',
  '    }',
  '  };',
  "",
  '  var xhr = new XMLHttpRequest();',
  '  xhr.open("POST", "/api/ktg-data", true);',
  '  xhr.setRequestHeader("Content-Type", "application/json");',
  '  xhr.onload = function() {',
  '    btn.textContent = origText;',
  '    btn.disabled = false;',
  '    if (status) {',
  '      status.style.display = "block";',
  '      status.className = xhr.status === 200 ? "manage-status-sm ok" : "manage-status-sm err";',
  '      status.textContent = xhr.status === 200',
  '        ? "\u2705 \u0110\u00e3 l\u01b0u l\u00ean server! T\u1ea3i l\u1ea1i en.html, zh.html \u0111\u1ec3 th\u1ea5y d\u1eef li\u1ec7u m\u1edbi."',
  '        : "\u274c L\u1ed7i: " + xhr.status + " - " + xhr.statusText;',
  '    }',
  '  };',
  '  xhr.onerror = function() {',
  '    btn.textContent = origText;',
  '    btn.disabled = false;',
  '    if (status) {',
  '      status.style.display = "block";',
  '      status.className = "manage-status-sm err";',
  '      status.textContent = "\u274c Kh\u00f4ng th\u1ec3 k\u1ebft n\u1ed1i server!";',
  '    }',
  '  };',
  '  xhr.send(JSON.stringify(payload));',
  '}',
  ""
].join("\n");

js = before + saveFunc + after;
fs.writeFileSync("src/app.js", js);
console.log("saveToServer function added:", js.indexOf("function saveToServer()") >= 0);
