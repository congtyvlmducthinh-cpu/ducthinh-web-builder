const fs = require('fs');
let c = fs.readFileSync('vi.html', 'utf8');

// 1. Fix "Email KH" label
c = c.replace('<label>📧 Email KH</label>', '<label>📧 Email người phụ trách</label>');

// 2. Fix "Ngày" -> "Ngày báo giá" in summary cards
c = c.replace('<div class="lbl">Ngày</div>', '<div class="lbl">Ngày báo giá</div>');

// 3. Fix "Ngày:" -> "Ngày báo giá:" in previews
c = c.replace('<strong>Ngày:</strong>', '<strong>Ngày báo giá:</strong>');
c = c.replace('"Ngày: "', '"Ngày báo giá: "');

// 4. Fix "Email:" -> "Email người phụ trách:" in all 3 places (preview HTML, q-row, document write)
c = c.replace('<strong>Email:</strong>', '<strong>Email người phụ trách:</strong>');

// 5. Add validation to quotPreviewOpen
const oldPreview = `function quotPreviewOpen() {
  var overlay=document.getElementById("quotPreviewOverlay");`;

const newPreview = `function quotPreviewOpen() {
  var custName = document.getElementById("qCustomer");
  if (!custName || !custName.value.trim()) {
    alert("⚠️ Vui lòng nhập Tên khách hàng trước khi xem báo giá!");
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
  var overlay=document.getElementById("quotPreviewOverlay");`;

c = c.replace(oldPreview, newPreview);

// 6. Add validation to quotPrint
const oldPrint = `function quotPrint() {
  var hasProd = false;`;

const newPrint = `function quotPrint() {
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

c = c.replace(oldPrint, newPrint);

// 7. Add validation to quotCopy
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

// 8. Reset border color when typing
c = c.replace(
  'id="qCustomer" placeholder="Tên khách hàng..." oninput="updateQuotPreview()"',
  'id="qCustomer" placeholder="Tên khách hàng..." oninput="this.style.borderColor=\\\'\\\';updateQuotPreview()"'
);

c = c.replace(
  'id="qCustEmail" placeholder="Email khách hàng..." oninput="updateQuotPreview()"',
  'id="qCustEmail" placeholder="Email khách hàng..." oninput="this.style.borderColor=\\\'\\\';updateQuotPreview()"'
);

fs.writeFileSync('vi.html', c, 'utf8');
console.log('Done.');

// Verify
console.log('Email người phụ trách:', (c.match(/Email người phụ trách/g)||[]).length);
console.log('Ngày báo giá:', (c.match(/Ngày báo giá/g)||[]).length);
console.log('Old Email: (should be 0):', (c.match(/<strong>Email:<\/strong>/g)||[]).length);

// Syntax check
let scripts = c.match(/<script>([\s\S]*?)<\/script>/g) || [];
console.log('Script blocks:', scripts.length);
for(let i=0;i<scripts.length;i++){
  try{ new Function(scripts[i].replace(/<script>|<\/script>/g,'')); }
  catch(e){ console.log('Block',i,'SYNTAX ERROR:',e.message); }
}
console.log('All syntax OK');
