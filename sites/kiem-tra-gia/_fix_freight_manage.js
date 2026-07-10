var fs = require('fs');
var path = require('path');
var filePath = path.join(__dirname, 'vi.html');
var h = fs.readFileSync(filePath, 'utf8').replace(/\r\n/g, '\n');

// === CONFIGURABLE INSERTS ===

// Change 1: Add freight sheet detection in handleManageFile
var mf = h.indexOf('function handleManageFile');
var impML = h.indexOf('function importMaxLoading', mf);
var block = h.substring(mf, impML);

var am = block.indexOf('applyMarket()');
var freightBlock = 
  "      var freightSheet = hasSheet([\"Freight\", \"freight\", \"Cuoc noi dia\", \"cuoc noi dia\", \"CuocNoiDia\", \"Domestic Freight\", \"domestic_freight\"]);\n" +
  "      if (freightSheet) {\n" +
  "        var s = XLSX.utils.sheet_to_json(wb.Sheets[freightSheet]);\n" +
  "        if (s.length > 0) { DATA_DOMESTIC_FREIGHT = s; updated++; }\n" +
  "  }\n";

var before = block.substring(0, am);
var after = block.substring(am);
var newBlock = before + freightBlock + after;
h = h.substring(0, mf) + newBlock + h.substring(impML);

// Change 2: Add DATA_DOMESTIC_FREIGHT to saveToServer payload
var ss = h.indexOf('function saveToServer');
var ssBlock = h.substring(ss, ss + 1800);
var bStart = ssBlock.indexOf('blocks:');
var bEnd = ssBlock.indexOf('};', bStart);
var oldBlocks = ssBlock.substring(bStart, bEnd + 2);
var newBlocks = oldBlocks.replace(
  'DATA_APPLICATIONS:',
  'DATA_DOMESTIC_FREIGHT: "var DATA_DOMESTIC_FREIGHT = " + JSON.stringify(DATA_DOMESTIC_FREIGHT, null, 2) + ";",\n      DATA_APPLICATIONS:'
);
h = h.replace(oldBlocks, newBlocks);

// Change 3a: Add freight download button
var btn3 = '<button class="btn-confirm" onclick="downloadFile(3)">📋 Ứng Dụng</button>';
var btn4 = btn3 + '<button class="btn-confirm" onclick="downloadFile(5)">🚚 Cước nội địa</button>';
h = h.replace(btn3, btn4);

// Change 3b: Add case 5 to downloadFile
var df = h.indexOf('function downloadFile');
var dfEnd = h.indexOf('function downloadAsExcel');
var dfBlock = h.substring(df, dfEnd);

// Find the 'if (!data.length) return;' line
var nullCheck = dfBlock.indexOf('if (!data.length)');
var case5Block = 
  ' } else if (type === 5) {\n' +
  '    fn = "Cuoc_noi_dia.xlsx";\n' +
  '    data = JSON.parse(JSON.stringify(DATA_DOMESTIC_FREIGHT));\n' +
  '    sheetName = "Freight";\n';

var dfNew = dfBlock.substring(0, nullCheck) + case5Block + dfBlock.substring(nullCheck);
h = h.replace(dfBlock, dfNew);

// Write result
fs.writeFileSync(filePath, h, 'utf8');
console.log('Done writing.');

// Verification
console.log('freightSheet in handleManageFile:', h.indexOf('freightSheet', h.indexOf('handleManageFile')) >= 0);
console.log('DATA_DOMESTIC_FREIGHT in saveToServer:', h.indexOf('DATA_DOMESTIC_FREIGHT', h.indexOf('saveToServer')) >= 0);
console.log('Cuoc noi dia button:', h.indexOf("Cuoc noi dia") >= 0);
console.log('type === 5 in downloadFile:', h.indexOf('type === 5', h.indexOf('function downloadFile')) >= 0);
