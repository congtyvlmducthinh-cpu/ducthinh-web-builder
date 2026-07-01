var vm = require('vm');
var fs = require('fs');
var html = fs.readFileSync('vi.html', 'utf-8');
var m = html.match(/<script>([\s\S]*?)<\/script>/)[1];

var fakeDoc = {
  _elements: {},
  getElementById: function(id) { return this._elements[id] || null; },
  querySelectorAll: function(sel) { return []; },
  querySelector: function(sel) { return null; },
  createElement: function(tag) { return {}; },
};

['mainContainer','controlBar','priceModeBar','searchInput','specFilter','machineFilter','sizeFilter','dataInfo',
 'calcMachine','calcStandard','calcSize','calcProduct','calcBagSpec','calcBag','calcTonnage','calcOther',
 'calcOtherTonnage','calcMaxLoad','calcResult','calcPriceModeBar','calcMaxLoadRow','calcLccGroup',
 'calcFreightGroup','calcFreightInput','calcCcyVnd','calcCcyUsd','calcMarketCn','calcMarketOther',
 'marketCn','marketOther'
].forEach(function(id) {
  fakeDoc._elements[id] = { value: '', innerHTML: '', style: {}, textContent: '',
    classList: { toggle: function(cls, force) {
      if (force !== undefined) { this._active = force; }
      else { this._active = !this._active; }
    }, _active: false },
    querySelectorAll: function(){return [];},
    querySelector: function(){return null;}
  };
});

var sandboxCtx = {
  console: { log: function(){} },
  document: fakeDoc,
  window: {}, navigator: {}, location: { pathname: '/vi.html' },
  setTimeout: function(fn){ try{fn();}catch(e){} },
  setInterval: function(fn){}, clearInterval: function(){}, clearTimeout: function(){},
  alert: function(msg){},
  XMLHttpRequest: function(){},
  localStorage: { getItem: function(){return null;}, setItem: function(){} },
};

vm.createContext(sandboxCtx);
try {
  vm.runInContext(m, sandboxCtx, { timeout: 10000 });
  console.log('Init OK, currentMarket:', sandboxCtx.currentMarket);
  console.log('pricelist marketCn active:', sandboxCtx.document._elements.marketCn.classList._active);
  console.log('pricelist marketOther active:', sandboxCtx.document._elements.marketOther.classList._active);
  
  // Test setMarket click
  sandboxCtx.setMarket('cn');
  console.log('\nAfter setMarket("cn"):');
  console.log('currentMarket:', sandboxCtx.currentMarket);
  console.log('marketCn active:', sandboxCtx.document._elements.marketCn.classList._active);
  console.log('marketOther active:', sandboxCtx.document._elements.marketOther.classList._active);
  
  // Test setCalcMarket
  sandboxCtx.setCalcMarket('cn');
  console.log('\nAfter setCalcMarket("cn"):');
  console.log('currentMarket:', sandboxCtx.currentMarket);
  
  sandboxCtx.setCalcMarket('other');
  console.log('\nAfter setCalcMarket("other"):');
  console.log('currentMarket:', sandboxCtx.currentMarket);
  
  console.log('\n✅ All OK');
} catch(e) {
  console.log('ERROR:', e.name, e.message);
}
