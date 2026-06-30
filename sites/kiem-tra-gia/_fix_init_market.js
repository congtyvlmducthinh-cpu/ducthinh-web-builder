const fs = require('fs');

const langs = ['vi', 'en', 'zh'];

// Read current init code from one of the lang files to understand format
// The init section at bottom of lang files currently just calls applyMarket and switchTab
// We need to also call setMarket('cn') to make buttons active

langs.forEach(lang => {
  let content = fs.readFileSync(`src/lang/${lang}.js`, 'utf-8');
  
  // Replace the init section - add setMarket call
  // Current init: applyMarket(); switchTab("pricelist");
  if (content.indexOf('setMarket') < 0) {
    content = content.replace(
      /applyMarket\(\); switchTab\("pricelist"\);/,
      'applyMarket(); setMarket("cn"); switchTab("pricelist");'
    );
    fs.writeFileSync(`src/lang/${lang}.js`, content, 'utf-8');
    console.log(`Updated init in ${lang}.js`);
  } else {
    console.log(`${lang}.js already has setMarket call`);
  }
});
