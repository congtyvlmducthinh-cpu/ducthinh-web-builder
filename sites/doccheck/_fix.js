const fs = require("fs");
const tpl = fs.readFileSync("sites/doccheck/template.html","utf-8");

// Find and replace the example-chips div
const oldStart = tpl.indexOf('<div class="example-chips">');
const oldEnd = tpl.indexOf("</div>", oldStart) + 6;

const newChips = '<div class="example-chips">'+
'<span onclick="clickSample(\'gdrive\')"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/></svg> Google Drive mẫu</span>'+
'<span onclick="clickSample(\'inv\')"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg> Invoice mẫu</span>'+
'<span onclick="clickSample(\'bl\')"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 17H2a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3Z"/><path d="M6 10V2h12v8"/><path d="M2 10h20v5H2Z"/></svg> BL mẫu</span>'+
'<span onclick="clickSample(\'compare\')"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg> So sánh mẫu</span>'+
'</div>';

const result = tpl.substring(0, oldStart) + newChips + tpl.substring(oldEnd);

// Now replace the function region: exampleClick + IIFE + toggleGuide
const oldExampleFn = result.indexOf('function exampleClick');
const oldToggleFn = result.indexOf('function toggleGuide', oldExampleFn);
// We need to find where the IIFE ends. The IIFE is before toggleGuide
// Find the IIFE start: it should be right before toggleGuide
const iifeStart = result.lastIndexOf('(function(){', oldToggleFn - 50);

// Replace everything from exampleClick to toggleGuide (inclusive)
const newCode = 
'function exampleClick(text) { var el=document.getElementById("msgInput"); if(el){el.value=text;autoResize(el);el.focus();} }\n'+
'var SAMPLES={\n'+
'  gdrive:"Kiểm tra chứng từ tại link:\\nhttps://drive.google.com/file/d/1abcXYZexample123/view?usp=sharing",\n'+
'  inv:"Kiểm tra invoice sau:\\nSố: INV-2026-001\\nNgày: 15/06/2026\\nNgười bán: DUC THINH NEW MATERIAL TECHNOLOGY CO., LTD\\nNgười mua: NEW POWERFUL INTERNATIONAL LIMITED\\nHàng hóa: Ground Calcium Carbonate\\nSố lượng: 135 MT\\nĐơn giá: 85 USD/MT\\nTổng: 11,475 USD\\nĐiều khoản TT: T/T 30 days\\nIncoterm: FOB Hai Phong",\n'+
'  bl:"Kiểm tra BL:\\nSố BL: DB-aabbcc\\nTên tàu: MSC ARIANA\\nCảng xếp: HAI PHONG PORT, VIETNAM\\nCảng dỡ: SURABAYA, INDONESIA\\nShipper: DUC THINH NEW MATERIAL TECHNOLOGY CO., LTD\\nConsignee: NEW POWERFUL INTERNATIONAL LIMITED\\n5 containers\\nFreight prepaid",\n'+
'  compare:"So sánh 2 invoice này:\\n---\\nInvoice A:\\nSố: INV-001\\nSố lượng: 100 MT\\nĐơn giá: 85 USD/MT\\n---\\nInvoice B:\\nSố: INV-002\\nSố lượng: 100 MT\\nĐơn giá: 82 USD/MT"\n'+
'};\n'+
'function clickSample(k){ if(SAMPLES[k]) exampleClick(SAMPLES[k]); }\n'+
'\n'+
'function toggleGuide()';

const result2 = result.substring(0, oldExampleFn) + newCode + result.substring(oldToggleFn);

fs.writeFileSync("sites/doccheck/template.html", result2, "utf-8");
console.log("OK " + fs.statSync("sites/doccheck/template.html").size + " bytes");