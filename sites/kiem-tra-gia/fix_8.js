const fs = require('fs');
let c = fs.readFileSync('vi.html', 'utf8');

// Insert validation at start of quotPrint function body
// Find: function quotPrint() {  (then after brace)
let idx = c.indexOf('function quotPrint()');
let bracePos = c.indexOf('{', idx);
let afterBrace = c.substring(bracePos + 1);

// Find first code line after whitespace
let codeStart = afterBrace.search(/\S/);
let firstCode = afterBrace.substring(codeStart);

let validationCode = `
  var custName = document.getElementById("qCustomer");
  if (!custName || !custName.value.trim()) {
    alert("⚠️ Vui lòng nhập Tên khách hàng trước khi in báo giá!");
    if (custName) { custName.focus(); custName.style.borderColor = "red"; }
    return;
  }
  var custEmail = document.getElementById("qCustEmail");
  if (custEmail && custEmail.value.trim()) {
    var emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
    if (!emailRegex.test(custEmail.value.trim())) {
      alert("⚠️ Email người phụ trách không đúng định dạng! Vui lòng kiểm tra lại.");
      custEmail.focus();
      custEmail.style.borderColor = "red";
      return;
    }
  }
`;

c = c.substring(0, bracePos + 1) + validationCode + afterBrace;

// Same for quotGetText (text copy) - check if "Email:" text label exists
// Already replaced by fix_3.js with "Email người phụ trách:"

// Reset border on input for qCustomer - find the current definition
let customerInput = 'id="qCustomer" placeholder="Tên khách hàng..." oninput="updateQuotPreview()"';
let customerInputNew = 'id="qCustomer" placeholder="Tên khách hàng..." oninput="this.style.borderColor=\\\'\\\';updateQuotPreview()"';
c = c.replace(customerInput, customerInputNew);

fs.writeFileSync('vi.html', c, 'utf8');
console.log('Done.');

// Verify
idx = c.indexOf('function quotPrint()');
console.log('quotPrint:', c.substring(idx, idx+650));
