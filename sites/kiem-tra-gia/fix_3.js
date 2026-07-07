const fs = require('fs');
let c = fs.readFileSync('vi.html', 'utf8');

// 1. Fix "Email:" labels in preview/print to "Email người phụ trách:"
c = c.replace(/<strong>Email:<\/strong>/g, '<strong>Email người phụ trách:</strong>');

// 2. Add validation before showing quote preview
// Find the function that generates the preview HTML and add name validation

// In quotPreviewOpen, add validation for customer name
const previewOpenFunc = `function quotPreviewOpen() {
  // === VALIDATION ===
  var custName = document.getElementById("qCustomer");
  if (!custName || !custName.value.trim()) {
    alert("⚠️ Vui lòng nhập Tên khách hàng trước khi xem báo giá!");
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
  }`;

// Check if the function already exists
if (c.indexOf('function quotPreviewOpen()') >= 0) {
  // Find the exact function start
  const oldStart = c.indexOf('function quotPreviewOpen()');
  const oldEnd = c.indexOf('function quotPrint()');
  
  if (oldStart >= 0 && oldEnd > oldStart) {
    const oldFunc = c.substring(oldStart, oldEnd);
    const newFunc = previewOpenFunc;
    c = c.substring(0, oldStart) + newFunc + c.substring(oldEnd);
    console.log('Replaced quotPreviewOpen function');
  }
}

// 3. Fix Print function - change Email: label there too
// Already handled by the global replace above for inline HTML

// Also check text copy format
c = c.replace(/"Email: "/g, '"Email người phụ trách: "');

fs.writeFileSync('vi.html', c, 'utf8');
console.log('All fixes applied.');
console.log('Email người phụ trách count:', (c.match(/Email người phụ trách/g) || []).length);
console.log('Email: count (should be 0):', (c.match(/<strong>Email:<\/strong>/g) || []).length);
