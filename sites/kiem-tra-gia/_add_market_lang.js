const fs = require('fs');

// Add MARKET keys to all 3 lang files
const langs = ['vi', 'en', 'zh'];
const data = {
  vi: { MARKET_LABEL: '🌏 Thị trường:', MARKET_CN: '🇨🇳 TQ', MARKET_OTHER: '🌏 Khác' },
  en: { MARKET_LABEL: '🌏 Market:', MARKET_CN: '🇨🇳 China', MARKET_OTHER: '🌏 Others' },
  zh: { MARKET_LABEL: '🌏 市场:', MARKET_CN: '🇨🇳 中国', MARKET_OTHER: '🌏 其他' }
};

langs.forEach(lang => {
  let content = fs.readFileSync(`src/lang/${lang}.js`, 'utf-8');
  // Add before the closing }
  const insertPoint = content.lastIndexOf('}');
  const newKeys = `\n  ${lang === 'vi' ? data.vi : data[lang].MARKET_LABEL ? '' : ''}`;
  
  // Build the 3 keys
  const keys = data[lang];
  const keysStr = `\n  // Market\n  MARKET_LABEL: "${keys.MARKET_LABEL}",\n  MARKET_CN: "${keys.MARKET_CN}",\n  MARKET_OTHER: "${keys.MARKET_OTHER}",\n`;
  
  content = content.substring(0, insertPoint) + keysStr + '\n' + content.substring(insertPoint);
  fs.writeFileSync(`src/lang/${lang}.js`, content, 'utf-8');
  console.log(`Updated ${lang}.js`);
});
