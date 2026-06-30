var DATA_PRODUCTS = [];
var DATA_LOADED = false;

function loadProductsData() {
  return fetch('data/products.json')
    .then(function(r) { return r.json(); })
    .then(function(data) {
      DATA_PRODUCTS = data;
      DATA_LOADED = true;
      return data;
    })
    .catch(function(err) {
      console.error('Failed to load products.json:', err);
      DATA_LOADED = false;
      return [];
    });
}

function importProducts(arr) {
  DATA_PRODUCTS = [];
  arr.forEach(function(r) {
    var obj = {};
    obj.code = r.code || r.Code || r["Mã SP"] || r["Ma SP"] || r["Mã sản phẩm"] || r["Mã"] || "";
    if (!obj.code) return;
    obj.size = r.size || r.Size || r["Cỡ hạt"] || r["Co hat"] || r["Size"] || "";
    obj.standard = r.standard || r.Standard || r["Tiêu chuẩn"] || r["Tieu chuan"] || r["Standard"] || "";
    obj.machine = r.machine || r.Machine || r["Máy chạy"] || r["May chay"] || r["Máy"] || r["May"] || "";
    var vndFields = {
      exw_vnd: ["EXW (VND)","EXW(VND)","exw_vnd","EXW_VND","exw vnd","EXW VND","Exw(VND)"],
      exw_usd: ["EXW (USD)","EXW(USD)","exw_usd","EXW_USD","exw usd","EXW USD","Exw(USD)"],
      comm_vnd: ["Hoa hồng (VND)","Hoa hong (VND)","Hoa hồng(VND)","comm_vnd","comm vnd"],
      comm_usd: ["Hoa hồng (USD)","Hoa hong (USD)","Hoa hồng(USD)","comm_usd","comm usd"],
      pkg25_vnd: ["25kg (VND)","25kg(VND)","25KG (VND)","25KG(VND)","pkg25_vnd","25kg_vnd"],
      pkg25_usd: ["25kg (USD)","25kg(USD)","25KG (USD)","25KG(USD)","pkg25_usd","25kg_usd"],
      jumbo_vnd: ["Jumbo (VND)","Jumbo(VND)","jumbo_vnd","jumbo vnd"],
      jumbo_usd: ["Jumbo (USD)","Jumbo(USD)","jumbo_usd","jumbo usd"]
    };
    Object.keys(vndFields).forEach(function(k) {
      var names = vndFields[k];
      for (var i = 0; i < names.length; i++) {
        if (r[names[i]] !== undefined && r[names[i]] !== null && r[names[i]] !== "") {
          obj[k] = Number(r[names[i]]);
          break;
        }
      }
    });
    // Read market-specific overrides (cn/other) if present in template
    var marketSuffixes = ["_cn","_other"];
    function readMarketField(r, obj, key, suffix) {
      // Try suffixed user-friendly names first, then raw key+suffix
      var baseNames = ["EXW (VND)","EXW (USD)","Hoa hồng (VND)","Hoa hồng (USD)","25kg (VND)","25kg (USD)","Jumbo (VND)","Jumbo (USD)"];
      for (var si = 0; si < baseNames.length; si++) {
        var fullName = baseNames[si] + suffix;
        if (r[fullName] !== undefined && r[fullName] !== null && r[fullName] !== "") {
          obj[key + suffix] = Number(r[fullName]);
          return true;
        }
      }
      if (r[key + suffix] !== undefined && r[key + suffix] !== null && r[key + suffix] !== "") {
        obj[key + suffix] = Number(r[key + suffix]);
        return true;
      }
      return false;
    }
    marketSuffixes.forEach(function(sfx) {
      readMarketField(r, obj, "exw_vnd", sfx);
      readMarketField(r, obj, "exw_usd", sfx);
      readMarketField(r, obj, "comm_vnd", sfx);
      readMarketField(r, obj, "comm_usd", sfx);
      readMarketField(r, obj, "pkg25_vnd", sfx);
      readMarketField(r, obj, "pkg25_usd", sfx);
      readMarketField(r, obj, "jumbo_vnd", sfx);
      readMarketField(r, obj, "jumbo_usd", sfx);
    });
    // Copy extra fields
    if (r.d50 !== undefined) obj.d50 = Number(r.d50);
    if (r.d97 !== undefined) obj.d97 = Number(r.d97);
    if (r.whiteness !== undefined) obj.whiteness = Number(r.whiteness);
    if (r.brightness !== undefined) obj.brightness = Number(r.brightness);
    // Read max loading from product row if available
    var max25 = r.max25 || r["Max Loading 25KG"] || r["Max Loading 25kg"] || r["Max25"] || r["Max 25KG"];
    var maxJb = r.maxJumbo || r["Max Loading Jumbo"] || r["Max Loading jumbo"] || r["MaxJumbo"] || r["Max Jumbo"];
    if (max25 !== undefined && max25 !== null && max25 !== "") {
      obj.max25 = Number(max25);
      DATA_MAX_LOADING[obj.code] = DATA_MAX_LOADING[obj.code] || {};
      DATA_MAX_LOADING[obj.code].max25 = Number(max25);
    }
    if (maxJb !== undefined && maxJb !== null && maxJb !== "") {
      obj.maxJumbo = Number(maxJb);
      DATA_MAX_LOADING[obj.code] = DATA_MAX_LOADING[obj.code] || {};
      DATA_MAX_LOADING[obj.code].maxJumbo = Number(maxJb);
    }
  
    // CN là base mặc định: ghi đè obj.exw_vnd bằng exw_vnd_cn
    obj.exw_vnd = obj.exw_vnd_cn !== undefined ? obj.exw_vnd_cn : obj.exw_vnd;
    obj.exw_usd = obj.exw_usd_cn !== undefined ? obj.exw_usd_cn : obj.exw_usd;
    obj.comm_vnd = obj.comm_vnd_cn !== undefined ? obj.comm_vnd_cn : obj.comm_vnd;
    obj.comm_usd = obj.comm_usd_cn !== undefined ? obj.comm_usd_cn : obj.comm_usd;
    obj.pkg25_vnd = obj.pkg25_vnd_cn !== undefined ? obj.pkg25_vnd_cn : obj.pkg25_vnd;
    obj.pkg25_usd = obj.pkg25_usd_cn !== undefined ? obj.pkg25_usd_cn : obj.pkg25_usd;
    obj.jumbo_vnd = obj.jumbo_vnd_cn !== undefined ? obj.jumbo_vnd_cn : obj.jumbo_vnd;
    obj.jumbo_usd = obj.jumbo_usd_cn !== undefined ? obj.jumbo_usd_cn : obj.jumbo_usd;
    // Fallback CN: nếu vẫn undefined, copy từ base cũ (backward compat với file cũ)
    if (obj.exw_vnd_cn === undefined) obj.exw_vnd_cn = obj.exw_vnd !== undefined ? obj.exw_vnd : 0;
    if (obj.exw_usd_cn === undefined) obj.exw_usd_cn = obj.exw_usd !== undefined ? obj.exw_usd : 0;
    if (obj.comm_vnd_cn === undefined) obj.comm_vnd_cn = obj.comm_vnd !== undefined ? obj.comm_vnd : 0;
    if (obj.comm_usd_cn === undefined) obj.comm_usd_cn = obj.comm_usd !== undefined ? obj.comm_usd : 0;
    if (obj.pkg25_vnd_cn === undefined) obj.pkg25_vnd_cn = obj.pkg25_vnd !== undefined ? obj.pkg25_vnd : 0;
    if (obj.pkg25_usd_cn === undefined) obj.pkg25_usd_cn = obj.pkg25_usd !== undefined ? obj.pkg25_usd : 0;
    if (obj.jumbo_vnd_cn === undefined) obj.jumbo_vnd_cn = obj.jumbo_vnd !== undefined ? obj.jumbo_vnd : 0;
    if (obj.jumbo_usd_cn === undefined) obj.jumbo_usd_cn = obj.jumbo_usd !== undefined ? obj.jumbo_usd : 0;
    // Fallback Other: copy từ CN
    if (obj.exw_vnd_other === undefined) obj.exw_vnd_other = obj.exw_vnd_cn !== undefined ? obj.exw_vnd_cn : 0;
    if (obj.exw_usd_other === undefined) obj.exw_usd_other = obj.exw_usd_cn !== undefined ? obj.exw_usd_cn : 0;
    if (obj.comm_vnd_other === undefined) obj.comm_vnd_other = obj.comm_vnd_cn !== undefined ? obj.comm_vnd_cn : 0;
    if (obj.comm_usd_other === undefined) obj.comm_usd_other = obj.comm_usd_cn !== undefined ? obj.comm_usd_cn : 0;
    if (obj.pkg25_vnd_other === undefined) obj.pkg25_vnd_other = obj.pkg25_vnd_cn !== undefined ? obj.pkg25_vnd_cn : 0;
    if (obj.pkg25_usd_other === undefined) obj.pkg25_usd_other = obj.pkg25_usd_cn !== undefined ? obj.pkg25_usd_cn : 0;
    if (obj.jumbo_vnd_other === undefined) obj.jumbo_vnd_other = obj.jumbo_vnd_cn !== undefined ? obj.jumbo_vnd_cn : 0;
    if (obj.jumbo_usd_other === undefined) obj.jumbo_usd_other = obj.jumbo_usd_cn !== undefined ? obj.jumbo_usd_cn : 0;DATA_PRODUCTS.push(obj);
  });



// Market switching
var currentMarket = "cn";

function applyMarket() {
  var suffix = "_" + currentMarket;
  DATA_PRODUCTS.forEach(function(p) {
    // Use suffix field if available, fall back to base field
    p.exw_vnd = p["exw_vnd" + suffix] !== undefined ? p["exw_vnd" + suffix] : p.exw_vnd;
    p.exw_usd = p["exw_usd" + suffix] !== undefined ? p["exw_usd" + suffix] : p.exw_usd;
    p.comm_vnd = p["comm_vnd" + suffix] !== undefined ? p["comm_vnd" + suffix] : p.comm_vnd;
    p.comm_usd = p["comm_usd" + suffix] !== undefined ? p["comm_usd" + suffix] : p.comm_usd;
    p.pkg25_vnd = p["pkg25_vnd" + suffix] !== undefined ? p["pkg25_vnd" + suffix] : p.pkg25_vnd;
    p.pkg25_usd = p["pkg25_usd" + suffix] !== undefined ? p["pkg25_usd" + suffix] : p.pkg25_usd;
    p.jumbo_vnd = p["jumbo_vnd" + suffix] !== undefined ? p["jumbo_vnd" + suffix] : p.jumbo_vnd;
    p.jumbo_usd = p["jumbo_usd" + suffix] !== undefined ? p["jumbo_usd" + suffix] : p.jumbo_usd;
  });
  // Re-render
  render();
}

function setMarket(mkt) {
  currentMarket = mkt;
  // Update UI toggle buttons
  var cnBtn = document.getElementById("marketCn");
  var otherBtn = document.getElementById("marketOther");
  if (cnBtn && otherBtn) {
    cnBtn.classList.toggle("active", mkt === "cn");
    otherBtn.classList.toggle("active", mkt === "other");
    cnBtn.style.background = mkt === "cn" ? "#1a56db" : "#fff";
    cnBtn.style.color = mkt === "cn" ? "#fff" : "#333";
    cnBtn.style.borderColor = mkt === "cn" ? "#1a56db" : "#d0d5dd";
    otherBtn.style.background = mkt === "other" ? "#1a56db" : "#fff";
    otherBtn.style.color = mkt === "other" ? "#fff" : "#333";
    otherBtn.style.borderColor = mkt === "other" ? "#1a56db" : "#d0d5dd";
  }
  applyMarket();
