/*
 * Generate template.html for DocCheck
 * Run: node _gen.js
 * This generates template.html with CSS+HTML skeleton
 */
const fs = require("fs");

let h = '<!DOCTYPE html>\n';
h += '<html lang="vi" class="scroll-smooth">\n';
h += '<head>\n';
h += '<meta charset="UTF-8">\n';
h += '<meta name="viewport" content="width=device-width, initial-scale=1.0">\n';
h += '<title>{{header.title}} &#8211; DocCheck</title>\n';
h += '<link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 100 100%27%3E%3Ctext y=%27.9em%27 font-size=%2790%27%3E%F0%9F%A7%BE%3C/text%3E%3C/svg%3E">\n';
h += '<link rel="preconnect" href="https://fonts.googleapis.com">\n';
h += '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n';
h += '<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap" rel="stylesheet">\n';
h += '<script src="https://unpkg.com/lucide@latest"><\/script>\n';
h += '<script src="https://cdn.tailwindcss.com"><\/script>\n';

// Tailwind config
h += '<script>';
h += 'tailwind.config={theme:{extend:{';
h += 'fontFamily:{sans:["Inter","system-ui","sans-serif"],heading:["Plus Jakarta Sans","sans-serif"]},';
h += 'borderRadius:{"2xl":"16px","xl":"12px"},';
h += 'colors:{deep:{DEFAULT:"#020617","900":"#0f172a","800":"#1e293b","700":"#334155"}},';
h += 'boxShadow:{glass:"0 8px 32px rgba(2,6,23,0.5)","glass-sm":"0 4px 16px rgba(2,6,23,0.4)"}';
h += '}}};';
h += '<\/script>\n';

// CSS
h += '<style>';
h += '*{box-sizing:border-box;margin:0;padding:0}';
h += 'body{font-family:Inter,system-ui,sans-serif;background:#020617;background-image:radial-gradient(ellipse at 20% 10%,rgba(59,130,246,0.08)0%,transparent 60%),radial-gradient(ellipse at 80% 90%,rgba(52,211,153,0.06)0%,transparent 60%),radial-gradient(ellipse at 50% 50%,rgba(139,92,246,0.03)0%,transparent 50%);min-height:100vh;color:#e2e8f0}';
h += '.glass-card{background:rgba(15,23,42,0.85);-webkit-backdrop-filter:blur(20px);backdrop-filter:blur(20px);border:1px solid rgba(30,41,59,0.6);box-shadow:0 8px 32px rgba(2,6,23,0.4)}';
h += '.glass-card-light{background:rgba(15,23,42,0.7);-webkit-backdrop-filter:blur(16px);backdrop-filter:blur(16px);border:1px solid rgba(30,41,59,0.5)}';
h += '.glass-card-chat{background:rgba(15,23,42,0.75);-webkit-backdrop-filter:blur(16px);backdrop-filter:blur(16px);border:1px solid rgba(30,41,59,0.5)}';
h += '.glass-input{background:rgba(15,23,42,0.6);-webkit-backdrop-filter:blur(12px);backdrop-filter:blur(12px);border:1px solid rgba(30,41,59,0.5);color:#e2e8f0;transition:all .2s;font-size:14px;font-family:inherit}';
h += '.glass-input:focus{border-color:rgba(59,130,246,0.4);box-shadow:0 0 0 2px rgba(59,130,246,0.12);outline:none}';
h += '.glass-input::placeholder{color:#475569}';
h += '.lang-btn{background:rgba(15,23,42,0.7);border:1px solid rgba(30,41,59,0.6);border-radius:10px;padding:6px 14px;font-size:13px;cursor:pointer;transition:all .3s;color:#94a3b8;font-weight:500;-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);font-family:Inter,sans-serif;display:inline-flex;align-items:center;gap:6px}';
h += '.lang-btn:hover{border-color:rgba(59,130,246,0.4);color:#e2e8f0;background:rgba(30,41,59,0.5)}';
h += '.lang-btn.active{background:linear-gradient(135deg,#2563eb,#059669);color:#fff;border-color:transparent}';
h += '.chat-box{flex:1;display:flex;flex-direction:column;overflow:hidden;min-height:380px}';
h += '.msgs{flex:1;overflow-y:auto;padding:20px;display:flex;flex-direction:column;gap:10px}';
h += '.msg{max-width:88%;padding:12px 18px;border-radius:14px;font-size:14px;line-height:1.6;word-wrap:break-word;white-space:pre-wrap;animation:fadeIn .2s}';
h += '@keyframes fadeIn{from{opacity:0;transform:translateY(4px)}to{opacity:1;transform:translateY(0)}}';
h += '.msg.user{align-self:flex-end;background:linear-gradient(135deg,#1e40af,#065f46);color:#f1f5f9;border-bottom-right-radius:4px;box-shadow:0 2px 12px rgba(30,64,175,0.2)}';
h += '.msg.bot{align-self:flex-start;background:rgba(30,41,59,0.8);-webkit-backdrop-filter:blur(12px);backdrop-filter:blur(12px);border:1px solid rgba(30,41,59,0.6);color:#e2e8f0;border-bottom-left-radius:4px}';
h += '.msg.bot code{background:rgba(0,0,0,0.3);padding:1px 5px;border-radius:3px;font-size:12px;color:#93c5fd}';
h += '.typing{display:inline-flex;gap:5px;align-items:center;padding:4px 0}';
h += '.typing span{width:8px;height:8px;background:#64748b;border-radius:50%;animation:bounce 1.3s infinite}';
h += '.typing span:nth-child(2){animation-delay:.2s}.typing span:nth-child(3){animation-delay:.4s}';
h += '@keyframes bounce{0%{transform:translateY(0)}30%{transform:translateY(-6px)}60%{transform:translateY(0)}100%{transform:translateY(0)}}';
h += '.input-area{display:flex;gap:8px;padding:12px 16px;border-top:1px solid rgba(30,41,59,0.5);align-items:flex-end}';
h += '.input-area textarea{flex:1;border-radius:12px;padding:10px 14px;font-size:14px;resize:none;min-height:44px;max-height:120px;font-family:inherit}';
h += '.btn{border:none;border-radius:12px;padding:10px 20px;font-size:14px;cursor:pointer;font-weight:500;transition:all .2s;display:inline-flex;align-items:center;gap:6px;white-space:nowrap}';
h += '.btn:hover{transform:translateY(-1px)}';
h += '.btn-primary{background:linear-gradient(135deg,#2563eb,#059669);color:#fff}';
h += '.btn-primary:hover{box-shadow:0 4px 20px rgba(37,99,235,0.3)}';
h += '.btn-primary:disabled{opacity:.4;cursor:not-allowed;transform:none;box-shadow:none}';
h += '.status-dot{width:10px;height:10px;border-radius:50%;flex-shrink:0;display:inline-block}';
h += '.status-dot.green{background:#34d399;box-shadow:0 0 8px rgba(52,211,153,0.4)}';
h += '.guide-btn{background:rgba(15,23,42,0.7);-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);border:1px solid rgba(30,41,59,0.5);border-radius:10px;padding:8px 16px;font-size:13px;cursor:pointer;transition:all .2s;color:#94a3b8;font-weight:500;display:inline-flex;align-items:center;gap:6px;font-family:Inter,sans-serif}';
h += '.guide-btn:hover{border-color:rgba(59,130,246,0.3);color:#e2e8f0}';
h += '.guide-panel{max-height:0;overflow:hidden;transition:max-height .35s,opacity .3s;opacity:0;padding:0 20px}';
h += '.guide-panel.open{max-height:1200px;opacity:1;padding:0 20px 16px}';
h += '.guide-table{width:100%;border-collapse:collapse;margin:8px 0;font-size:13px}';
h += '.guide-table td,.guide-table th{padding:8px 10px;border:1px solid rgba(30,41,59,0.5);text-align:left}';
h += '.guide-table th{background:rgba(15,23,42,0.5);font-weight:600;color:#94a3b8}';
h += '.guide-table td:first-child{white-space:nowrap;font-weight:500;color:#60a5fa}';
h += '.welcome-block{padding:28px 20px;text-align:center}';
h += '.welcome-block h2{font-size:18px;margin-bottom:8px;font-family:"Plus Jakarta Sans",sans-serif}';
h += '.welcome-block p{font-size:14px;line-height:1.7;margin-bottom:6px;color:#94a3b8}';
h += '.example-chips{display:flex;flex-wrap:wrap;gap:6px;justify-content:center;margin:14px 0}';
h += '.example-chips span{background:rgba(30,41,59,0.5);color:#94a3b8;padding:6px 14px;border-radius:16px;font-size:12px;cursor:pointer;transition:all .15s;border:1px solid rgba(30,41,59,0.4)}';
h += '.example-chips span:hover{background:rgba(59,130,246,0.15);border-color:rgba(59,130,246,0.3);color:#bfdbfe}';
h += 'footer{text-align:center;font-size:12px;color:#475569;padding:16px 0;border-top:1px solid rgba(30,41,59,0.4);margin-top:4px}';
h += 'footer a{color:#64748b;text-decoration:none}footer a:hover{color:#94a3b8}';
h += '@media(max-width:640px){.app{padding:10px!important;gap:8px!important}header{padding:14px 18px!important}header h1{font-size:16px!important}.input-area{flex-wrap:wrap;padding:10px}.input-area textarea{min-width:100%}.msg{max-width:95%;font-size:13px;padding:10px 14px}.guide-table td,.guide-table th{font-size:12px;padding:5px 6px}.guide-table td:first-child{white-space:normal}}';
h += '</style>\n';

// i18n script (same logic as portal)
h += '<script>\n';
h += '(function(){\n';
h += 'var SK="***",dict={};\n';
h += 'function gl(){return localStorage.getItem(SK)||"vi"}\n';
h += 'function sl(l){if(dict[l]){localStorage.setItem(SK,l);al(l);window.dispatchEvent(new CustomEvent("langchange",{detail:l}))}}\n';
h += 'function t(k,l){var ln=l||gl();return dict[ln]&&dict[ln][k]!==undefined?dict[ln][k]:dict.vi&&dict.vi[k]!==undefined?dict.vi[k]:k}\n';
h += 'window.__=t;window.__lang=gl;\n';
h += 'function al(l){document.documentElement.lang=l==="zh"?"zh-CN":l==="en"?"en":"vi";document.querySelectorAll("[data-i18n]").forEach(function(e){e.textContent=t(e.getAttribute("data-i18n"),l)});document.querySelectorAll("[data-lang-btn]").forEach(function(e){e.classList.toggle("active",e.getAttribute("data-lang-btn")===l)})}\n';
h += 'window.__dict=dict;window.__setLang=sl;window.__i18nReady=true;\n';
h += 'window.__loadI18n=function(pd){Object.assign(dict,pd);al(gl())}})();\n';
h += '<\/script>\n';

h += '</head>\n';
h += '<body>\n';

// App container
h += '<div class="max-w-3xl mx-auto px-4 py-4 sm:py-6 app" style="display:flex;flex-direction:column;gap:10px;min-height:100vh">\n';

// Lang bar
h += '<div class="flex gap-2 justify-end">\n';
h += '<button class="lang-btn active" data-lang-btn="vi" onclick="__setLang(\'vi\')"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10A15.3 15.3 0 0 1 12 2z"/></svg> VI</button>\n';
h += '<button class="lang-btn" data-lang-btn="en" onclick="__setLang(\'en\')"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18"/><path d="M3 14h18"/></svg> EN</button>\n';
h += '<button class="lang-btn" data-lang-btn="zh" onclick="__setLang(\'zh\')"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 12h18"/><path d="M12 3v18"/></svg> CN</button>\n';
h += '</div>\n';

// Header card
h += '<div class="glass-card rounded-[14px] p-5 px-6 flex items-center gap-4">\n';
h += '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="text-blue-400 flex-shrink-0"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>\n';
h += '<div class="flex-1 min-w-0">\n';
h += '<h1 class="font-heading text-lg font-bold text-white" data-i18n="header.title">{{header.title}}</h1>\n';
h += '<p class="text-xs text-slate-400 mt-0.5" data-i18n="header.sub">{{header.sub}}</p>\n';
h += '</div>\n';
h += '</div>\n';

// Status bar
h += '<div class="glass-card-light rounded-[10px] px-4 py-2.5 flex items-center gap-2.5 text-xs">\n';
h += '<span class="status-dot green"></span>\n';
h += '<span class="text-slate-400 font-medium" id="statusText" data-i18n="status.online">{{status.online}}</span>\n';
h += '</div>\n';

// Guide toggle card
h += '<div class="glass-card-light rounded-[12px] overflow-hidden">\n';
h += '<div class="guide-btn" onclick="toggleGuide()" style="width:100%;border:none;border-radius:0">\n';
h += '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-sky-400"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>\n';
h += '<span data-i18n="guide.title">{{guide.title}}</span>\n';
h += '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-auto transition-transform duration-300" id="guideArrow"><polyline points="6 9 12 15 18 9"/></svg>\n';
h += '</div>\n';

h += '<div class="guide-panel" id="guideBody">\n';

// What it does
h += '<h4 class="font-heading text-sm font-semibold text-slate-300 mt-3 mb-1.5" data-i18n="guide.what">{{guide.what}}</h4>\n';
h += '<p class="text-sm text-slate-400 leading-relaxed" data-i18n="guide.what.desc">{{guide.what.desc}}</p>\n';

// Table
h += '<h4 class="font-heading text-sm font-semibold text-slate-300 mt-4 mb-2" data-i18n="guide.types">{{guide.types}}</h4>\n';
h += '<table class="guide-table">\n';
h += '<tr><th data-i18n="guide.type">{{guide.type}}</th><th data-i18n="guide.content">{{guide.content}}</th></tr>\n';
h += '<tr><td data-i18n="guide.inv">{{guide.inv}}</td><td data-i18n="guide.inv.desc">{{guide.inv.desc}}</td></tr>\n';
h += '<tr><td data-i18n="guide.pl">{{guide.pl}}</td><td data-i18n="guide.pl.desc">{{guide.pl.desc}}</td></tr>\n';
h += '<tr><td data-i18n="guide.bl">{{guide.bl}}</td><td data-i18n="guide.bl.desc">{{guide.bl.desc}}</td></tr>\n';
h += '<tr><td data-i18n="guide.co">{{guide.co}}</td><td data-i18n="guide.co.desc">{{guide.co.desc}}</td></tr>\n';
h += '<tr><td data-i18n="guide.contract">{{guide.contract}}</td><td data-i18n="guide.contract.desc">{{guide.contract.desc}}</td></tr>\n';
h += '<tr><td data-i18n="guide.quote">{{guide.quote}}</td><td data-i18n="guide.quote.desc">{{guide.quote.desc}}</td></tr>\n';
h += '</table>\n';

// Google Drive section
h += '<h4 class="font-heading text-sm font-semibold text-slate-300 mt-4 mb-1.5" data-i18n="guide.gdrive">{{guide.gdrive}}</h4>\n';
h += '<ul class="text-sm text-slate-400 space-y-1 pl-4 list-disc">\n';
h += '<li data-i18n="guide.gdrive.1">{{guide.gdrive.1}}</li>\n';
h += '<li data-i18n="guide.gdrive.2">{{guide.gdrive.2}}</li>\n';
h += '<li data-i18n="guide.gdrive.3">{{guide.gdrive.3}}</li>\n';
h += '<li data-i18n="guide.gdrive.4">{{guide.gdrive.4}}</li>\n';
h += '<li data-i18n="guide.gdrive.5">{{guide.gdrive.5}}</li>\n';
h += '<li class="text-amber-400/70 font-medium" data-i18n="guide.gdrive.note">{{guide.gdrive.note}}</li>\n';
h += '</ul>\n';

// How to use
h += '<h4 class="font-heading text-sm font-semibold text-slate-300 mt-4 mb-1.5" data-i18n="guide.howto">{{guide.howto}}</h4>\n';
h += '<ul class="text-sm text-slate-400 space-y-1 pl-4 list-disc">\n';
h += '<li data-i18n="guide.howto.1">{{guide.howto.1}}</li>\n';
h += '<li data-i18n="guide.howto.2">{{guide.howto.2}}</li>\n';
h += '<li data-i18n="guide.howto.3">{{guide.howto.3}}</li>\n';
h += '<li data-i18n="guide.howto.4">{{guide.howto.4}}</li>\n';
h += '</ul>\n';

h += '</div>\n'; // guide-body
h += '</div>\n'; // guide card

// Chat box
h += '<div class="glass-card-chat rounded-[14px] flex flex-col flex-1 overflow-hidden" style="min-height:400px">\n';

// Messages
h += '<div class="msgs" id="msgContainer">\n';

// Welcome block
h += '<div class="welcome-block" id="welcomeBlock">\n';
h += '<h2 class="font-heading" data-i18n="welcome.title">{{welcome.title}}</h2>\n';
h += '<p data-i18n="welcome.desc">{{welcome.desc}}</p>\n';
h += '<p style="color:#64748b;font-size:13px" data-i18n="welcome.tip">{{welcome.tip}}</p>\n';
h += '<div class="example-chips">\n';

// Example templates from original with Google Drive link
h += '<span onclick="exampleClick(\'{{sample.gdrive}}\nhttps://drive.google.com/file/d/1abcXYZexample123/view?usp=sharing\')"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle;margin-right:2px"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/></svg> {{sample.gdrive2}}</span>\n';

h += '<span onclick="exampleClick(\'{{sample.inv}}\nS\u1ed1: INV-2026-001\nNg\u00e0y: 15/06/2026\nNg\u01b0\u1eddi b\u00e1n: DUC THINH NEW MATERIAL TECHNOLOGY CO., LTD\nNg\u01b0\u1eddi mua: NEW POWERFUL INTERNATIONAL LIMITED\nH\u00e0ng h\u00f3a: Ground Calcium Carbonate\nS\u1ed1 l\u01b0\u1ee3ng: 135 MT\n\u0110\u01a1n gi\u00e1: 85 USD/MT\nT\u1ed5ng: 11,475 USD\n\u0110i\u1ec1u kho\u1ea3n TT: T/T 30 days\nIncoterm: FOB Hai Phong\')"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle;margin-right:2px"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg> {{sample.inv2}}</span>\n';

h += '<span onclick="exampleClick(\'{{sample.bl}}\nS\u1ed1 BL: DB-aabbcc\nT\u00ean t\u00e0u: MSC ARIANA\nC\u1ea3ng x\u1ebfp: HAI PHONG PORT, VIETNAM\nC\u1ea3ng d\u1ee1: SURABAYA, INDONESIA\nShipper: DUC THINH NEW MATERIAL TECHNOLOGY CO., LTD\nConsignee: NEW POWERFUL INTERNATIONAL LIMITED\n5 containers\nFreight prepaid\')"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle;margin-right:2px"><path d="M22 17H2a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3Z"/><path d="M6 10V2h12v8"/><path d="M2 10h20v5H2Z"/></svg> {{sample.bl2}}</span>\n';

h += '<span onclick="exampleClick(\'{{sample.compare}}\n---\nInvoice A:\nS\u1ed1: INV-001\nS\u1ed1 l\u01b0\u1ee3ng: 100 MT\n\u0110\u01a1n gi\u00e1: 85 USD/MT\n---\nInvoice B:\nS\u1ed1: INV-002\nS\u1ed1 l\u01b0\u1ee3ng: 100 MT\n\u0110\u01a1n gi\u00e1: 82 USD/MT\')"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle;margin-right:2px"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg> {{sample.compare2}}</span>\n';

h += '</div>\n';
h += '</div>\n'; // welcome block

h += '</div>\n'; // msgs

// Input area
h += '<div class="input-area">\n';
h += '<textarea class="glass-input" id="msgInput" placeholder="{{input.placeholder}}" rows="2" oninput="autoResize(this)"></textarea>\n';
h += '<button class="btn btn-primary" id="sendBtn" onclick="sendMsg()"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" x2="11" y1="2" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg> <span data-i18n="input.send">{{input.send}}</span></button>\n';
h += '</div>\n'; // input-area

h += '</div>\n'; // chat-box

// Footer
h += '<footer><span data-i18n="footer.text">{{footer.text}}</span></footer>\n';
h += '</div>\n'; // app container

// Lucide init
h += '<script>document.addEventListener(\'DOMContentLoaded\',function(){if(window.lucide)lucide.createIcons()});<\/script>\n';

// Portal I18N placeholder
h += '<script>const DOCCHECK_I18N={{I18N_DICT}};__loadI18n(DOCCHECK_I18N);<\/script>\n';

h += '</body>\n';
h += '</html>\n';

fs.writeFileSync('template.html', h, 'utf-8');
console.log('Template written: ' + fs.statSync('template.html').size + ' bytes');
