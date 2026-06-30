const fs = require('fs');
const tpl = fs.readFileSync('src/template.html', 'utf-8');

// Check the pricelist tab content
const tabIdx = tpl.indexOf('id="tab-pricelist"');
if (tabIdx < 0) {
  const tab2 = tpl.indexOf('pricelist');
  console.log('pricelist at', tab2, '->');
  console.log(tpl.substring(tab2, tab2+300));
} else {
  console.log('tab-pricelist at', tabIdx);
  console.log(tpl.substring(tabIdx, tabIdx+400));
}
