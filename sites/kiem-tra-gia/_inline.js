const fs = require('fs');
const base = 'C:\\Users\\Admin\\.openclaw\\workspace-skills\\web-builder\\sites\\kiem-tra-gia\\';

const specData = fs.readFileSync(base + 'modules/12-spec-data.js', 'utf8');
const quotTab = fs.readFileSync(base + 'modules/13-quotation-tab.js', 'utf8');

const files = ['vi.html', 'en.html', 'zh.html'];

for (const file of files) {
  let c = fs.readFileSync(base + file, 'utf8');
  
  // Remove existing comments
  c = c.replace('// 12-spec-data.js\n', '');
  c = c.replace('// 13-quotation-tab.js\n', '');
  
  // Insert spec data and quotation tab before </script>
  const insertPoint = '// Init — dữ liệu đã có sẵn trong data.js';
  const insertContent = '\n// ====== SPEC DATA ======\n' + specData + '\n// ====== QUOTATION TAB ======\n' + quotTab + '\n';
  
  c = c.replace(insertPoint, insertContent + insertPoint);
  
  // For en.html and zh.html, check the Init comment naming
  // Actually just insert before the last </script>
  // Let's use </script> approach
  if (c.indexOf(insertPoint) === -1) {
    // Fallback: insert before </script>
    c = c.replace('</script>', insertContent + '</script>');
    console.log(file + ': used </script> fallback');
  } else {
    console.log(file + ': used Init comment');
  }
  
  fs.writeFileSync(base + file, c, 'utf8');
  console.log(file + ': done (' + c.length + ' bytes)');
}
