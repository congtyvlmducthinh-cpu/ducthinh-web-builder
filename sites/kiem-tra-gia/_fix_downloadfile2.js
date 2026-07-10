var fs = require('fs');
var path = require('path');
var filePath = path.join(__dirname, 'vi.html');
var h = fs.readFileSync(filePath, 'utf8').replace(/\r\n/g, '\n');

// Fix downloadFile function - replace entire function body cleanly
var df = h.indexOf('function downloadFile');
var dfEnd = h.indexOf('function downloadAsExcel');
var oldFn = h.substring(df, dfEnd);

var newFn = 
'function downloadFile(type) {\n' +
'  var fn = "", data = [], sheetName = "";\n' +
'  if (type === 0) { fn = "Gia_ban_toi_thieu.xlsx"; data = DATA_PRODUCTS; sheetName = "Products"; }\n' +
'  else if (type === 1) { fn = "Surcharge_bao_bi.xlsx"; data = DATA_BAGS; sheetName = "Bags"; }\n' +
'  else if (type === 2) { fn = "Quy_cach_khac.xlsx"; data = DATA_OTHERS; sheetName = "Others"; }\n' +
'  else if (type === 3) {\n' +
'    fn = "Max_loadding.xlsx";\n' +
'    var mlArr = [];\n' +
'    if (DATA_MAX_LOADING && Object.keys(DATA_MAX_LOADING).length > 0) {\n' +
'      Object.keys(DATA_MAX_LOADING).forEach(function(k) {\n' +
'        var o = {"SẢN PHẨM": k};\n' +
'        if (DATA_MAX_LOADING[k].max25 !== undefined) o["Max Loading 25KG"] = DATA_MAX_LOADING[k].max25;\n' +
'        if (DATA_MAX_LOADING[k].maxJumbo !== undefined) o["Max Loading Jumbo"] = DATA_MAX_LOADING[k].maxJumbo;\n' +
'        mlArr.push(o);\n' +
'      });\n' +
'    }\n' +
'    data = mlArr;\n' +
'    sheetName = "MaxLoading";\n' +
'  } else if (type === 4) {\n' +
'    fn = "Ung_dung.xlsx";\n' +
'    data = JSON.parse(JSON.stringify(DATA_APPLICATIONS));\n' +
'    sheetName = "Applications";\n' +
'  } else if (type === 5) {\n' +
'    fn = "Cuoc_noi_dia.xlsx";\n' +
'    data = JSON.parse(JSON.stringify(DATA_DOMESTIC_FREIGHT));\n' +
'    sheetName = "Freight";\n' +
'  }\n' +
'  if (!data.length) return;\n' +
'  var ws = XLSX.utils.json_to_sheet(data);\n' +
'  var wb = XLSX.utils.book_new();\n' +
'  XLSX.utils.book_append_sheet(wb, ws, sheetName);\n' +
'  XLSX.writeFile(wb, fn);\n' +
'}\n';

h = h.replace(oldFn, newFn);
console.log('Replaced downloadFile function.');

// Verify indentation
var df2 = h.indexOf('function downloadFile');
var dfEnd2 = h.indexOf('function downloadAsExcel');
console.log('=== Cleaned downloadFile ===');
console.log(h.substring(df2, dfEnd2));

fs.writeFileSync(filePath, h, 'utf8');
console.log('Written.');
