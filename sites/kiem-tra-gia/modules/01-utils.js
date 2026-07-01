// ====== COMPANY CONSTANTS ======
var COMPANY = 'CONG TY TNHH CONG NGH? V?T LI?U M?I D?C TH?NH';
var COMPANY_EN = 'DUC THINH NEW MATERIALS TECHNOLOGY COMPANY LIMITED';
var ADDR = 'DC: KCN NGHIA DAN, XA NGHIA THU, TINH NGHE AN, VIET NAM';
var EMAIL = 'sales@ducthinh.com';
var WEBSITE = 'https://ducthinhmaterials.com';
var PHONE = '+84 382 666 000';
var EXT = '106';
var MST = '2902085037';
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
  var row = DATA_COST_FOB[maxLoad];
  if (!row) return 0;
  return lccVariant === "sub" ? row.sub : row.no;
}
