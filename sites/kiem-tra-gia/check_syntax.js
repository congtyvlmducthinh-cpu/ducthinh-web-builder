const fs = require('fs');
['en.html','zh.html'].forEach(f => {
  let c = fs.readFileSync(f, 'utf8');
  let sc = c.match(/<script>([\s\S]*?)<\/script>/g) || [];
  let ok = true;
  for(let i=0;i<sc.length;i++){
    try{ new Function(sc[i].replace(/<script>|<\/script>/g,'')); }
    catch(e){ console.log(f, 'SYNTAX ERROR:', e.message); ok=false; }
  }
  if(ok) console.log(f + ': syntax OK');
});
