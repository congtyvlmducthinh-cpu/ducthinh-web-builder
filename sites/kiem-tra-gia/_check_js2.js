const fs = require('fs');
const h = fs.readFileSync('C:/Users/Admin/.openclaw/workspace-skills/web-builder/sites/kiem-tra-gia/index.html','utf-8');
const m = h.match(/<script>([\s\S]*?)<\/script>/);
if(m){ try{ new Function(m[1]); console.log('✅ JS OK'); } catch(e){ console.log('❌ JS ERR:', e.message); } }
