// ====== UTILITY ======
function formatUsd(v) { var n = Number(v); var dec = Math.round((n - Math.floor(n)) * 10); return Math.floor(n).toLocaleString("vi-VN") + "," + dec; }
function formatCurrency(v, isUsd) {
  if (v === null || v === undefined || isNaN(v)) return "\u2014";
  var s = isUsd ? formatUsd(v) : Math.round(v).toLocaleString();
  return s + " " + (isUsd ? "USD" : "VND");
}

// ====== MAX LOADING ======
function getMaxLoading(code, spec) {
  var key = code;
  if (DATA_MAX_LOADING[key] && DATA_MAX_LOADING[key][spec] !== undefined && DATA_MAX_LOADING[key][spec] !== null) {
    return DATA_MAX_LOADING[key][spec];
  }
  for (var k in DATA_MAX_LOADING) {
    if (k.indexOf(code) === 0 && DATA_MAX_LOADING[k][spec] !== undefined && DATA_MAX_LOADING[k][spec] !== null) {
      return DATA_MAX_LOADING[k][spec];
    }
  }
  for (var k in DATA_MAX_LOADING) {
    if (k.indexOf(code) >= 0 && DATA_MAX_LOADING[k][spec] !== undefined && DATA_MAX_LOADING[k][spec] !== null) {
      return DATA_MAX_LOADING[k][spec];
    }
  }
  return null;
}

// ====== COST FOB ======
function getCostFobVND(maxLoad, lccVariant) {
  if (!maxLoad || maxLoad <= 0) return 0;
  var keys = Object.keys(DATA_COST_FOB).map(Number).sort(function(a, b) { return a - b; });
  var bestKey = keys[0];
  for (var i = 0; i < keys.length; i++) {
    if (keys[i] >= maxLoad) { bestKey = keys[i]; break; }
    bestKey = keys[i];
  }
  var row = DATA_COST_FOB[bestKey];
  if (!row) return 0;
  return lccVariant === "sub" ? row.sub : row.no;
}

// ====== FOB PRICES ======
function getFOB25PriceVND(prod, lccVariant) {
  var ml = getMaxLoading(prod.code, "max25");
  if (!ml || ml <= 0) return prod.exw_vnd;
  var cf = getCostFobVND(ml, lccVariant);
  return Math.round((prod.pkg25_vnd + cf) * 1.05);
}
function getFOBJumboPriceVND(prod, lccVariant) {
  var ml = getMaxLoading(prod.code, "maxJumbo");
  if (!ml || ml <= 0) return prod.exw_vnd;
  var cf = getCostFobVND(ml, lccVariant);
  return Math.round((prod.jumbo_vnd + cf) * 1.05);
}
function getFOB25PriceUSD(prod, lccVariant) { return getFOB25PriceVND(prod, lccVariant) / 26000; }
function getFOBJumboPriceUSD(prod, lccVariant) { return getFOBJumboPriceVND(prod, lccVariant) / 26000; }

// ====== CIF PRICES ======
function getCIF25PriceVND(prod, lccVariant, freight) {
  var ml = getMaxLoading(prod.code, "max25");
  if (!ml || ml <= 0) return prod.exw_vnd;
  var base = getFOB25PriceVND(prod, lccVariant);
  if (!freight || freight <= 0) return base;
  return Math.round(base + (freight + 10 + 10) * 26000 / ml);
}
function getCIFJumboPriceVND(prod, lccVariant, freight) {
  var ml = getMaxLoading(prod.code, "maxJumbo");
  if (!ml || ml <= 0) return prod.exw_vnd;
  var base = getFOBJumboPriceVND(prod, lccVariant);
  if (!freight || freight <= 0) return base;
  return Math.round(base + (freight + 10 + 10) * 26000 / ml);
}
function getCIF25PriceUSD(prod, lccVariant, freight) { return getCIF25PriceVND(prod, lccVariant, freight) / 26000; }
function getCIFJumboPriceUSD(prod, lccVariant, freight) { return getCIFJumboPriceVND(prod, lccVariant, freight) / 26000; }

