var c = require("fs").readFileSync("sites/kiem-tra-gia/modules/13-quotation-tab.js", "utf-8");
var LF = "\r\n";

// Full rewrite of renderQuotationTab
var fnS = c.indexOf("function renderQuotationTab() {");
var brace = c.indexOf("{", fnS);
var d = 0, fnE = brace;
for (var i = brace; i < c.length; i++) { if (c[i] === "{") d++; if (c[i] === "}") d--; if (d === 0) { fnE = i; break; } }

var newFunc =
"function renderQuotationTab() {" + LF +
"  var h = '<div class=\"quot-grid\">';" + LF +
"  h += '<div class=\"quot-left\">';" + LF +
"" + LF +
"  // ====== Kh\u00E1ch h\u00E0ng ======" + LF +
"  h += '<div class=\"quot-section\">';" + LF +
"  h += '<div class=\"quot-section-title\" onclick=\"toggleQuotSection(this)\"><span class=\"badge blue\">\uD83C\uDFE2</span><span class=\"title-text\">Kh\u00E1ch h\u00E0ng</span><span class=\"quot-toggle-icon\">\u25BC</span></div>';" + LF +
"  h += '<div class=\"quot-section-content\">';" + LF +
"  h += '<div class=\"quot-form-row\">';" + LF +
"  h += '<div class=\"quot-form-group\"><label>\uD83C\uDFE2 Kh\u00E1ch h\u00E0ng</label><input type=\"text\" id=\"qCustomer\" placeholder=\"T\u00EAn kh\u00E1ch h\u00E0ng...\" oninput=\"updateQuotPreview()\" class=\"quot-input\"></div>';" + LF +
"  h += '<div class=\"quot-form-group\"><label>\uD83D\uDC64 Ng\u01B0\u1EDDi li\u00EAn h\u1EC7</label><input type=\"text\" id=\"qContact\" placeholder=\"Ng\u01B0\u1EDDi li\u00EAn h\u1EC7...\" oninput=\"updateQuotPreview()\" class=\"quot-input\"></div>';" + LF +
"  h += '</div>';" + LF +
"  h += '<div class=\"quot-form-row\">';" + LF +
"  h += '<div class=\"quot-form-group\"><label>\uD83D\uDC64 Ng\u01B0\u1EDDi ph\u1EE5 tr\u00E1ch</label><input type=\"text\" id=\"qAssigned\" placeholder=\"T\u00EAn nh\u00E2n vi\u00EAn...\" oninput=\"updateQuotPreview()\" class=\"quot-input\"></div>';" + LF +
"  h += '<div class=\"quot-form-group\"><label>\uD83D\uDCE7 Email KH</label><input type=\"email\" id=\"qCustEmail\" placeholder=\"Email kh\u00E1ch h\u00E0ng...\" oninput=\"updateQuotPreview()\" class=\"quot-input\"></div>';" + LF +
"  h += '</div>';" + LF +
"  h += '</div>'; // section-content" + LF +
"  h += '</div>'; // section" + LF +
"" + LF +
"  // ====== Delivery Terms ======" + LF +
"  h += '<div class=\"quot-section\">';" + LF +
"  h += '<div class=\"quot-section-title\" onclick=\"toggleQuotSection(this)\"><span class=\"badge green\">\uD83D\uDE9A</span><span class=\"title-text\">Delivery Terms</span><span class=\"quot-toggle-icon\">\u25BC</span></div>';" + LF +
"  h += '<div class=\"quot-section-content\">';" + LF +
"  h += '<div class=\"quot-form-row\">';" + LF +
"  h += '<div class=\"quot-form-group\"><label>EXW/FOB/CIF</label>';" + LF +
"  h += '<select id=\"quotDeliveryMode\" class=\"quot-input\" onchange=\"onQuotDeliveryChange()\"><option value=\"exw\">EXW</option><option value=\"fob\">FOB</option><option value=\"cif\">CIF</option></select></div>';" + LF +
"  h += '<div class=\"quot-form-group\" id=\"quotLccGroup\" style=\"display:none\"><label>LCC</label>';" + LF +
"  h += '<select id=\"quotLccType\" class=\"quot-input\" onchange=\"recalcQuotCart()\"><option value=\"no\">No LCC</option><option value=\"sub\">Sub LCC</option></select></div>';" + LF +
"  h += '<div class=\"quot-form-group\" id=\"quotFreightGroup\" style=\"display:none\"><label>\uD83D\uDE82 C\u01B0\u1EDBc (USD)</label>';" + LF +
"  h += '<input type=\"number\" id=\"quotFreight\" class=\"quot-input\" value=\"0\" min=\"0\" oninput=\"recalcQuotCart()\" style=\"width:100px\"></div></div>';" + LF +
"  h += '<div class=\"quot-form-row\">';" + LF +
"  h += '<div class=\"quot-form-group\"><label>\uD83D\uDCB1 Lo\u1EA1i ti\u1EC1n</label>';" + LF +
"  h += '<select id=\"quotCurrency\" class=\"quot-input\" onchange=\"recalcQuotCart()\"><option value=\"VND\">VND</option><option value=\"USD\">USD</option></select></div>';" + LF +
"  h += '<div class=\"quot-form-group\"><label>\uD83C\uDF0F Th\u1ECB tr\u01B0\u1EDDng</label>';" + LF +
"  h += '<select id=\"quotMarket\" class=\"quot-input\" onchange=\"recalcQuotCart()\"><option value=\"other\">\uD83C\uDF0F Kh\u00E1c</option><option value=\"cn\">\uD83C\uDDE8\uD83C\uDDF3 TQ</option></select></div>';" + LF +
"  h += '<div class=\"quot-form-group\"><label>\uD83D\uDCE6 \u0110VT</label>';" + LF +
"  h += '<select id=\"quotUnit\" class=\"quot-input\" onchange=\"updateQuotPreview()\"><option value=\"T\u1EA5n\">T\u1EA5n</option><option value=\"MT\">MT</option><option value=\"TON\">TON</option></select></div></div>';" + LF +
"  h += '<div class=\"quot-form-row\">';" + LF +
"  h += '<div class=\"quot-form-group\"><label>\u23F1 Hi\u1EC7u l\u1EF1c</label>';" + LF +
"  h += '<select id=\"qValid\" class=\"quot-input\" onchange=\"updateQuotPreview()\"><option value=\"15 ng\u00E0y\">15 ng\u00E0y</option><option value=\"30 ng\u00E0y\">30 ng\u00E0y</option><option value=\"7 ng\u00E0y\">7 ng\u00E0y</option><option value=\"K\u1EC3 t\u1EEB ng\u00E0y k\u00FD\">K\u1EC3 t\u1EEB ng\u00E0y k\u00FD</option></select></div>';" + LF +
"  h += '<div class=\"quot-form-group\"><label>\uD83D\uDCB0 Thanh to\u00E1n</label>';" + LF +
"  h += '<select id=\"qPayment\" class=\"quot-input\" onchange=\"updateQuotPreview()\"><option value=\"T/T 30 days\">T/T 30 days</option><option value=\"T/T 60 days\">T/T 60 days</option><option value=\"L/C at sight\">L/C at sight</option><option value=\"Negotiable\">Negotiable</option></select></div></div>';" + LF +
"  h += '<div class=\"quot-form-row\">';" + LF +
"  h += '<div class=\"quot-form-group\" id=\"quotPortGroup\" style=\"display:none\"><label>\u26F5 C\u1EA3ng \u0111i</label><input type=\"text\" id=\"qPort\" placeholder=\"C\u1EA3ng \u0111i...\" class=\"quot-input\" oninput=\"updateQuotPreview()\"></div>';" + LF +
"  h += '<div class=\"quot-form-group\" id=\"quotDestGroup\" style=\"display:none\"><label>\uD83D\uDEEB C\u1EA3ng \u0111\u1EBFn</label><input type=\"text\" id=\"qDest\" placeholder=\"C\u1EA3ng \u0111\u1EBFn...\" class=\"quot-input\" oninput=\"updateQuotPreview()\"></div>';" + LF +
"  h += '<div class=\"quot-form-group\"><label>\uD83D\uDCEC Giao h\u00E0ng</label><input type=\"text\" id=\"qDelivery\" placeholder=\"\u0110i\u1EC1u ki\u1EC7n giao h\u00E0ng...\" class=\"quot-input\" oninput=\"updateQuotPreview()\"></div>';" + LF +
"  h += '</div>';" + LF +
"  h += '<div class=\"quot-form-group\"><label>\uD83D\uDCDD Ghi ch\u00FA</label><input type=\"text\" id=\"qNote\" placeholder=\"Ghi ch\u00FA...\" class=\"quot-input\" oninput=\"updateQuotPreview()\" style=\"width:100%\"></div>';" + LF +
"  h += '</div>'; // section-content" + LF +
"  h += '</div>'; // section" + LF +
"" + LF +
"  // ====== S\u1EA3n ph\u1EA9m ======" + LF +
"  h += '<div class=\"quot-section\">';" + LF +
"  h += '<div class=\"quot-section-title\" onclick=\"toggleQuotSection(this)\"><span class=\"badge purple\">\uD83D\uDCE6</span><span class=\"title-text\">S\u1EA3n ph\u1EA9m</span><span class=\"quot-toggle-icon\">\u25BC</span>';" + LF +
"  h += '<button class=\"tckt-spec-btn\" onclick=\"quotSpecPickerOpen()\" title=\"Ch\u1ECDn th\u00F4ng s\u1ED1 KT hi\u1EC3n th\u1ECB\">\uD83D\uDEE0\uFE0F Spec</button>';" + LF +
"  h += '<button class=\"quot-add-btn\" onclick=\"quotAddRow()\">+ Th\u00EAm SP</button></div>';" + LF +
"  h += '<div class=\"quot-section-content\">';" + LF +
"  h += '<div id=\"quotCart\"></div>';" + LF +
"  h += '</div>'; // section-content" + LF +
"  h += '</div>'; // section" + LF +
"" + LF +
"  // ====== K\u1EBFt th\u00FAc c\u1ED9t tr\u00E1i ======" + LF +
"  h += '</div>'; // quot-left" + LF +
"" + LF +
"  // ====== C\u1ED9t ph\u1EA3i: Preview b\u00E1o gi\u00E1 ======" + LF +
"  h += '<div class=\"quot-right\">';" + LF +
"  h += '<div class=\"quot-section\">';" + LF +
"  h += '<div class=\"quot-section-title\" onclick=\"toggleQuotSection(this)\"><span class=\"badge blue\">\uD83D\uDCC4</span><span class=\"title-text\">Xem tr\u01B0\u1EDBc b\u00E1o gi\u00E1</span><span class=\"quot-toggle-icon\">\u25BC</span></div>';" + LF +
"  h += '<div class=\"quot-section-content\">';" + LF +
"  h += '<div class=\"quot-actions\">';" + LF +
"  h += '<button class=\"quot-btn quot-btn-primary\" onclick=\"quotPrint()\">\uD83D\uDDA8\uFE0F In</button>';" + LF +
"  h += '<button class=\"quot-btn quot-btn-secondary\" onclick=\"quotCopy()\">\uD83D\uDCCB Copy</button>';" + LF +
"  h += '<button class=\"quot-btn quot-btn-secondary\" onclick=\"quotClear()\">\uD83D\uDDD1\uFE0F X\u00F3a h\u1EBFt</button></div>';" + LF +
"  h += '<div class=\"quot-preview\" id=\"quotPreview\">';" + LF +
"  h += '<div class=\"quot-preview-empty\">\uD83D\uDC48 Ch\u1ECDn s\u1EA3n ph\u1EA9m v\u00E0 \u0111i\u1EC1n th\u00F4ng tin</div>';" + LF +
"  h += '</div>';" + LF +
"  h += '</div>'; // section-content" + LF +
"  h += '</div>'; // section" + LF +
"  h += '</div>'; // quot-right" + LF +
"  h += '</div>'; // quot-grid" + LF +
"  return h;" + LF +
"}";

c = c.substring(0, fnS) + newFunc + c.substring(fnE + 1);
require("fs").writeFileSync("sites/kiem-tra-gia/modules/13-quotation-tab.js", c, "utf-8");

try {
  require("child_process").execSync("node --check sites/kiem-tra-gia/modules/13-quotation-tab.js");
  console.log("OK");
} catch(e) {
  console.log("ERROR");
}
