var fs=require('fs');
var h=fs.readFileSync('C:\\Users\\Admin\\.openclaw\\workspace-skills\\web-builder\\sites\\kiem-tra-gia\\vi.html','utf8').replace(/\r\n/g,'\n');

// 1. Find manageLogin function
var idx=h.indexOf('function manageLogin');
if(idx>=0) console.log('=== manageLogin at byte', idx, '===\n'+h.substring(idx, idx+2000));

// 2. Find downloadTemplate function  
var idx2=h.indexOf('function downloadTemplate');
if(idx2>=0) console.log('\n=== downloadTemplate at byte', idx2, '===\n'+h.substring(idx2, idx2+1500));

// 3. Find handleManageFile function
var idx3=h.indexOf('function handleManageFile');
if(idx3>=0) console.log('\n=== handleManageFile at byte', idx3, '===\n'+h.substring(idx3, idx3+2500));

// 4. Find server upload handling
var idx4=h.indexOf('/api/manage');
if(idx4>=0) console.log('\n=== /api/manage at byte', idx4, '===\n'+h.substring(idx4-200, idx4+500));

// 5. Find manage panel HTML (static)
var static=h.replace(/<script[^>]*>[\s\S]*?<\/script>/gi,'');
var manageIdx=static.indexOf('manage-panel');
if(manageIdx>=0) console.log('\n=== Manage Panel HTML at static byte', manageIdx, '===\n'+static.substring(manageIdx, manageIdx+2000));
