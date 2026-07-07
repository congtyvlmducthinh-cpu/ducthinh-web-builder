const fs = require('fs');
let c = fs.readFileSync('vi.html', 'utf8');

// Add validation to quotPrint() - customer name
const printFunc = `function quotPrint() {
  var custName = document.getElementById("qCustomer");
  if (!custName || !custName.value.trim()) {
    alert("⚠️ Vui lòng nhập Tên khách hàng trước khi in báo giá!");
    if (custName) { custName.focus(); custName.style.borderColor = "red"; }
    return;
  }
  // Email validation
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
  var hasProd = false;`;

let idx = c.indexOf('function quotPrint()');
let oldPrintStart = c.indexOf('{', idx) + 1;
let oldPrintBodyEnd = c.indexOf('var hasProd = false;') + 'var hasProd = false;'.length;

if (idx >= 0) {
  const bracePos = c.indexOf('{', idx);
  const afterBrace = bracePos + 1;
  const oldBodyStart = c.indexOf('var hasProd = false;', afterBrace);
  const oldBodyEnd = oldBodyStart + 'var hasProd = false;'.length;
  
  if (oldBodyStart > bracePos) {
    c = c.substring(0, oldBodyStart) + printFunc.substring(printFunc.indexOf('var hasProd = false;') + 'var hasProd = false;'.length) + c.substring(oldBodyEnd);
    console.log('Replaced quotPrint body');
  }
}

// Same for quotCopy
const copyFunc = `function quotCopy() {
  var custName = document.getElementById("qCustomer");
  if (!custName || !custName.value.trim()) {
    alert("⚠️ Vui lòng nhập Tên khách hàng trước khi copy báo giá!");
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
  var txt = quotGetText();`;

idx = c.indexOf('function quotCopy()');
if (idx >= 0) {
  const bracePos = c.indexOf('{', idx);
  const afterBrace = bracePos + 1;
  const oldBodyStart = c.indexOf('var txt = quotGetText();', afterBrace);
  
  if (oldBodyStart > bracePos) {
    c = c.substring(0, afterBrace) + copyFunc.substring(copyFunc.indexOf('{') + 1) + c.substring(oldBodyStart);
    console.log('Replaced quotCopy body');
  }
}

// Reset border color when user types in the field
c = c.replace(
  'id="qCustomer" placeholder="Tên khách hàng..." oninput="updateQuotPreview()"',
  'id="qCustomer" placeholder="Tên khách hàng..." oninput="this.style.borderColor=\'\';updateQuotPreview()"'
);
c = c.replace(
  'id="qCustEmail"',
  'id="qCustEmail" oninput="this.style.borderColor=\'\'"'
);

fs.writeFileSync('vi.html', c, 'utf8');
console.log('Done.');
