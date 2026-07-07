const fs = require('fs');
let c = fs.readFileSync('vi.html', 'utf8');

// Fix quotPrint directly with regex
const printRegex = /function quotPrint\(\)\s*\{[\s\S]*?var hasProd\s*=\s*false;/;

const newPrintFunc = `function quotPrint() {
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
  var hasProd = false;`;

c = c.replace(printRegex, newPrintFunc);

// Also fix quotCopy
const copyRegex = /function quotCopy\(\)\s*\{[\s\S]*?var txt\s*=\s*quotGetText\(\);/;

const newCopyFunc = `function quotCopy() {
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

c = c.replace(copyRegex, newCopyFunc);

fs.writeFileSync('vi.html', c, 'utf8');
console.log('Done.');

// Verify
let idx = c.indexOf('function quotPrint()');
console.log('quotPrint:', c.substring(idx, idx+350));
idx = c.indexOf('function quotCopy()');
console.log('quotCopy:', c.substring(idx, idx+350));
