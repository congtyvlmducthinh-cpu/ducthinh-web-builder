// Data
var DATA_PRODUCTS = [{"code": "H4A1", "size": "4±1 µm", "standard": "A1", "machine": "1700", "exw_vnd": 2430000, "exw_usd": 93.46, "comm_vnd": 33000, "comm_usd": 1.27, "pkg25_vnd": 2651000, "pkg25_usd": 101.96, "jumbo_vnd": 2641000, "jumbo_usd": 101.58}, {"code": "H5A1", "size": "5±1 µm", "standard": "A1", "machine": "1700", "exw_vnd": 1890000, "exw_usd": 72.69, "comm_vnd": 26000, "comm_usd": 1, "pkg25_vnd": 2086000, "pkg25_usd": 80.23, "jumbo_vnd": 2101000, "jumbo_usd": 80.81}, {"code": "H6A1", "size": "6±1 µm", "standard": "A1", "machine": "1700", "exw_vnd": 1510000, "exw_usd": 58.08, "comm_vnd": 21000, "comm_usd": 0.81, "pkg25_vnd": 1706000, "pkg25_usd": 65.62, "jumbo_vnd": 1721000, "jumbo_usd": 66.19}, {"code": "H8A1", "size": "8±1 µm", "standard": "A1", "machine": "1700", "exw_vnd": 1130000, "exw_usd": 43.46, "comm_vnd": 16000, "comm_usd": 0.62, "pkg25_vnd": 1317000, "pkg25_usd": 50.65, "jumbo_vnd": 1278000, "jumbo_usd": 49.15}, {"code": "H8RA1", "size": "8±1 µm", "standard": "A1", "machine": "1700", "exw_vnd": 1390000, "exw_usd": 53.46, "comm_vnd": 20000, "comm_usd": 0.77, "pkg25_vnd": 1577000, "pkg25_usd": 60.65, "jumbo_vnd": 1538000, "jumbo_usd": 59.15}, {"code": "H10A1", "size": "10±1 µm", "standard": "A1", "machine": "1700", "exw_vnd": 990000, "exw_usd": 38.08, "comm_vnd": 14000, "comm_usd": 0.54, "pkg25_vnd": 1177000, "pkg25_usd": 45.27, "jumbo_vnd": 1125000, "jumbo_usd": 43.27}, {"code": "H12A1", "size": "12±1 µm", "standard": "A1", "machine": "1700", "exw_vnd": 960000, "exw_usd": 36.92, "comm_vnd": 14000, "comm_usd": 0.54, "pkg25_vnd": 1147000, "pkg25_usd": 44.12, "jumbo_vnd": 1084000, "jumbo_usd": 41.69}, {"code": "H15A1", "size": "15±1 µm", "standard": "A1", "machine": "1700", "exw_vnd": 880000, "exw_usd": 33.85, "comm_vnd": 13000, "comm_usd": 0.5, "pkg25_vnd": 1058000, "pkg25_usd": 40.69, "jumbo_vnd": 999000, "jumbo_usd": 38.42}, {"code": "H17A1", "size": "17±1 µm", "standard": "A1", "machine": "1700", "exw_vnd": 870000, "exw_usd": 33.46, "comm_vnd": 13000, "comm_usd": 0.5, "pkg25_vnd": 1048000, "pkg25_usd": 40.31, "jumbo_vnd": 989000, "jumbo_usd": 38.04}, {"code": "H20A1", "size": "20±2 µm", "standard": "A1", "machine": "1700", "exw_vnd": 850000, "exw_usd": 32.69, "comm_vnd": 13000, "comm_usd": 0.5, "pkg25_vnd": 1028000, "pkg25_usd": 39.54, "jumbo_vnd": 960000, "jumbo_usd": 36.92}, {"code": "H25A1", "size": "25±2 µm", "standard": "A1", "machine": "1700", "exw_vnd": 810000, "exw_usd": 31.15, "comm_vnd": 12000, "comm_usd": 0.46, "pkg25_vnd": 988000, "pkg25_usd": 38, "jumbo_vnd": 920000, "jumbo_usd": 35.38}, {"code": "H30A1", "size": "30±3 µm", "standard": "A1", "machine": "1700", "exw_vnd": 760000, "exw_usd": 29.23, "comm_vnd": 11000, "comm_usd": 0.42, "pkg25_vnd": 938000, "pkg25_usd": 36.08, "jumbo_vnd": 870000, "jumbo_usd": 33.46}, {"code": "F15A1", "size": "15±1 µm", "standard": "A1", "machine": "318", "exw_vnd": 810000, "exw_usd": 31.15, "comm_vnd": 12000, "comm_usd": 0.46, "pkg25_vnd": 988000, "pkg25_usd": 38, "jumbo_vnd": 920000, "jumbo_usd": 35.38}, {"code": "F17A1", "size": "17±1 µm", "standard": "A1", "machine": "318", "exw_vnd": 810000, "exw_usd": 31.15, "comm_vnd": 12000, "comm_usd": 0.46, "pkg25_vnd": 988000, "pkg25_usd": 38, "jumbo_vnd": 929000, "jumbo_usd": 35.73}, {"code": "F20A1", "size": "20±2 µm", "standard": "A1", "machine": "318", "exw_vnd": 740000, "exw_usd": 28.46, "comm_vnd": 11000, "comm_usd": 0.42, "pkg25_vnd": 918000, "pkg25_usd": 35.31, "jumbo_vnd": 850000, "jumbo_usd": 32.69}, {"code": "F25A1", "size": "25±2 µm", "standard": "A1", "machine": "318", "exw_vnd": 710000, "exw_usd": 27.31, "comm_vnd": 11000, "comm_usd": 0.42, "pkg25_vnd": 888000, "pkg25_usd": 34.15, "jumbo_vnd": 820000, "jumbo_usd": 31.54}, {"code": "F30A1", "size": "30±3 µm", "standard": "A1", "machine": "318", "exw_vnd": 690000, "exw_usd": 26.54, "comm_vnd": 10000, "comm_usd": 0.38, "pkg25_vnd": 868000, "pkg25_usd": 33.38, "jumbo_vnd": 800000, "jumbo_usd": 30.77}, {"code": "F35A1", "size": "35±3 µm", "standard": "A1", "machine": "318", "exw_vnd": 680000, "exw_usd": 26.15, "comm_vnd": 10000, "comm_usd": 0.38, "pkg25_vnd": 858000, "pkg25_usd": 33, "jumbo_vnd": 790000, "jumbo_usd": 30.38}, {"code": "F40A1", "size": "40±3 µm", "standard": "A1", "machine": "318", "exw_vnd": 810000, "exw_usd": 31.15, "comm_vnd": 12000, "comm_usd": 0.46, "pkg25_vnd": 988000, "pkg25_usd": 38, "jumbo_vnd": 920000, "jumbo_usd": 35.38}, {"code": "F45A1", "size": "45±3 µm", "standard": "A1", "machine": "318", "exw_vnd": 640000, "exw_usd": 24.62, "comm_vnd": 10000, "comm_usd": 0.38, "pkg25_vnd": 818000, "pkg25_usd": 31.46, "jumbo_vnd": 750000, "jumbo_usd": 28.85}, {"code": "F15A2", "size": "15±1 µm", "standard": "A2-", "machine": "318", "exw_vnd": 580000, "exw_usd": 22.31, "comm_vnd": 9000, "comm_usd": 0.35, "pkg25_vnd": 758000, "pkg25_usd": 29.15, "jumbo_vnd": 690000, "jumbo_usd": 26.54}, {"code": "F17A2", "size": "17±1 µm", "standard": "A2-", "machine": "318", "exw_vnd": 540000, "exw_usd": 20.77, "comm_vnd": 9000, "comm_usd": 0.35, "pkg25_vnd": 718000, "pkg25_usd": 27.62, "jumbo_vnd": 659000, "jumbo_usd": 25.35}, {"code": "F20A2", "size": "20±2 µm", "standard": "A2-", "machine": "318", "exw_vnd": 510000, "exw_usd": 19.62, "comm_vnd": 8000, "comm_usd": 0.31, "pkg25_vnd": 688000, "pkg25_usd": 26.46, "jumbo_vnd": 620000, "jumbo_usd": 23.85}, {"code": "F25A2", "size": "25±2 µm", "standard": "A2-", "machine": "318", "exw_vnd": 480000, "exw_usd": 18.46, "comm_vnd": 8000, "comm_usd": 0.31, "pkg25_vnd": 658000, "pkg25_usd": 25.31, "jumbo_vnd": 590000, "jumbo_usd": 22.69}, {"code": "F30A2", "size": "30±3 µm", "standard": "A2-", "machine": "318", "exw_vnd": 460000, "exw_usd": 17.69, "comm_vnd": 7000, "comm_usd": 0.27, "pkg25_vnd": 638000, "pkg25_usd": 24.54, "jumbo_vnd": 570000, "jumbo_usd": 21.92}, {"code": "F35A2", "size": "35±3 µm", "standard": "A2-", "machine": "318", "exw_vnd": 440000, "exw_usd": 16.92, "comm_vnd": 7000, "comm_usd": 0.27, "pkg25_vnd": 618000, "pkg25_usd": 23.77, "jumbo_vnd": 550000, "jumbo_usd": 21.15}, {"code": "F45A2", "size": "45±3 µm", "standard": "A2-", "machine": "318", "exw_vnd": 410000, "exw_usd": 15.77, "comm_vnd": 7000, "comm_usd": 0.27, "pkg25_vnd": 588000, "pkg25_usd": 22.62, "jumbo_vnd": 520000, "jumbo_usd": 20}, {"code": "F15A2", "size": "15±1 µm", "standard": "A2", "machine": "318", "exw_vnd": 650000, "exw_usd": 25, "comm_vnd": 10000, "comm_usd": 0.38, "pkg25_vnd": 828000, "pkg25_usd": 31.85, "jumbo_vnd": 760000, "jumbo_usd": 29.23}, {"code": "F17A2", "size": "17±1 µm", "standard": "A2", "machine": "318", "exw_vnd": 600000, "exw_usd": 23.08, "comm_vnd": 9000, "comm_usd": 0.35, "pkg25_vnd": 778000, "pkg25_usd": 29.92, "jumbo_vnd": 710000, "jumbo_usd": 27.31}, {"code": "F20A2", "size": "20±2 µm", "standard": "A2", "machine": "318", "exw_vnd": 580000, "exw_usd": 22.31, "comm_vnd": 9000, "comm_usd": 0.35, "pkg25_vnd": 758000, "pkg25_usd": 29.15, "jumbo_vnd": 699000, "jumbo_usd": 26.88}, {"code": "F25A2", "size": "25±2 µm", "standard": "A2", "machine": "318", "exw_vnd": 550000, "exw_usd": 21.15, "comm_vnd": 9000, "comm_usd": 0.35, "pkg25_vnd": 728000, "pkg25_usd": 28, "jumbo_vnd": 660000, "jumbo_usd": 25.38}, {"code": "F30A2", "size": "30±3 µm", "standard": "A2", "machine": "318", "exw_vnd": 530000, "exw_usd": 20.38, "comm_vnd": 8000, "comm_usd": 0.31, "pkg25_vnd": 708000, "pkg25_usd": 27.23, "jumbo_vnd": 640000, "jumbo_usd": 24.62}, {"code": "K45A2", "size": "45±3 µm", "standard": "A2-", "machine": "1500", "exw_vnd": 380000, "exw_usd": 14.62, "comm_vnd": 6000, "comm_usd": 0.23, "pkg25_vnd": 558000, "pkg25_usd": 21.46, "jumbo_vnd": 490000, "jumbo_usd": 18.85}, {"code": "K65A2", "size": "65±3 µm", "standard": "A2-", "machine": "1500", "exw_vnd": 370000, "exw_usd": 14.23, "comm_vnd": 6000, "comm_usd": 0.23, "pkg25_vnd": 548000, "pkg25_usd": 21.08, "jumbo_vnd": 480000, "jumbo_usd": 18.46}, {"code": "K45A3", "size": "45±3 µm", "standard": "A3", "machine": "1500", "exw_vnd": 260000, "exw_usd": 10, "comm_vnd": 5000, "comm_usd": 0.19, "pkg25_vnd": 438000, "pkg25_usd": 16.85, "jumbo_vnd": 370000, "jumbo_usd": 14.23}, {"code": "K65A3", "size": "65±3 µm", "standard": "A3", "machine": "1500", "exw_vnd": 240000, "exw_usd": 9.23, "comm_vnd": 5000, "comm_usd": 0.19, "pkg25_vnd": 418000, "pkg25_usd": 16.08, "jumbo_vnd": 350000, "jumbo_usd": 13.46}, {"code": "E80A2", "size": "80±3 µm", "standard": "A2", "machine": "1300", "exw_vnd": 770000, "exw_usd": 29.62, "comm_vnd": 12000, "comm_usd": 0.46, "pkg25_vnd": 0, "pkg25_usd": 0, "jumbo_vnd": 880000, "jumbo_usd": 33.85}, {"code": "E125A1", "size": "70±3 µm", "standard": "A1", "machine": "1300", "exw_vnd": 1140000, "exw_usd": 43.85, "comm_vnd": 16000, "comm_usd": 0.62, "pkg25_vnd": 0, "pkg25_usd": 0, "jumbo_vnd": 1250000, "jumbo_usd": 48.08}, {"code": "E70A1", "size": "70±3 µm", "standard": "A1", "machine": "1300", "exw_vnd": 1170000, "exw_usd": 45, "comm_vnd": 17000, "comm_usd": 0.65, "pkg25_vnd": 0, "pkg25_usd": 0, "jumbo_vnd": 1280000, "jumbo_usd": 49.23}, {"code": "S55A1", "size": "55 Mesh", "standard": "A1", "machine": "Sand", "exw_vnd": 1000000, "exw_usd": 38.46, "comm_vnd": 14000, "comm_usd": 0.54, "pkg25_vnd": 0, "pkg25_usd": 0, "jumbo_vnd": 1110000, "jumbo_usd": 42.69}, {"code": "S30A1", "size": "30 Mesh", "standard": "A1", "machine": "Sand", "exw_vnd": 1000000, "exw_usd": 38.46, "comm_vnd": 14000, "comm_usd": 0.54, "pkg25_vnd": 0, "pkg25_usd": 0, "jumbo_vnd": 1110000, "jumbo_usd": 42.69}, {"code": "S40A1", "size": "40 Mesh", "standard": "A1", "machine": "Sand", "exw_vnd": 1000000, "exw_usd": 38.46, "comm_vnd": 14000, "comm_usd": 0.54, "pkg25_vnd": 0, "pkg25_usd": 0, "jumbo_vnd": 1110000, "jumbo_usd": 42.69}, {"code": "S20A1", "size": "20 Mesh", "standard": "A1", "machine": "Sand", "exw_vnd": 1050000, "exw_usd": 40.38, "comm_vnd": 15000, "comm_usd": 0.58, "pkg25_vnd": 0, "pkg25_usd": 0, "jumbo_vnd": 1160000, "jumbo_usd": 44.62}, {"code": "S16A1", "size": "16 Mesh", "standard": "A1", "machine": "Sand", "exw_vnd": 1200000, "exw_usd": 46.15, "comm_vnd": 17000, "comm_usd": 0.65, "pkg25_vnd": 0, "pkg25_usd": 0, "jumbo_vnd": 1310000, "jumbo_usd": 50.38}, {"code": "S8A1", "size": "8 Mesh", "standard": "A1", "machine": "Sand", "exw_vnd": 1390000, "exw_usd": 53.46, "comm_vnd": 20000, "comm_usd": 0.77, "pkg25_vnd": 0, "pkg25_usd": 0, "jumbo_vnd": 1500000, "jumbo_usd": 57.69}];
var DATA_BAGS = [{"code": "NVL-BB-PP-K55X85", "cost": 4562, "spec": "25KG", "qty": 18000, "price": 220528, "profit": 0.1}, {"code": "NVL-BB-JB-92X92X125", "cost": 127750, "spec": "Jumbo", "qty": 3000, "price": 143825, "profit": 0.1}, {"code": "NVL-BB-JB-95X95X125", "cost": 131250, "spec": "Jumbo", "qty": 3000, "price": 147675, "profit": 0.1}, {"code": "NVL-BB-25KG-52X78", "cost": 3990, "spec": "25KG", "qty": 18000, "price": 195360, "profit": 0.1}, {"code": "NVL-BB-25KG-52X75", "cost": 3800, "spec": "25KG", "qty": 18000, "price": 187000, "profit": 0.1}, {"code": "NVL-BB-25KG-52X72", "cost": 3587, "spec": "25KG", "qty": 18000, "price": 177628, "profit": 0.1}, {"code": "NVL-BB-34KG-50X78-KOTR", "cost": 3100, "spec": "34KG", "qty": 18000, "price": 156200, "profit": 0.1}, {"code": "50KG-NHUATAICHE-55X85", "cost": 2650, "spec": "50KG", "qty": 18000, "price": 78100, "profit": 0.1}, {"code": "NVL-BB-25KG-50X72-KOTR", "cost": 3000, "spec": "25KG", "qty": 18000, "price": 151800, "profit": 0.1}, {"code": "Bao jumbo của khách", "cost": 0, "spec": "Jumbo", "qty": 3000, "price": 3300, "profit": 0.1}, {"code": "BAO 25KG CỦA KHÁCH", "cost": 0, "spec": "25KG", "qty": 18000, "price": 19800, "profit": 0.1}, {"code": "NVL-BB-JB-90X90X125-TR", "cost": 127000, "spec": "Jumbo", "qty": 3000, "price": 143000, "profit": 0.1}, {"code": "NVL-BB-JB-90X90X125-TR QUAY VÒNG", "cost": 43000, "spec": "Jumbo", "qty": 3000, "price": 59800, "profit": 0.3}, {"code": "NVL-BB-25KG-50X72", "cost": 3587, "spec": "25KG", "qty": 18000, "price": 177628, "profit": 0.1}];
var DATA_OTHERS = [{"code": "PALLET TÁI SỬ DỤNG", "cost": 70000, "price": 77000, "profit": 0.1}, {"code": "PALLET MỚI", "cost": 120000, "price": 132000, "profit": 0.1}, {"code": "NẸP ĐAI", "cost": 5000, "price": 5500, "profit": 0.1}, {"code": "QUẤN MÀNG", "cost": 18000, "price": 19800, "profit": 0.1}, {"code": "PALLET TRÁNG PHỦ", "cost": 160000, "price": 176000, "profit": 0.1}, {"code": "JUMBO MỞ NẮP (SLING)", "cost": 95000, "price": 104500, "profit": 0.1}, {"code": "PALLET MỚI + NẸP ĐAI + QUẤN MÀNG", "cost": 143000, "price": 157300, "profit": 0.1}, {"code": "JUMBO MỞ NẮP (SLING) CỦA KHÁCH", "cost": 35000, "price": 38500, "profit": 0.1}];
// Max loading lookup (tons per container) — nguồn từ Max_loadding.xlsx
var DATA_MAX_LOADING = {"H4A1":{"max25":20,"maxJumbo":14},"H5A1":{"max25":22,"maxJumbo":14},"H6A1":{"max25":24,"maxJumbo":14},"H8A1":{"max25":26,"maxJumbo":20},"H8RA1":{"max25":26,"maxJumbo":20},"H10A1":{"max25":27,"maxJumbo":22},"H12A1":{"max25":27,"maxJumbo":24},"H15A1":{"max25":27,"maxJumbo":26},"H17A1":{"max25":27,"maxJumbo":26},"H20A1":{"max25":28,"maxJumbo":27},"H25A1":{"max25":28,"maxJumbo":27},"H30A1":{"max25":28,"maxJumbo":27},"F15A1":{"max25":27,"maxJumbo":26},"F17A1":{"max25":27,"maxJumbo":26},"F20A1":{"max25":28,"maxJumbo":27},"F25A1":{"max25":28,"maxJumbo":27},"F30A1":{"max25":28,"maxJumbo":27},"F35A1":{"max25":28,"maxJumbo":27},"F40A1":{"max25":28,"maxJumbo":27},"F45A1":{"max25":28,"maxJumbo":27},"K45A2":{"max25":28,"maxJumbo":27},"K65A2":{"max25":28,"maxJumbo":27},"K45A3":{"max25":28,"maxJumbo":27},"K65A3":{"max25":28,"maxJumbo":27},"E80A2":{"max25":null,"maxJumbo":27},"E125A1":{"max25":null,"maxJumbo":27},"E70A1":{"max25":null,"maxJumbo":27},"S55A1":{"max25":null,"maxJumbo":27},"S30A1":{"max25":null,"maxJumbo":27},"S40A1":{"max25":null,"maxJumbo":27},"S20A1":{"max25":null,"maxJumbo":27},"S16A1":{"max25":null,"maxJumbo":27},"S8A1":{"max25":null,"maxJumbo":27}};
// Merge F15A2, F17A2, F20A2, F25A2, F30A2, F35A2, F45A2 variations from max loading
DATA_MAX_LOADING["F15A2-318-A2-"] = {"max25":27,"maxJumbo":26};
DATA_MAX_LOADING["F17A2-318-A2-"] = {"max25":27,"maxJumbo":26};
DATA_MAX_LOADING["F20A2-318-A2-"] = {"max25":28,"maxJumbo":27};
DATA_MAX_LOADING["F25A2-318-A2-"] = {"max25":28,"maxJumbo":27};
DATA_MAX_LOADING["F30A2-318-A2-"] = {"max25":28,"maxJumbo":27};
DATA_MAX_LOADING["F35A2-318-A2-"] = {"max25":28,"maxJumbo":27};
DATA_MAX_LOADING["F45A2-318-A2-"] = {"max25":28,"maxJumbo":27};
DATA_MAX_LOADING["F15A2-318-A2"] = {"max25":27,"maxJumbo":27};
DATA_MAX_LOADING["F17A2-318-A2"] = {"max25":27,"maxJumbo":26};
DATA_MAX_LOADING["F20A2-318-A2"] = {"max25":28,"maxJumbo":26};
DATA_MAX_LOADING["F25A2-318-A2"] = {"max25":28,"maxJumbo":27};
DATA_MAX_LOADING["F30A2-318-A2"] = {"max25":28,"maxJumbo":27};

// Cost Fob lookup table (VND/tấn) — nguồn từ Cost Fob.xlsx
var DATA_COST_FOB = {14:{no:1005400,sub:1294700},20:{no:704840,sub:907350},22:{no:640200,sub:823900},24:{no:586300,sub:755700},25:{no:563200,sub:726000},26:{no:541200,sub:697400},27:{no:521400,sub:672100},28:{no:502700,sub:647900}};

// App

// App
// App
var currency = "VND";
var activeTab = "pricelist";
var priceMode = "exw";
var lccType = "no";
var freightUSD = 0;
var managePassword = "ducthinh2026";

// ====== UTILITY ======
function formatCurrency(v, isUsd) {
  if (v === null || v === undefined || isNaN(v)) return "\u2014";
  var s = Math.round(v).toLocaleString();
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
function getFOB25PriceUSD(prod, lccVariant) { return Math.round(getFOB25PriceVND(prod, lccVariant) / 26000); }
function getFOBJumboPriceUSD(prod, lccVariant) { return Math.round(getFOBJumboPriceVND(prod, lccVariant) / 26000); }

// ====== CIF PRICES ======
function getCIF25PriceVND(prod, lccVariant, freight) {
  var ml = getMaxLoading(prod.code, "max25");
  if (!ml || ml <= 0) return prod.exw_vnd;
  var base = getFOB25PriceVND(prod, lccVariant);
  if (!freight || freight <= 0) return base;
  return Math.round(base + (freight + 10) * 26000 / ml);
}
function getCIFJumboPriceVND(prod, lccVariant, freight) {
  var ml = getMaxLoading(prod.code, "maxJumbo");
  if (!ml || ml <= 0) return prod.exw_vnd;
  var base = getFOBJumboPriceVND(prod, lccVariant);
  if (!freight || freight <= 0) return base;
  return Math.round(base + (freight + 10) * 26000 / ml);
}
function getCIF25PriceUSD(prod, lccVariant, freight) { return Math.round(getCIF25PriceVND(prod, lccVariant, freight) / 26000); }
function getCIFJumboPriceUSD(prod, lccVariant, freight) { return Math.round(getCIFJumboPriceVND(prod, lccVariant, freight) / 26000); }

// ====== PRICE MODE CONTROLS (Gi\u00e1 b\u00e1n tab) ======
function setPriceMode(mode) {
  priceMode = mode;
  var bar = document.getElementById("priceModeBar");
  if (!bar) return;
  bar.style.display = "flex";
  bar.querySelectorAll(".mode-btn").forEach(function(b) { b.classList.toggle("active", b.dataset.mode === mode); });
  var lccGrp = document.getElementById("lccGroup");
  if (lccGrp) lccGrp.style.display = (mode === "fob" || mode === "cif") ? "flex" : "none";
  var fg = document.getElementById("freightGroup");
  if (fg) fg.style.display = mode === "cif" ? "inline-flex" : "none";
  render();
}
function setLccType(type) {
  lccType = type;
  var bar = document.getElementById("priceModeBar");
  if (bar) bar.querySelectorAll(".lcc-btn").forEach(function(b) { b.classList.toggle("active", b.dataset.lcc === type); });
  render();
}
function setFreight(val) {
  freightUSD = parseFloat(val) || 0;
  var fi = document.getElementById("freightInput");
  if (fi) fi.value = val;
  render();
}
function onFreightChange() {
  var fi = document.getElementById("freightInput");
  if (fi) setFreight(fi.value);
}

// ====== GLOBAL SEARCH ======
function globalSearch() { render(); }

// ====== TOGGLE CURRENCY ======
function toggleCurrency(el) {
  currency = el.dataset.currency;
  document.querySelectorAll(".currency-toggle button").forEach(function(b) { b.classList.toggle("active", b.dataset.currency === currency); });
  render();
}

// ====== SWITCH TAB ======
function switchTab(tab) {
  activeTab = tab;
  document.querySelectorAll(".tab-btn").forEach(function(b) { b.classList.toggle("active", b.dataset.tab === tab); });
  
  // Control bar visibility
  var cbar = document.getElementById("controlBar");
  if (cbar) cbar.style.display = (tab === "pricelist" || tab === "bags" || tab === "others") ? "flex" : "none";
  
  // Price mode bar only on pricelist
  var bar = document.getElementById("priceModeBar");
  if (bar) bar.style.display = (tab === "pricelist") ? "flex" : "none";
  
  // Manage panel
  document.getElementById("managePanel").classList.toggle("open", tab === "manage");
  
  // Populate filters on pricelist tab
  if (tab === "pricelist") populateFilters();
  
  render();
}

// ====== RENDER PRICE TAB ======
function renderPriceTab() {
  var search = (document.getElementById("searchInput") && document.getElementById("searchInput").value || "").toLowerCase();
  var specFilter = document.getElementById("specFilter") && document.getElementById("specFilter").value || "";
  var sizeFilter = document.getElementById("sizeFilter") && document.getElementById("sizeFilter").value || "";
  var machineFilter = document.getElementById("machineFilter") && document.getElementById("machineFilter").value || "";
  var isUsd = currency === "USD";
  var filtered = DATA_PRODUCTS.filter(function(p) {
    if (search && p.code.toLowerCase().indexOf(search) < 0 && p.size.toLowerCase().indexOf(search) < 0) return false;
    if (specFilter && p.standard !== specFilter) return false;
    if (sizeFilter && p.size !== sizeFilter) return false;
    if (machineFilter && p.machine !== machineFilter) return false;
    return true;
  });
  var isFob = priceMode === "fob";
  var isCif = priceMode === "cif";
  var showFobCif = isFob || isCif;

  var h = "";

  // Freight warning
  if (isCif && (!freightUSD || freightUSD <= 0)) {
    h += '<div class="freight-warning">\u26a0\ufe0f Ch\u1ebf \u0111\u1ed9 CIF y\u00eau c\u1ea7u nh\u1eadp c\u01b0\u1edbc bi\u1ec3n. Vui l\u00f2ng nh\u1eadp Freight USD \u1edf thanh c\u00f4ng c\u1ee5 b\u00ean tr\u00ean.</div>';
  }

  // Summary
  var uniqueCodes = {};
  filtered.forEach(function(p) { uniqueCodes[p.code] = true; });
  h += '<div class="summary-bar">';
  h += '<div class="summary-card"><div class="lbl">S\u1ea3n ph\u1ea9m</div><div class="val">' + Object.keys(uniqueCodes).length + '</div></div>';
  h += '<div class="summary-card"><div class="lbl">Ng\u00e0y</div><div class="val" style="font-size:16px">25/06/2026</div></div>';
  h += '</div>';

  // Table
  h += '<div class="table-wrap"><table><thead>';
  h += '<tr><th colspan="4">Th\u00f4ng tin</th><th colspan="2">Gi\u00e1 bao g\u1ed3m bao b\u00ec</th>';
  if (!showFobCif) h += '<th colspan="2">Gi\u00e1 b\u00e1n (EXW)</th>';
  h += '</tr>';
  h += '<tr><th>M\u00e3</th><th>K\u00edch th\u01b0\u1edbc</th><th>Ti\u00eau chu\u1ea9n</th><th>M\u00e1y</th><th>25KG <span class="info-row">(VND)</span></th><th>Jumbo <span class="info-row">(VND)</span></th>';
  if (!showFobCif) {
    h += '<th>EXW <span class="info-row">' + (isUsd ? '(USD)' : '(VND)') + '</span></th><th>Hoa h\u1ed3ng <span class="info-row">' + (isUsd ? '(USD)' : '(VND)') + '</span></th>';
  }
  h += '</tr></thead><tbody>';

  for (var i = 0; i < filtered.length; i++) {
    var p = filtered[i];
    h += '<tr>';
    h += '<td><strong>' + p.code + '</strong></td>';
    h += '<td>' + p.size + '</td>';
    h += '<td><span class="badge-spec badge-' + p.standard.replace(/-/g, '').replace(/\+/g, '') + '">' + p.standard + '</span></td>';
    h += '<td>' + p.machine + '</td>';
    if (isFob) {
      h += '<td class="text-right">' + formatCurrency(getFOB25PriceVND(p, lccType), false) + '</td>';
      h += '<td class="text-right">' + formatCurrency(getFOBJumboPriceVND(p, lccType), false) + '</td>';
    } else if (isCif) {
      h += '<td class="text-right">' + formatCurrency(getCIF25PriceVND(p, lccType, freightUSD), false) + '</td>';
      h += '<td class="text-right">' + formatCurrency(getCIFJumboPriceVND(p, lccType, freightUSD), false) + '</td>';
    } else {
      h += '<td class="text-right">' + (p.pkg25_vnd ? (isUsd ? formatCurrency(p.pkg25_usd, true) : formatCurrency(p.pkg25_vnd, false)) : '\u2014') + '</td>';
      h += '<td class="text-right">' + (p.jumbo_vnd ? (isUsd ? formatCurrency(p.jumbo_usd, true) : formatCurrency(p.jumbo_vnd, false)) : '\u2014') + '</td>';
    }
    if (!showFobCif) {
      h += '<td class="text-right"><strong>' + formatCurrency(isUsd ? p.exw_usd : p.exw_vnd, isUsd) + '</strong></td>';
      h += '<td class="text-right"><span class="tag-profit">' + formatCurrency(isUsd ? p.comm_usd : p.comm_vnd, isUsd) + '</span></td>';
    }
    h += '</tr>';
  }
  h += '</tbody></table></div>';
  return h;
}

// ====== RENDER CALC TAB ======
function renderCalcTab() {
  var h = '<div class="calc-container">';
  h += '<div class="calc-left">';

  // Machine filter
  var machines = {};
  DATA_PRODUCTS.forEach(function(p) { machines[p.machine] = true; });
  var machineKeys = Object.keys(machines).sort();
  h += '<div class="calc-row"><label>Máy</label>';
  h += '<select id="calcMachine" onchange="filterCalcProducts()"><option value="">— Chọn máy —</option>';
  for (var i = 0; i < machineKeys.length; i++) {
    h += '<option value="' + machineKeys[i].replace(/"/g, '&quot;') + '">' + machineKeys[i] + '</option>';
  }
  h += '</select></div>';

  // Standard filter (populated dynamically)
  h += '<div class="calc-row"><label>Tiêu chuẩn</label>';
  h += '<select id="calcStandard" onchange="filterCalcProducts()"><option value="">— Chọn tiêu chuẩn —</option></select></div>';

  // Product select
  h += '<div class="calc-row"><label>Sản phẩm</label>';
  h += '<select id="calcProduct" onchange="onCalcProductChange()"><option value="">— Chọn sản phẩm —</option></select></div>';

  // Bag spec
  h += '<div class="calc-row"><label>Quy cách bao</label>';
  h += '<select id="calcBagSpec" onchange="filterBagSpec()"><option value="25KG">25KG</option><option value="Jumbo">Jumbo</option></select></div>';

  // Bag select
  h += '<div class="calc-row"><label>Bao bì</label>';
  h += '<select id="calcBag" onchange="calcPrice()"><option value="">— Không chọn bao bì —</option>';
  for (var i = 0; i < DATA_BAGS.length; i++) {
    h += '<option value="' + DATA_BAGS[i].code + '">' + DATA_BAGS[i].code + '</option>';
  }
  h += '</select></div>';

  // Jumbo tonnage (hidden by default)
  h += '<div class="calc-row" id="calcTonnageRow" style="display:none">';
  h += '<label>Số tấn / bao Jumbo</label>';
  h += '<input type="number" id="calcTonnage" value="1" min="0.1" step="0.1" oninput="calcPrice()" placeholder="VD: 1">';
  h += '</div>';

  // Other spec
  h += '<div class="calc-row"><label>Quy cách khác</label>';
  h += '<select id="calcOther" onchange="calcPrice()"><option value="">— Không chọn —</option>';
  for (var i = 0; i < DATA_OTHERS.length; i++) {
    h += '<option value="' + DATA_OTHERS[i].code + '">' + DATA_OTHERS[i].code + '</option>';
  }
  h += '</select></div>';

  // Other tonnage (visible by default, hidden when Jumbo)
  h += '<div class="calc-row" id="calcOtherTonnageRow">';
  h += '<label>Số container (quy cách khác)</label>';
  h += '<select id="calcOtherTonnage" onchange="calcPrice()">';
  for (var i = 1; i <= 28; i++) {
    h += '<option value="' + i + '">' + i + ' container</option>';
  }
  h += '</select></div>';

  h += '</div>'; // end calc-left

  // RIGHT panel
  h += '<div class="calc-right">';
  h += '<h3>💰 Kết quả</h3>';
  h += '<div class="calc-result" id="calcResult">';
  h += '<div class="calc-empty">👈 Vui lòng chọn sản phẩm và bao bì</div>';
  h += '</div>';
  h += '</div>';

  h += '</div>'; // end calc-container
  return h;
}// ====== CALC FILTER HELPERS ======
function filterCalcProducts() {
  var me = document.getElementById("calcMachine"), se = document.getElementById("calcStandard"), pe = document.getElementById("calcProduct");
  if (!me || !se || !pe) return;
  var m = me.value, standards = {};
  DATA_PRODUCTS.forEach(function(p) { if (!m || p.machine === m) standards[p.standard] = true; });
  var sk = Object.keys(standards).sort();
  se.innerHTML = '<option value="">— Chọn tiêu chuẩn —</option>';
  for (var i = 0; i < sk.length; i++) se.innerHTML += '<option value="' + sk[i].replace(/"/g, '&quot;') + '">' + sk[i] + '</option>';
  filterCalcProducts_products();
}
function filterCalcProducts_products() {
  var me = document.getElementById("calcMachine"), se = document.getElementById("calcStandard"), pe = document.getElementById("calcProduct");
  if (!me || !se || !pe) return;
  var m = me.value, s = se.value;
  pe.innerHTML = '<option value="">— Chọn sản phẩm —</option>';
  DATA_PRODUCTS.forEach(function(p) { if ((!m || p.machine === m) && (!s || p.standard === s)) pe.innerHTML += '<option value="' + p.code + '">' + p.code + ' — ' + p.size + '</option>'; });
}
function onCalcProductChange() { calcPrice(); }
// ====== FILTER HELPERS ======
function filterBagSpec() {
  var bagSpec = document.getElementById("calcBagSpec").value;
  var tnRow = document.getElementById("calcTonnageRow");
  var otnRow = document.getElementById("calcOtherTonnageRow");
  if (tnRow) tnRow.style.display = (bagSpec === "Jumbo") ? "flex" : "none";
  if (otnRow) otnRow.style.display = (bagSpec === "Jumbo") ? "none" : "flex";
  calcPrice();
}
// ====== CALC FUNCTIONS ======
function calcCommission() {
  var sp = document.getElementById("calcSellPrice"), cr = document.getElementById("calcCommissionResult");
  if (!sp || !cr || !sp.value) { if (cr) cr.innerHTML = ""; return; }
  var sellPrice = parseFloat(sp.value);
  if (isNaN(sellPrice) || sellPrice <= 0) { cr.innerHTML = ""; return; }
  var psel = document.getElementById("calcProduct");
  if (!psel || !psel.value) { cr.innerHTML = '<div style="color:var(--muted);font-size:12px">Chọn sản phẩm trước</div>'; return; }
  var prod = null;
  for (var i = 0; i < DATA_PRODUCTS.length; i++) { if (DATA_PRODUCTS[i].code === psel.value) { prod = DATA_PRODUCTS[i]; break; } }
  if (!prod) { cr.innerHTML = ""; return; }
  var isUsd = currency === "USD", exwMin = isUsd ? prod.exw_usd : prod.exw_vnd, commBase = isUsd ? prod.comm_usd : prod.comm_vnd;
  var bsel = document.getElementById("calcBag"), tnsel = document.getElementById("calcTonnage"), otnsel = document.getElementById("calcOtherTonnage"), osel = document.getElementById("calcOther"), bagSpecSel = document.getElementById("calcBagSpec");
  var bagPrice = 0, bcode = bsel ? bsel.value : "", isJumbo = bagSpecSel && bagSpecSel.value === "Jumbo", bagTons = 1;
  if (isJumbo && tnsel && tnsel.value && parseFloat(tnsel.value) > 0) bagTons = parseFloat(tnsel.value);
  var otherTons = 1;
  if (!isJumbo && otnsel && otnsel.value && parseFloat(otnsel.value) > 0) otherTons = parseFloat(otnsel.value);
  if (bcode) { for (var i = 0; i < DATA_BAGS.length; i++) { if (DATA_BAGS[i].code === bcode) { bagPrice = DATA_BAGS[i].price; break; } } if (isJumbo && bagTons > 0) bagPrice = bagPrice / bagTons; }
  var otherPrice = 0, ocode = osel ? osel.value : "";
  if (ocode) { for (var i = 0; i < DATA_OTHERS.length; i++) { if (DATA_OTHERS[i].code === ocode) { otherPrice = DATA_OTHERS[i].price; break; } } if (!isJumbo && otherTons > 0) otherPrice = otherPrice / otherTons; }
  var totalCost = exwMin + bagPrice + otherPrice;
  var diff = Math.max(0, sellPrice - totalCost);
  var commissionVar = diff * 0.3;
  var totalComm = commBase + commissionVar;
  var h = '<div class="calc-comm-row"><span>Hoa hồng cơ bản</span><strong>' + Math.round(commBase).toLocaleString() + ' ' + (isUsd ? "USD" : "VND") + '</strong></div>';
  h += '<div class="calc-comm-row"><span>Chênh lệch (30%)</span><strong>' + Math.round(commissionVar).toLocaleString() + ' ' + (isUsd ? "USD" : "VND") + '</strong></div>';
  h += '<div class="calc-comm-row"><span>Tổng giá vốn</span><strong>' + Math.round(totalCost).toLocaleString() + ' ' + (isUsd ? "USD" : "VND") + '</strong></div>';
  h += '<div class="calc-comm-row calc-total" style="padding:10px 0;border-top:2px solid var(--primary);margin-top:6px"><span>Tổng hoa hồng</span><strong style="color:var(--primary);font-size:16px">' + Math.round(totalComm).toLocaleString() + ' ' + (isUsd ? "USD" : "VND") + '</strong></div>';
  cr.innerHTML = h;
}
function calcPrice() {
  var res = document.getElementById("calcResult");
  if (!res) return;
  var psel = document.getElementById("calcProduct"), bsel = document.getElementById("calcBag"), tnsel = document.getElementById("calcTonnage"), otnsel = document.getElementById("calcOtherTonnage"), osel = document.getElementById("calcOther"), bagSpecSel = document.getElementById("calcBagSpec");
  var isUsd = currency === "USD", pcode = psel ? psel.value : "";
  if (!pcode) { res.innerHTML = '<div class="calc-empty">👈 Vui lòng chọn sản phẩm</div>'; return; }
  var prod = null;
  for (var i = 0; i < DATA_PRODUCTS.length; i++) { if (DATA_PRODUCTS[i].code === pcode) { prod = DATA_PRODUCTS[i]; break; } }
  if (!prod) { res.innerHTML = '<div class="calc-empty">❌ Không tìm thấy sản phẩm</div>'; return; }
  var exwMin = isUsd ? prod.exw_usd : prod.exw_vnd;
  var bagPrice = 0, bagTons = 1, bcode = bsel ? bsel.value : "";
  var isJumbo = bagSpecSel && bagSpecSel.value === "Jumbo";
  if (isJumbo && tnsel && tnsel.value && parseFloat(tnsel.value) > 0) bagTons = parseFloat(tnsel.value);
  var ocode = osel ? osel.value : "", otherTons = 1;
  if (!isJumbo && otnsel && otnsel.value && parseFloat(otnsel.value) > 0) otherTons = parseFloat(otnsel.value);
  var bagCode = "";
  if (bcode) { for (var i = 0; i < DATA_BAGS.length; i++) { if (DATA_BAGS[i].code === bcode) { bagPrice = DATA_BAGS[i].price; bagCode = DATA_BAGS[i].code; break; } } if (isJumbo && bagTons > 0) bagPrice = bagPrice / bagTons; }
  var otherPrice = 0, otherCode = "";
  if (ocode) { for (var i = 0; i < DATA_OTHERS.length; i++) { if (DATA_OTHERS[i].code === ocode) { otherPrice = DATA_OTHERS[i].price; otherCode = DATA_OTHERS[i].code; break; } } if (!isJumbo && otherTons > 0) otherPrice = otherPrice / otherTons; }
  var total = exwMin + bagPrice + otherPrice;
  var h = '<div class="calc-result-item"><span>Mã sản phẩm</span><strong>' + prod.code + '</strong></div>';
  h += '<div class="calc-result-item"><span>EXW (tối thiểu)</span><strong>' + Math.round(exwMin).toLocaleString() + ' ' + (isUsd ? "USD" : "VND") + '</strong></div>';
  h += '<div class="calc-result-item"><span>Máy</span><strong>' + prod.machine + '</strong></div>';
  h += '<div class="calc-result-item"><span>Tiêu chuẩn</span><strong>' + prod.standard + '</strong></div>';
  h += '<div class="calc-result-item"><span>Kích thước</span><strong>' + prod.size + '</strong></div>';
  if (bcode) { var bd = bagCode; if (isJumbo && bagTons > 0) bd += " / " + bagTons + " tấn"; h += '<div class="calc-result-item"><span>Bao bì (' + bd + ')</span><strong>' + Math.round(bagPrice).toLocaleString() + ' ' + (isUsd ? "USD" : "VND") + '</strong></div>'; }
  if (ocode) { var od = otherCode; if (!isJumbo && otherTons > 0) od += " / " + otherTons + " container"; h += '<div class="calc-result-item"><span>Quy cách khác (' + od + ')</span><strong>' + Math.round(otherPrice).toLocaleString() + ' ' + (isUsd ? "USD" : "VND") + '</strong></div>'; }
  h += '<div class="calc-result-item calc-total"><span>Tổng giá thành (EXW)</span><strong>' + (Math.round(total) || 0).toLocaleString() + ' ' + (isUsd ? "USD" : "VND") + '</strong></div>';
  h += '<div class="calc-commission-wrap" style="margin-top:12px"><label style="display:flex;justify-content:space-between;align-items:center;font-size:13px;font-weight:600;color:var(--primary);margin-bottom:8px"><span>Giá bán</span><input type="number" id="calcSellPrice" placeholder="Nhập giá bán..." oninput="calcCommission()" style="width:160px;padding:6px 10px;border:1px solid var(--border);border-radius:6px;font-size:13px;text-align:right"></label><div id="calcCommissionResult"></div></div>';
  res.innerHTML = h;
}


// ====== EXPORT FUNCTIONS ======
function exportToExcel() {
  var dt = new Date();
  var isUsd = currency === "USD";
  var modeLabel = priceMode.toUpperCase();
  if (priceMode === "fob" || priceMode === "cif") modeLabel += " (" + (lccType === "sub" ? "Sub LCC" : "No LCC") + ")";
  var fn = "DT-PriceList-" + dt.getFullYear() + "-" + (dt.getMonth() + 1) + "-" + dt.getDate() + ".xlsx";

  var rows = [["M\u00e3","K\u00edch th\u01b0\u1edbc","Ti\u00eau chu\u1ea9n","M\u00e1y","25KG (VND)","Jumbo (VND)","Gi\u00e1 b\u00e1n (" + modeLabel + ", " + (isUsd ? "USD" : "VND") + ")","Hoa h\u1ed3ng (" + (isUsd ? "USD" : "VND") + ")"]];

  for (var i = 0; i < DATA_PRODUCTS.length; i++) {
    var p = DATA_PRODUCTS[i];
    var price25 = "", priceJumbo = "", sellPrice = "", comm = "";
    if (priceMode === "fob") {
      price25 = getFOB25PriceVND(p, lccType);
      priceJumbo = getFOBJumboPriceVND(p, lccType);
      sellPrice = isUsd ? getFOB25PriceUSD(p, lccType) : getFOB25PriceVND(p, lccType);
    } else if (priceMode === "cif") {
      price25 = getCIF25PriceVND(p, lccType, freightUSD);
      priceJumbo = getCIFJumboPriceVND(p, lccType, freightUSD);
      sellPrice = isUsd ? getCIF25PriceUSD(p, lccType, freightUSD) : getCIF25PriceVND(p, lccType, freightUSD);
    } else {
      price25 = p.pkg25_vnd;
      priceJumbo = p.jumbo_vnd;
      sellPrice = isUsd ? p.exw_usd : p.exw_vnd;
      comm = isUsd ? p.comm_usd : p.comm_vnd;
    }
    rows.push([p.code, p.size, p.standard, p.machine, price25 || "\u2014", priceJumbo || "\u2014", sellPrice || "\u2014", comm || "\u2014"]);
  }

  var ws = XLSX.utils.aoa_to_sheet(rows);
  var wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Price");
  XLSX.writeFile(wb, fn);
}

// ====== MANAGE PANEL FUNCTIONS ======
function manageLogin() {
  var pw = document.getElementById("managePass").value;
  if (pw === managePassword) {
    document.getElementById("manageLogin").style.display = "none";
    document.getElementById("manageDashboard").classList.add("open");
    document.getElementById("manageError").style.display = "none";
    document.getElementById("mProdCnt").textContent = DATA_PRODUCTS.length;
    document.getElementById("mBagCnt").textContent = DATA_BAGS.length;
    document.getElementById("mOtherCnt").textContent = DATA_OTHERS.length;
  } else {
    document.getElementById("manageError").textContent = "\u274c Sai m\u1eadt kh\u1ea9u!";
    document.getElementById("manageError").style.display = "block";
  }
}

function downloadFile(type) {
  var fn = "", data = [];
  if (type === 0) { fn = "Gia_ban_toi_thieu.xlsx"; data = DATA_PRODUCTS; }
  else if (type === 1) { fn = "Surcharge_bao_bi.xlsx"; data = DATA_BAGS; }
  else if (type === 2) { fn = "Quy_cach_khac.xlsx"; data = DATA_OTHERS; }
  if (!data.length) return;
  var ws = XLSX.utils.json_to_sheet(data);
  var wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Data");
  XLSX.writeFile(wb, fn);
}

function downloadAsExcel() {
  var dt = new Date();
  var fn = "DT-FullData-" + dt.getFullYear() + "-" + (dt.getMonth() + 1) + "-" + dt.getDate() + ".xlsx";
  var wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(DATA_PRODUCTS), "Products");
  XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(DATA_BAGS), "Bags");
  XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(DATA_OTHERS), "Others");
  XLSX.writeFile(wb, fn);
}

function downloadAsJSON() {
  var dt = new Date();
  var fn = "DT-data-" + dt.getFullYear() + "-" + (dt.getMonth() + 1) + "-" + dt.getDate() + ".js";
  var content = "// Data exported " + dt.toISOString() + "\n";
  content += "var DATA_PRODUCTS = " + JSON.stringify(DATA_PRODUCTS, null, 2) + ";\n\n";
  content += "var DATA_BAGS = " + JSON.stringify(DATA_BAGS, null, 2) + ";\n\n";
  content += "var DATA_OTHERS = " + JSON.stringify(DATA_OTHERS, null, 2) + ";";
  var blob = new Blob([content], {type: "text/javascript"});
  var a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = fn;
  a.click();
}

// Manage file upload
(function() {
  var dropZone = document.getElementById("manageDropZone");
  var fileInput = document.getElementById("manageFileInput");
  if (!dropZone || !fileInput) return;
  dropZone.addEventListener("click", function() { fileInput.click(); });
  dropZone.addEventListener("dragover", function(e) { e.preventDefault(); dropZone.classList.add("dragover"); });
  dropZone.addEventListener("dragleave", function() { dropZone.classList.remove("dragover"); });
  dropZone.addEventListener("drop", function(e) {
    e.preventDefault();
    dropZone.classList.remove("dragover");
    if (e.dataTransfer.files.length) handleManageFile(e.dataTransfer.files[0]);
  });
  fileInput.addEventListener("change", function() {
    if (fileInput.files.length) handleManageFile(fileInput.files[0]);
  });
})();

function handleManageFile(file) {
  var status = document.getElementById("manageUploadStatus");
  if (!file.name.match(/.xlsx?$/i)) {
    status.className = "manage-status-sm err";
    status.textContent = "\u274c Ch\u1ec9 h\u1ed7 tr\u1ee3 file Excel (.xlsx)";
    return;
  }
  var reader = new FileReader();
  reader.onload = function(e) {
    try {
      var data = new Uint8Array(e.target.result);
      var wb = XLSX.read(data, {type: "array"});
      var sheets = wb.SheetNames;
      var updated = 0;
      if (sheets.indexOf("Products") >= 0) {
        var s = XLSX.utils.sheet_to_json(wb.Sheets["Products"]);
        if (s.length > 0) { DATA_PRODUCTS = s; updated++; }
      }
      if (sheets.indexOf("Bags") >= 0) {
        var s = XLSX.utils.sheet_to_json(wb.Sheets["Bags"]);
        if (s.length > 0) { DATA_BAGS = s; updated++; }
      }
      if (sheets.indexOf("Others") >= 0) {
        var s = XLSX.utils.sheet_to_json(wb.Sheets["Others"]);
        if (s.length > 0) { DATA_OTHERS = s; updated++; }
      }
      document.getElementById("mProdCnt").textContent = DATA_PRODUCTS.length;
      document.getElementById("mBagCnt").textContent = DATA_BAGS.length;
      document.getElementById("mOtherCnt").textContent = DATA_OTHERS.length;
      populateFilters();
      render();
      status.className = "manage-status-sm ok";
      status.textContent = "\u2705 \u0110\u00e3 c\u1eadp nh\u1eadt " + updated + " b\u1ea3ng d\u1eef li\u1ec7u!";
    } catch(err) {
      status.className = "manage-status-sm err";
      status.textContent = "\u274c L\u1ed7i: " + err.message;
    }
  };
  reader.readAsArrayBuffer(file);
}

// ====== PASSWORD MODAL ======
function showPwModal() {
  document.getElementById("pwModal").classList.add("open");
  document.getElementById("pwInput").value = "";
  document.getElementById("pwError").style.display = "none";
}
function closePwModal() {
  document.getElementById("pwModal").classList.remove("open");
}
function checkPassword() {
  if (document.getElementById("pwInput").value === managePassword) {
    closePwModal();
    switchTab("manage");
  } else {
    document.getElementById("pwError").style.display = "block";
  }
}
function manageFromPwModal() { checkPassword(); }

// ====== FILTER POPULATOR ======
function populateFilters() {
  var sf = document.getElementById("specFilter");
  var mf = document.getElementById("machineFilter");
  if (!sf || !mf) return;
  var specSet = {}, machSet = {};
  DATA_PRODUCTS.forEach(function(p) {
    specSet[p.standard] = true;
    machSet[p.machine] = true;
  });
  var curSpec = sf.value, curMach = mf.value;
  sf.innerHTML = '<option value="">Tất cả tiêu chuẩn</option>';
  Object.keys(specSet).sort().forEach(function(s) {
    sf.innerHTML += '<option value="' + s.replace(/"/g, '&quot;') + '">' + s + '</option>';
  });
  sf.value = curSpec;
  mf.innerHTML = '<option value="">Tất cả máy</option>';
  Object.keys(machSet).sort().forEach(function(m) {
    mf.innerHTML += '<option value="' + m.replace(/"/g, '&quot;') + '">' + m + '</option>';
  });
  mf.value = curMach;
}

// ====== RENDER BAGS TAB ======
function renderBagsTab() {
  var h = '<div class="table-wrap" style="margin-top:0"><table><thead>';
  h += '<tr><th colspan="4">Thông tin bao bì</th><th colspan="2">Giá</th></tr>';
  h += '<tr><th>Mã bao</th><th>Quy cách</th><th>Số lượng</th><th>Giá vốn</th><th>Giá bán</th><th>Lợi nhuận</th></tr>';
  h += '</thead><tbody>';
  for (var i = 0; i < DATA_BAGS.length; i++) {
    var b = DATA_BAGS[i];
    h += '<tr>';
    h += '<td><strong>' + b.code + '</strong></td>';
    h += '<td>' + b.spec + '</td>';
    h += '<td class="text-right">' + (b.qty || 0).toLocaleString() + '</td>';
    h += '<td class="text-right">' + (b.cost || 0).toLocaleString() + ' VND</td>';
    h += '<td class="text-right"><strong>' + (b.price || 0).toLocaleString() + ' VND</strong></td>';
    h += '<td class="text-right"><span class="tag-profit">' + ((b.profit || 0) * 100).toFixed(0) + '%</span></td>';
    h += '</tr>';
  }
  h += '</tbody></table></div>';
  h += '<div class="summary-bar" style="margin-top:12px">';
  h += '<div class="summary-card"><div class="lbl">Tổng loại bao</div><div class="val">' + DATA_BAGS.length + '</div></div>';
  var bag25 = DATA_BAGS.filter(function(b) { return b.spec === '25KG'; }).length;
  var bagJumbo = DATA_BAGS.filter(function(b) { return b.spec === 'Jumbo'; }).length;
  h += '<div class="summary-card"><div class="lbl">Bao 25KG</div><div class="val">' + bag25 + '</div></div>';
  h += '<div class="summary-card"><div class="lbl">Bao Jumbo</div><div class="val">' + bagJumbo + '</div></div>';
  h += '</div>';
  return h;
}

// ====== RENDER OTHERS TAB ======
function renderOthersTab() {
  var h = '<div class="table-wrap" style="margin-top:0"><table><thead>';
  h += '<tr><th>Quy cách khác</th><th>Giá vốn</th><th>Giá bán</th><th>Lợi nhuận</th></tr>';
  h += '</thead><tbody>';
  for (var i = 0; i < DATA_OTHERS.length; i++) {
    var o = DATA_OTHERS[i];
    h += '<tr>';
    h += '<td><strong>' + o.code + '</strong></td>';
    h += '<td class="text-right">' + (o.cost || 0).toLocaleString() + ' VND</td>';
    h += '<td class="text-right"><strong>' + (o.price || 0).toLocaleString() + ' VND</strong></td>';
    h += '<td class="text-right"><span class="tag-profit">' + ((o.profit || 0) * 100).toFixed(0) + '%</span></td>';
    h += '</tr>';
  }
  h += '</tbody></table></div>';
  h += '<div class="summary-bar" style="margin-top:12px">';
  h += '<div class="summary-card"><div class="lbl">Tổng quy cách</div><div class="val">' + DATA_OTHERS.length + '</div></div>';
  h += '</div>';
  return h;
}

// ====== MAIN RENDER ======
function render() {
  var container = document.getElementById("mainContainer");
  if (!container) return;
  
  // Always bump filter list in pricelist tab
  populateFilters();
  
  if (activeTab === "pricelist") {
    container.innerHTML = renderPriceTab();
  } else if (activeTab === "bags") {
    container.innerHTML = renderBagsTab();
  } else if (activeTab === "others") {
    container.innerHTML = renderOthersTab();
  } else if (activeTab === "calc") {
    container.innerHTML = renderCalcTab();
  } else if (activeTab === "manage") {
    container.innerHTML = "";
  } else {
    container.innerHTML = "";
  }
}



// ====== MISSING FUNCTIONS ======
function updateDataInfo() {
  var el = document.getElementById("dataInfo");
  if (!el) return;
  el.textContent = "📊 " + DATA_PRODUCTS.length + " SP · " + DATA_BAGS.length + " BB · " + DATA_OTHERS.length + " QC";
}

// Language switch (i18n stub - keeps layout functional)
var currentLang = "vi";
var i18nStrings = {};
function setLang(lang) {
  currentLang = lang;
  // Simple implementation - just updates visible text
  document.querySelectorAll("[data-i18n]").forEach(function(el) {
    var key = el.getAttribute("data-i18n");
    if (i18nStrings[key] && i18nStrings[key][lang]) {
      el.textContent = i18nStrings[key][lang];
    }
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach(function(el) {
    var key = el.getAttribute("data-i18n-placeholder");
    if (i18nStrings[key] && i18nStrings[key][lang]) {
      el.placeholder = i18nStrings[key][lang];
    }
  });
  document.querySelectorAll(".lang-btn").forEach(function(b) {
    b.classList.toggle("active", b.dataset.lang === lang);
  });
}

// ====== INIT ======
(function() {
  var c = document.getElementById("mainContainer");
  if (!c) return;
  populateFilters();
  updateDataInfo();
  render();
})();

currentTab="pricelist";updateDataInfo();render()