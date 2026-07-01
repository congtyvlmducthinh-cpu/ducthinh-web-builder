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
  console.log('Init OK');
  console.log('currentMarket:', sandboxCtx.currentMarket);

  // Check pricelist buttons after init
  var cn = sandboxCtx.document._elements.marketCn;
  var other = sandboxCtx.document._elements.marketOther;
  console.log('Pricelist marketCn active:', cn.classList._active);
  console.log('Pricelist marketOther active:', other.classList._active);

  // Switch to calc
  sandboxCtx.switchTab('calc');
  console.log('\nAfter switchTab("calc"):');
  console.log('calcMarketCn active:', sandboxCtx.document._elements.calcMarketCn.classList._active);
  console.log('calcMarketOther active:', sandboxCtx.document._elements.calcMarketOther.classList._active);

  // Click TQ
  sandboxCtx.setCalcMarket('cn');
  console.log('\nAfter setCalcMarket("cn"):');
  console.log('calcMarketCn active:', sandboxCtx.document._elements.calcMarketCn.classList._active);
  console.log('calcMarketOther active:', sandboxCtx.document._elements.calcMarketOther.classList._active);

  // Click Other
  sandboxCtx.setCalcMarket('other');
  console.log('\nAfter setCalcMarket("other"):');
  console.log('calcMarketCn active:', sandboxCtx.document._elements.calcMarketCn.classList._active);
  console.log('calcMarketOther active:', sandboxCtx.document._elements.calcMarketOther.classList._active);
} catch(e) {
  console.log('ERROR:', e.name, e.message);
}
