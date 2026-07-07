const fs = require('fs');
let c = fs.readFileSync('vi.html', 'utf8');

// Fix quotPrint - the old fix left the validation code inside a bad state
// Let's directly replace the whole function signature + first few lines

const printTarget = `function quotPrint() {
  
  for (var i = 0; i < QUOT_CART.length; i++) { if (QUOT_CART[i].product) { hasProd = true; break; } }`;

const printReplacement = `function quotPrint() {
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
  var hasProd = false;
  for (var i = 0; i < QUOT_CART.length; i++) { if (QUOT_CART[i].product) { hasProd = true; break; } }`;

c = c.replace(printTarget, printReplacement);

// Reset border on input for qCustomer
c = c.replace(
  'id="qCustomer" placeholder="Tên khách hàng..." oninput="updateQuotPreview()"',
  'id="qCustomer" placeholder="Tên khách hàng..." oninput="this.style.borderColor=\\\'\\\';updateQuotPreview()"'
);

// Reset border for qCustEmail
c = c.replace(
  'id="qCustEmail" placeholder="Email khách hàng..." oninput="updateQuotPreview()"',
  'id="qCustEmail" placeholder="Email khách hàng..." oninput="this.style.borderColor=\\\'\\\';updateQuotPreview()"'
);

// Also check if oninput already set differently
if (c.includes('id="qCustEmail" oninput="this.style')) {
  console.log('qCustEmail already has reset');
}

fs.writeFileSync('vi.html', c, 'utf8');
console.log('Done.');

// Verify
let idx = c.indexOf('function quotPrint()');
console.log('--- quotPrint ---');
console.log(c.substring(idx, idx+700));
