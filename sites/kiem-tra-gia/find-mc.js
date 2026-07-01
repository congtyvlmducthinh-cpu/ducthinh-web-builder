import fs from 'fs';
let tpl = fs.readFileSync('src/template.html', 'utf-8');
let idx = tpl.indexOf('mainContainer');
console.log('Content around mainContainer:');
console.log(tpl.substring(Math.max(0, idx-200), Math.min(tpl.length, idx+400)));
