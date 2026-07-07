const fs = require('fs');
let c = fs.readFileSync('vi.html', 'utf8');

// Fix quotPrint - add validation before original function body
const oldPrint = `function quotPrint() {
  var hasProd = false;`;
const newPrint = `function quotPrint() {
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

c = c.replace(oldPrint, newPrint);

// Fix quotCopy - add validation before original function body
const oldCopy = `function quotCopy() {
  var txt = quotGetText();`;
const newCopy = `function quotCopy() {
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

c = c.replace(oldCopy, newCopy);

// Reset border color on input
c = c.replace(
  'id="qCustomer" placeholder="Tên khách hàng..." oninput="updateQuotPreview()"',
  'id="qCustomer" placeholder="Tên khách hàng..." oninput="this.style.borderColor=\'\';updateQuotPreview()"'
);

// Already has oninput for qCustEmail, but let's check
if (!c.includes('qCustEmail" oninput')) {
  c = c.replace(
    'id="qCustEmail" placeholder="Email khách hàng..."',
    'id="qCustEmail" oninput="this.style.borderColor=\'\'" placeholder="Email khách hàng..."'
  );
}

fs.writeFileSync('vi.html', c, 'utf8');
console.log('Done.');

// Verify
console.log('quotPrint check:', c.includes('function quotPrint() {\n  var custName'));
console.log('quotCopy check:', c.includes('function quotCopy() {\n  var custName'));
console.log('hasProd check:', c.indexOf('var hasProd = false;') > 0);
