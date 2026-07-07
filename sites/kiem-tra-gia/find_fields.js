const fs = require('fs');
const vi = fs.readFileSync('vi.html', 'utf8');
const en = fs.readFileSync('en.html', 'utf8');
const zh = fs.readFileSync('zh.html', 'utf8');

// Find form fields in vi
let fields = ['qCustomer','qCustEmail','qContact','qAssigned','qValid','qPayment','qPort','qNote','quotUnit','quotDeliveryMode','quotCurrency'];
for (let f of fields) {
  let vs = vi.indexOf('id="' + f + '"');
  if (vs >= 0) {
    let before = vi.substring(Math.max(0,vs-200), vs);
    console.log('VI ' + f + ':');
    // Find label
    let labelMatch = before.match(/<label[^>]*>([^<]+)</);
    if (labelMatch) console.log('  label:', labelMatch[1]);
    else console.log('  context:', before.substring(before.length-100));
  }
}
