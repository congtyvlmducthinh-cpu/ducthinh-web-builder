import fs from 'fs';
let langs = ['vi','en','zh'];
langs.forEach(function(lang) {
  let js = fs.readFileSync('src/' + lang + '.js', 'utf-8');
  js = js.replace('setMarket("cn")', 'setMarket("other")');
  fs.writeFileSync('src/' + lang + '.js', js, 'utf-8');
  console.log('Fixed src/' + lang + '.js');
});
