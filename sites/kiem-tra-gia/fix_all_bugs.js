var fs = require('fs');
var f = 'C:\\Users\\Admin\\.openclaw\\workspace-skills\\web-builder\\sites\\kiem-tra-gia\\vi.html';
var h = fs.readFileSync(f, 'utf8');

// Normalize LF first
h = h.replace(/\r\n/g, '\n');
console.log('Normalised CRLF -> LF');

var orig = h;
var count = 0;

// BUG 1: Copy 1 — dư }\n  } trước else if (type === 4)
var before1 = h;
h = h.replace('}\n  } else if (type === 4)', '} else if (type === 4)');
if (h !== before1) { count++; console.log('1a OK — extra } removed'); }
else { console.log('1a — NOT FOUND, trying with space variant'); }

// BUG 1b: Copy 1 — thiếu } trước var ws
var idx = h.indexOf('"freight"];\n  var ws');
if (idx > -1 && h.substring(idx - 3, idx) !== '}\n') {
  h = h.substring(0, idx + 11) + '}\n  ' + h.substring(idx + 11);
  count++;
  console.log('1b OK — missing } added before var ws');
} else if (idx > -1) {
  console.log('1b — already has }');
} else {
  console.log('1b — NOT FOUND');
}

// BUG 2: Copy 2 — thiếu type 4 case
var copy2Start = h.indexOf('\n  function downloadTemplate(', h.indexOf('\n  function manageLogin()'));
var type3Str = '} else if (type === 3) {\n    fn = "Mau_max_tai.xlsx";\n    headers = ["S\u1ea2N PH\u1ea8M","Max Loading 25KG","Max Loading Jumbo"];\n  }';
var type4Str = '} else if (type === 3) {\n    fn = "Mau_max_tai.xlsx";\n    headers = ["S\u1ea2N PH\u1ea8M","Max Loading 25KG","Max Loading Jumbo"];\n  } else if (type === 4) {\n    fn = "Mau_cuoc_noi_dia.xlsx";\n    headers = ["province","ward","address","freight"];\n  }';
var type3Idx = h.indexOf(type3Str, copy2Start);
if (type3Idx > -1) {
  var before = h.substring(0, type3Idx);
  var after = h.substring(type3Idx + type3Str.length);
  h = before + type4Str + after;
  count++;
  console.log('2 OK — type 4 case added to copy 2');
} else {
  console.log('2 — NOT FOUND copy 2 type 3');
}

// BUG 3: Upload handler — dư extra }
var applyIdx = h.indexOf('applyMarket();');
var ctx = h.substring(Math.max(0, applyIdx - 100), applyIdx);
console.log('3 — ctx around applyMarket(): ...' + ctx.slice(-80));

// Look for pattern: }\n      }\n      \n      applyMarket
h = h.replace(/\}\n      \}\n      \n      applyMarket\(\);/g, '}\n      \n      applyMarket();');
if (h.indexOf(orig) !== 0) { count++; console.log('3 OK — extra } removed'); }
else { console.log('3 — trying alternative'); }

// BUG 4: localStorage + counters
var lsPattern = 'localStorage.setItem("dq_applications", JSON.stringify(DATA_APPLICATIONS));\n      document.getElementById("mProdCnt")';
var lsReplacement = 'localStorage.setItem("dq_applications", JSON.stringify(DATA_APPLICATIONS));\n      localStorage.setItem("dq_domestic_freight", JSON.stringify(DATA_DOMESTIC_FREIGHT));\n      document.getElementById("mProdCnt")';
var before4 = h;
h = h.replace(lsPattern, lsReplacement);
if (h !== before4) { count++; console.log('4a OK — localStorage dq_domestic_freight added'); }
else { console.log('4a — NOT FOUND'); }

var cntPattern = 'if (document.getElementById("mAppCnt")) document.getElementById("mAppCnt").textContent = DATA_APPLICATIONS.length;\n      populateFilters();';
var cntReplacement = 'if (document.getElementById("mAppCnt")) document.getElementById("mAppCnt").textContent = DATA_APPLICATIONS.length;\n      if (document.getElementById("mFreightCnt")) document.getElementById("mFreightCnt").textContent = DATA_DOMESTIC_FREIGHT ? DATA_DOMESTIC_FREIGHT.length : 0;\n      populateFilters();';
var before4b = h;
h = h.replace(cntPattern, cntReplacement);
if (h !== before4b) { count++; console.log('4b OK — mFreightCnt counter added'); }
else { console.log('4b — NOT FOUND'); }

// Copy 1 manageLogin counter
var cntPattern2 = 'if (document.getElementById("mAppCnt")) document.getElementById("mAppCnt").textContent = DATA_APPLICATIONS.length;\n  } else {';
var cntReplacement2 = 'if (document.getElementById("mAppCnt")) document.getElementById("mAppCnt").textContent = DATA_APPLICATIONS.length;\n    if (document.getElementById("mFreightCnt")) document.getElementById("mFreightCnt").textContent = DATA_DOMESTIC_FREIGHT ? DATA_DOMESTIC_FREIGHT.length : 0;\n  } else {';
var before4c = h;
h = h.replace(cntPattern2, cntReplacement2);
if (h !== before4c) { count++; console.log('4c OK — mFreightCnt counter copy 1'); }
else { console.log('4c — NOT FOUND (maybe already patched)'); }

// BUG 5: saveToServer comma
var svPattern = '+ ";"\n      DATA_DOMESTIC_FREIGHT';
var svReplacement = '+ ";",\n      DATA_DOMESTIC_FREIGHT';
var before5 = h;
h = h.replace(svPattern, svReplacement);
if (h !== before5) { count++; console.log('5 OK — comma added to saveToServer'); }
else { console.log('5 — NOT FOUND'); }

fs.writeFileSync(f, h, 'utf8');
console.log('\nTotal fixes applied: ' + count);
console.log('File size: ' + h.length + ' bytes');

// Now verify
var opens = (h.match(/{/g) || []).length;
var closes = (h.match(/}/g) || []).length;
console.log('Braces: ' + opens + ' { = ' + closes + ' } ' + (opens === closes ? '✅ BALANCED' : '❌ IMBALANCE'));

var openDivs = (h.match(/<div[^>]*>/g) || []).length;
var closeDivs = (h.match(/<\/div>/g) || []).length;
console.log('Divs: ' + openDivs + ' <div> = ' + closeDivs + ' </div> ' + (openDivs === closeDivs ? '✅ BALANCED' : '❌ IMBALANCE'));
