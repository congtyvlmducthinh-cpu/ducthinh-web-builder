
// Data
var DATA_PRODUCTS = [
  {"code": "H4A1", "size": "4±1 µm", "standard": "A1", "machine": "1700", "exw_vnd": 2380000, "exw_usd": 91.54, "comm_vnd": 32000, "comm_usd": 1.23, "pkg25_vnd": 2601000, "pkg25_usd": 100.04, "jumbo_vnd": 2591000, "jumbo_usd": 99.65, "exw_vnd_cn": 2380000, "exw_usd_cn": 91.54, "comm_vnd_cn": 32000, "comm_usd_cn": 1.23, "pkg25_vnd_cn": 2601000, "pkg25_usd_cn": 100.04, "jumbo_vnd_cn": 2591000, "jumbo_usd_cn": 99.65, "exw_vnd_other": 2380000, "exw_usd_other": 91.54, "comm_vnd_other": 32000, "comm_usd_other": 1.23, "pkg25_vnd_other": 2601000, "pkg25_usd_other": 100.04, "jumbo_vnd_other": 2591000, "jumbo_usd_other": 99.65},
  {"code": "H5A1", "size": "5±1 µm", "standard": "A1", "machine": "1700", "exw_vnd": 1850000, "exw_usd": 71.15, "comm_vnd": 26000, "comm_usd": 1, "pkg25_vnd": 2046000, "pkg25_usd": 78.69, "jumbo_vnd": 2061000, "jumbo_usd": 79.27, "exw_vnd_cn": 1850000, "exw_usd_cn": 71.15, "comm_vnd_cn": 26000, "comm_usd_cn": 1, "pkg25_vnd_cn": 2046000, "pkg25_usd_cn": 78.69, "jumbo_vnd_cn": 2061000, "jumbo_usd_cn": 79.27, "exw_vnd_other": 1850000, "exw_usd_other": 71.15, "comm_vnd_other": 26000, "comm_usd_other": 1, "pkg25_vnd_other": 2046000, "pkg25_usd_other": 78.69, "jumbo_vnd_other": 2061000, "jumbo_usd_other": 79.27},
  {"code": "H6A1", "size": "6±1 µm", "standard": "A1", "machine": "1700", "exw_vnd": 1470000, "exw_usd": 56.54, "comm_vnd": 21000, "comm_usd": 0.81, "pkg25_vnd": 1666000, "pkg25_usd": 64.08, "jumbo_vnd": 1681000, "jumbo_usd": 64.65, "exw_vnd_cn": 1470000, "exw_usd_cn": 56.54, "comm_vnd_cn": 21000, "comm_usd_cn": 0.81, "pkg25_vnd_cn": 1666000, "pkg25_usd_cn": 64.08, "jumbo_vnd_cn": 1681000, "jumbo_usd_cn": 64.65, "exw_vnd_other": 1470000, "exw_usd_other": 56.54, "comm_vnd_other": 21000, "comm_usd_other": 0.81, "pkg25_vnd_other": 1666000, "pkg25_usd_other": 64.08, "jumbo_vnd_other": 1681000, "jumbo_usd_other": 64.65},
  {"code": "H8A1", "size": "8±1 µm", "standard": "A1", "machine": "1700", "exw_vnd": 1060000, "exw_usd": 40.77, "comm_vnd": 15000, "comm_usd": 0.58, "pkg25_vnd": 1247000, "pkg25_usd": 47.96, "jumbo_vnd": 1208000, "jumbo_usd": 46.46, "exw_vnd_cn": 1060000, "exw_usd_cn": 40.77, "comm_vnd_cn": 15000, "comm_usd_cn": 0.58, "pkg25_vnd_cn": 1247000, "pkg25_usd_cn": 47.96, "jumbo_vnd_cn": 1208000, "jumbo_usd_cn": 46.46, "exw_vnd_other": 1090000, "exw_usd_other": 41.92, "comm_vnd_other": 16000, "comm_usd_other": 0.62, "pkg25_vnd_other": 1277000, "pkg25_usd_other": 49.12, "jumbo_vnd_other": 1238000, "jumbo_usd_other": 47.62},
  {"code": "H8RA1", "size": "8±1 µm", "standard": "A1", "machine": "1700", "exw_vnd": 1340000, "exw_usd": 51.54, "comm_vnd": 19000, "comm_usd": 0.73, "pkg25_vnd": 1527000, "pkg25_usd": 58.73, "jumbo_vnd": 1488000, "jumbo_usd": 57.23, "exw_vnd_cn": 1340000, "exw_usd_cn": 51.54, "comm_vnd_cn": 19000, "comm_usd_cn": 0.73, "pkg25_vnd_cn": 1527000, "pkg25_usd_cn": 58.73, "jumbo_vnd_cn": 1488000, "jumbo_usd_cn": 57.23, "exw_vnd_other": 1340000, "exw_usd_other": 51.54, "comm_vnd_other": 19000, "comm_usd_other": 0.73, "pkg25_vnd_other": 1527000, "pkg25_usd_other": 58.73, "jumbo_vnd_other": 1488000, "jumbo_usd_other": 57.23},
  {"code": "H10A1", "size": "10±1 µm", "standard": "A1", "machine": "1700", "exw_vnd": 920000, "exw_usd": 35.38, "comm_vnd": 13000, "comm_usd": 0.5, "pkg25_vnd": 1107000, "pkg25_usd": 42.58, "jumbo_vnd": 1055000, "jumbo_usd": 40.58, "exw_vnd_cn": 920000, "exw_usd_cn": 35.38, "comm_vnd_cn": 13000, "comm_usd_cn": 0.5, "pkg25_vnd_cn": 1107000, "pkg25_usd_cn": 42.58, "jumbo_vnd_cn": 1055000, "jumbo_usd_cn": 40.58, "exw_vnd_other": 920000, "exw_usd_other": 35.38, "comm_vnd_other": 13000, "comm_usd_other": 0.5, "pkg25_vnd_other": 1107000, "pkg25_usd_other": 42.58, "jumbo_vnd_other": 1055000, "jumbo_usd_other": 40.58},
  {"code": "H12A1", "size": "12±1 µm", "standard": "A1", "machine": "1700", "exw_vnd": 900000, "exw_usd": 34.62, "comm_vnd": 13000, "comm_usd": 0.5, "pkg25_vnd": 1087000, "pkg25_usd": 41.81, "jumbo_vnd": 1024000, "jumbo_usd": 39.38, "exw_vnd_cn": 900000, "exw_usd_cn": 34.62, "comm_vnd_cn": 13000, "comm_usd_cn": 0.5, "pkg25_vnd_cn": 1087000, "pkg25_usd_cn": 41.81, "jumbo_vnd_cn": 1024000, "jumbo_usd_cn": 39.38, "exw_vnd_other": 900000, "exw_usd_other": 34.62, "comm_vnd_other": 13000, "comm_usd_other": 0.5, "pkg25_vnd_other": 1087000, "pkg25_usd_other": 41.81, "jumbo_vnd_other": 1024000, "jumbo_usd_other": 39.38},
  {"code": "H15A1", "size": "15±1 µm", "standard": "A1", "machine": "1700", "exw_vnd": 820000, "exw_usd": 31.54, "comm_vnd": 12000, "comm_usd": 0.46, "pkg25_vnd": 998000, "pkg25_usd": 38.38, "jumbo_vnd": 939000, "jumbo_usd": 36.12, "exw_vnd_cn": 820000, "exw_usd_cn": 31.54, "comm_vnd_cn": 12000, "comm_usd_cn": 0.46, "pkg25_vnd_cn": 998000, "pkg25_usd_cn": 38.38, "jumbo_vnd_cn": 939000, "jumbo_usd_cn": 36.12, "exw_vnd_other": 820000, "exw_usd_other": 31.54, "comm_vnd_other": 12000, "comm_usd_other": 0.46, "pkg25_vnd_other": 998000, "pkg25_usd_other": 38.38, "jumbo_vnd_other": 939000, "jumbo_usd_other": 36.12},
  {"code": "H17A1", "size": "17±1 µm", "standard": "A1", "machine": "1700", "exw_vnd": 810000, "exw_usd": 31.15, "comm_vnd": 12000, "comm_usd": 0.46, "pkg25_vnd": 988000, "pkg25_usd": 38, "jumbo_vnd": 929000, "jumbo_usd": 35.73, "exw_vnd_cn": 810000, "exw_usd_cn": 31.15, "comm_vnd_cn": 12000, "comm_usd_cn": 0.46, "pkg25_vnd_cn": 988000, "pkg25_usd_cn": 38, "jumbo_vnd_cn": 929000, "jumbo_usd_cn": 35.73, "exw_vnd_other": 810000, "exw_usd_other": 31.15, "comm_vnd_other": 12000, "comm_usd_other": 0.46, "pkg25_vnd_other": 988000, "pkg25_usd_other": 38, "jumbo_vnd_other": 929000, "jumbo_usd_other": 35.73},
  {"code": "H20A1", "size": "20±2 µm", "standard": "A1", "machine": "1700", "exw_vnd": 790000, "exw_usd": 30.38, "comm_vnd": 12000, "comm_usd": 0.46, "pkg25_vnd": 968000, "pkg25_usd": 37.23, "jumbo_vnd": 900000, "jumbo_usd": 34.62, "exw_vnd_cn": 790000, "exw_usd_cn": 30.38, "comm_vnd_cn": 12000, "comm_usd_cn": 0.46, "pkg25_vnd_cn": 968000, "pkg25_usd_cn": 37.23, "jumbo_vnd_cn": 900000, "jumbo_usd_cn": 34.62, "exw_vnd_other": 790000, "exw_usd_other": 30.38, "comm_vnd_other": 12000, "comm_usd_other": 0.46, "pkg25_vnd_other": 968000, "pkg25_usd_other": 37.23, "jumbo_vnd_other": 900000, "jumbo_usd_other": 34.62},
  {"code": "H25A1", "size": "25±2 µm", "standard": "A1", "machine": "1700", "exw_vnd": 750000, "exw_usd": 28.85, "comm_vnd": 11000, "comm_usd": 0.42, "pkg25_vnd": 928000, "pkg25_usd": 35.69, "jumbo_vnd": 860000, "jumbo_usd": 33.08, "exw_vnd_cn": 750000, "exw_usd_cn": 28.85, "comm_vnd_cn": 11000, "comm_usd_cn": 0.42, "pkg25_vnd_cn": 928000, "pkg25_usd_cn": 35.69, "jumbo_vnd_cn": 860000, "jumbo_usd_cn": 33.08, "exw_vnd_other": 750000, "exw_usd_other": 28.85, "comm_vnd_other": 11000, "comm_usd_other": 0.42, "pkg25_vnd_other": 928000, "pkg25_usd_other": 35.69, "jumbo_vnd_other": 860000, "jumbo_usd_other": 33.08},
  {"code": "H30A1", "size": "30±3 µm", "standard": "A1", "machine": "1700", "exw_vnd": 700000, "exw_usd": 26.92, "comm_vnd": 11000, "comm_usd": 0.42, "pkg25_vnd": 878000, "pkg25_usd": 33.77, "jumbo_vnd": 810000, "jumbo_usd": 31.15, "exw_vnd_cn": 700000, "exw_usd_cn": 26.92, "comm_vnd_cn": 11000, "comm_usd_cn": 0.42, "pkg25_vnd_cn": 878000, "pkg25_usd_cn": 33.77, "jumbo_vnd_cn": 810000, "jumbo_usd_cn": 31.15, "exw_vnd_other": 700000, "exw_usd_other": 26.92, "comm_vnd_other": 11000, "comm_usd_other": 0.42, "pkg25_vnd_other": 878000, "pkg25_usd_other": 33.77, "jumbo_vnd_other": 810000, "jumbo_usd_other": 31.15},
  {"code": "F15A1", "size": "15±1 µm", "standard": "A1", "machine": "318", "exw_vnd": 750000, "exw_usd": 28.85, "comm_vnd": 11000, "comm_usd": 0.42, "pkg25_vnd": 928000, "pkg25_usd": 35.69, "jumbo_vnd": 860000, "jumbo_usd": 33.08, "exw_vnd_cn": 750000, "exw_usd_cn": 28.85, "comm_vnd_cn": 11000, "comm_usd_cn": 0.42, "pkg25_vnd_cn": 928000, "pkg25_usd_cn": 35.69, "jumbo_vnd_cn": 860000, "jumbo_usd_cn": 33.08, "exw_vnd_other": 770000, "exw_usd_other": 29.62, "comm_vnd_other": 12000, "comm_usd_other": 0.46, "pkg25_vnd_other": 948000, "pkg25_usd_other": 36.46, "jumbo_vnd_other": 880000, "jumbo_usd_other": 33.85},
  {"code": "F17A1", "size": "17±1 µm", "standard": "A1", "machine": "318", "exw_vnd": 740000, "exw_usd": 28.46, "comm_vnd": 11000, "comm_usd": 0.42, "pkg25_vnd": 918000, "pkg25_usd": 35.31, "jumbo_vnd": 859000, "jumbo_usd": 33.04, "exw_vnd_cn": 740000, "exw_usd_cn": 28.46, "comm_vnd_cn": 11000, "comm_usd_cn": 0.42, "pkg25_vnd_cn": 918000, "pkg25_usd_cn": 35.31, "jumbo_vnd_cn": 859000, "jumbo_usd_cn": 33.04, "exw_vnd_other": 770000, "exw_usd_other": 29.62, "comm_vnd_other": 12000, "comm_usd_other": 0.46, "pkg25_vnd_other": 948000, "pkg25_usd_other": 36.46, "jumbo_vnd_other": 889000, "jumbo_usd_other": 34.19},
  {"code": "F20A1", "size": "20±2 µm", "standard": "A1", "machine": "318", "exw_vnd": 690000, "exw_usd": 26.54, "comm_vnd": 10000, "comm_usd": 0.38, "pkg25_vnd": 868000, "pkg25_usd": 33.38, "jumbo_vnd": 800000, "jumbo_usd": 30.77, "exw_vnd_cn": 690000, "exw_usd_cn": 26.54, "comm_vnd_cn": 10000, "comm_usd_cn": 0.38, "pkg25_vnd_cn": 868000, "pkg25_usd_cn": 33.38, "jumbo_vnd_cn": 800000, "jumbo_usd_cn": 30.77, "exw_vnd_other": 700000, "exw_usd_other": 26.92, "comm_vnd_other": 11000, "comm_usd_other": 0.42, "pkg25_vnd_other": 878000, "pkg25_usd_other": 33.77, "jumbo_vnd_other": 810000, "jumbo_usd_other": 31.15},
  {"code": "F25A1", "size": "25±2 µm", "standard": "A1", "machine": "318", "exw_vnd": 660000, "exw_usd": 25.38, "comm_vnd": 10000, "comm_usd": 0.38, "pkg25_vnd": 838000, "pkg25_usd": 32.23, "jumbo_vnd": 770000, "jumbo_usd": 29.62, "exw_vnd_cn": 660000, "exw_usd_cn": 25.38, "comm_vnd_cn": 10000, "comm_usd_cn": 0.38, "pkg25_vnd_cn": 838000, "pkg25_usd_cn": 32.23, "jumbo_vnd_cn": 770000, "jumbo_usd_cn": 29.62, "exw_vnd_other": 670000, "exw_usd_other": 25.77, "comm_vnd_other": 10000, "comm_usd_other": 0.38, "pkg25_vnd_other": 848000, "pkg25_usd_other": 32.62, "jumbo_vnd_other": 780000, "jumbo_usd_other": 30},
  {"code": "F30A1", "size": "30±3 µm", "standard": "A1", "machine": "318", "exw_vnd": 630000, "exw_usd": 24.23, "comm_vnd": 10000, "comm_usd": 0.38, "pkg25_vnd": 808000, "pkg25_usd": 31.08, "jumbo_vnd": 740000, "jumbo_usd": 28.46, "exw_vnd_cn": 630000, "exw_usd_cn": 24.23, "comm_vnd_cn": 10000, "comm_usd_cn": 0.38, "pkg25_vnd_cn": 808000, "pkg25_usd_cn": 31.08, "jumbo_vnd_cn": 740000, "jumbo_usd_cn": 28.46, "exw_vnd_other": 650000, "exw_usd_other": 25, "comm_vnd_other": 10000, "comm_usd_other": 0.38, "pkg25_vnd_other": 828000, "pkg25_usd_other": 31.85, "jumbo_vnd_other": 760000, "jumbo_usd_other": 29.23},
  {"code": "F35A1", "size": "35±3 µm", "standard": "A1", "machine": "318", "exw_vnd": 620000, "exw_usd": 23.85, "comm_vnd": 10000, "comm_usd": 0.38, "pkg25_vnd": 798000, "pkg25_usd": 30.69, "jumbo_vnd": 730000, "jumbo_usd": 28.08, "exw_vnd_cn": 620000, "exw_usd_cn": 23.85, "comm_vnd_cn": 10000, "comm_usd_cn": 0.38, "pkg25_vnd_cn": 798000, "pkg25_usd_cn": 30.69, "jumbo_vnd_cn": 730000, "jumbo_usd_cn": 28.08, "exw_vnd_other": 640000, "exw_usd_other": 24.62, "comm_vnd_other": 10000, "comm_usd_other": 0.38, "pkg25_vnd_other": 818000, "pkg25_usd_other": 31.46, "jumbo_vnd_other": 750000, "jumbo_usd_other": 28.85},
  {"code": "F40A1", "size": "40±3 µm", "standard": "A1", "machine": "318", "exw_vnd": 740000, "exw_usd": 28.46, "comm_vnd": 11000, "comm_usd": 0.42, "pkg25_vnd": 918000, "pkg25_usd": 35.31, "jumbo_vnd": 850000, "jumbo_usd": 32.69, "exw_vnd_cn": 740000, "exw_usd_cn": 28.46, "comm_vnd_cn": 11000, "comm_usd_cn": 0.42, "pkg25_vnd_cn": 918000, "pkg25_usd_cn": 35.31, "jumbo_vnd_cn": 850000, "jumbo_usd_cn": 32.69, "exw_vnd_other": 770000, "exw_usd_other": 29.62, "comm_vnd_other": 12000, "comm_usd_other": 0.46, "pkg25_vnd_other": 948000, "pkg25_usd_other": 36.46, "jumbo_vnd_other": 880000, "jumbo_usd_other": 33.85},
  {"code": "F45A1", "size": "45±3 µm", "standard": "A1", "machine": "318", "exw_vnd": 590000, "exw_usd": 22.69, "comm_vnd": 9000, "comm_usd": 0.35, "pkg25_vnd": 768000, "pkg25_usd": 29.54, "jumbo_vnd": 700000, "jumbo_usd": 26.92, "exw_vnd_cn": 590000, "exw_usd_cn": 22.69, "comm_vnd_cn": 9000, "comm_usd_cn": 0.35, "pkg25_vnd_cn": 768000, "pkg25_usd_cn": 29.54, "jumbo_vnd_cn": 700000, "jumbo_usd_cn": 26.92, "exw_vnd_other": 600000, "exw_usd_other": 23.08, "comm_vnd_other": 9000, "comm_usd_other": 0.35, "pkg25_vnd_other": 778000, "pkg25_usd_other": 29.92, "jumbo_vnd_other": 710000, "jumbo_usd_other": 27.31},
  {"code": "F15A2", "size": "15±1 µm", "standard": "A2-", "machine": "318", "exw_vnd": 530000, "exw_usd": 20.38, "comm_vnd": 8000, "comm_usd": 0.31, "pkg25_vnd": 708000, "pkg25_usd": 27.23, "jumbo_vnd": 640000, "jumbo_usd": 24.62, "exw_vnd_cn": 530000, "exw_usd_cn": 20.38, "comm_vnd_cn": 8000, "comm_usd_cn": 0.31, "pkg25_vnd_cn": 708000, "pkg25_usd_cn": 27.23, "jumbo_vnd_cn": 640000, "jumbo_usd_cn": 24.62, "exw_vnd_other": 550000, "exw_usd_other": 21.15, "comm_vnd_other": 9000, "comm_usd_other": 0.35, "pkg25_vnd_other": 728000, "pkg25_usd_other": 28, "jumbo_vnd_other": 660000, "jumbo_usd_other": 25.38},
  {"code": "F17A2", "size": "17±1 µm", "standard": "A2-", "machine": "318", "exw_vnd": 490000, "exw_usd": 18.85, "comm_vnd": 8000, "comm_usd": 0.31, "pkg25_vnd": 668000, "pkg25_usd": 25.69, "jumbo_vnd": 609000, "jumbo_usd": 23.42, "exw_vnd_cn": 490000, "exw_usd_cn": 18.85, "comm_vnd_cn": 8000, "comm_usd_cn": 0.31, "pkg25_vnd_cn": 668000, "pkg25_usd_cn": 25.69, "jumbo_vnd_cn": 609000, "jumbo_usd_cn": 23.42, "exw_vnd_other": 500000, "exw_usd_other": 19.23, "comm_vnd_other": 8000, "comm_usd_other": 0.31, "pkg25_vnd_other": 678000, "pkg25_usd_other": 26.08, "jumbo_vnd_other": 619000, "jumbo_usd_other": 23.81},
  {"code": "F20A2", "size": "20±2 µm", "standard": "A2-", "machine": "318", "exw_vnd": 460000, "exw_usd": 17.69, "comm_vnd": 7000, "comm_usd": 0.27, "pkg25_vnd": 638000, "pkg25_usd": 24.54, "jumbo_vnd": 570000, "jumbo_usd": 21.92, "exw_vnd_cn": 460000, "exw_usd_cn": 17.69, "comm_vnd_cn": 7000, "comm_usd_cn": 0.27, "pkg25_vnd_cn": 638000, "pkg25_usd_cn": 24.54, "jumbo_vnd_cn": 570000, "jumbo_usd_cn": 21.92, "exw_vnd_other": 480000, "exw_usd_other": 18.46, "comm_vnd_other": 8000, "comm_usd_other": 0.31, "pkg25_vnd_other": 658000, "pkg25_usd_other": 25.31, "jumbo_vnd_other": 590000, "jumbo_usd_other": 22.69},
  {"code": "F25A2", "size": "25±2 µm", "standard": "A2-", "machine": "318", "exw_vnd": 430000, "exw_usd": 16.54, "comm_vnd": 7000, "comm_usd": 0.27, "pkg25_vnd": 608000, "pkg25_usd": 23.38, "jumbo_vnd": 540000, "jumbo_usd": 20.77, "exw_vnd_cn": 430000, "exw_usd_cn": 16.54, "comm_vnd_cn": 7000, "comm_usd_cn": 0.27, "pkg25_vnd_cn": 608000, "pkg25_usd_cn": 23.38, "jumbo_vnd_cn": 540000, "jumbo_usd_cn": 20.77, "exw_vnd_other": 450000, "exw_usd_other": 17.31, "comm_vnd_other": 7000, "comm_usd_other": 0.27, "pkg25_vnd_other": 628000, "pkg25_usd_other": 24.15, "jumbo_vnd_other": 560000, "jumbo_usd_other": 21.54},
  {"code": "F30A2", "size": "30±3 µm", "standard": "A2-", "machine": "318", "exw_vnd": 410000, "exw_usd": 15.77, "comm_vnd": 7000, "comm_usd": 0.27, "pkg25_vnd": 588000, "pkg25_usd": 22.62, "jumbo_vnd": 520000, "jumbo_usd": 20, "exw_vnd_cn": 410000, "exw_usd_cn": 15.77, "comm_vnd_cn": 7000, "comm_usd_cn": 0.27, "pkg25_vnd_cn": 588000, "pkg25_usd_cn": 22.62, "jumbo_vnd_cn": 520000, "jumbo_usd_cn": 20, "exw_vnd_other": 420000, "exw_usd_other": 16.15, "comm_vnd_other": 7000, "comm_usd_other": 0.27, "pkg25_vnd_other": 598000, "pkg25_usd_other": 23, "jumbo_vnd_other": 530000, "jumbo_usd_other": 20.38},
  {"code": "F35A2", "size": "35±3 µm", "standard": "A2-", "machine": "318", "exw_vnd": 400000, "exw_usd": 15.38, "comm_vnd": 7000, "comm_usd": 0.27, "pkg25_vnd": 578000, "pkg25_usd": 22.23, "jumbo_vnd": 510000, "jumbo_usd": 19.62, "exw_vnd_cn": 400000, "exw_usd_cn": 15.38, "comm_vnd_cn": 7000, "comm_usd_cn": 0.27, "pkg25_vnd_cn": 578000, "pkg25_usd_cn": 22.23, "jumbo_vnd_cn": 510000, "jumbo_usd_cn": 19.62, "exw_vnd_other": 410000, "exw_usd_other": 15.77, "comm_vnd_other": 7000, "comm_usd_other": 0.27, "pkg25_vnd_other": 588000, "pkg25_usd_other": 22.62, "jumbo_vnd_other": 520000, "jumbo_usd_other": 20},
  {"code": "F45A2", "size": "45±3 µm", "standard": "A2-", "machine": "318", "exw_vnd": 360000, "exw_usd": 13.85, "comm_vnd": 6000, "comm_usd": 0.23, "pkg25_vnd": 538000, "pkg25_usd": 20.69, "jumbo_vnd": 470000, "jumbo_usd": 18.08, "exw_vnd_cn": 360000, "exw_usd_cn": 13.85, "comm_vnd_cn": 6000, "comm_usd_cn": 0.23, "pkg25_vnd_cn": 538000, "pkg25_usd_cn": 20.69, "jumbo_vnd_cn": 470000, "jumbo_usd_cn": 18.08, "exw_vnd_other": 370000, "exw_usd_other": 14.23, "comm_vnd_other": 6000, "comm_usd_other": 0.23, "pkg25_vnd_other": 548000, "pkg25_usd_other": 21.08, "jumbo_vnd_other": 480000, "jumbo_usd_other": 18.46},
  {"code": "F15A2", "size": "15±1 µm", "standard": "A2", "machine": "318", "exw_vnd": 600000, "exw_usd": 23.08, "comm_vnd": 9000, "comm_usd": 0.35, "pkg25_vnd": 778000, "pkg25_usd": 29.92, "jumbo_vnd": 710000, "jumbo_usd": 27.31, "exw_vnd_cn": 600000, "exw_usd_cn": 23.08, "comm_vnd_cn": 9000, "comm_usd_cn": 0.35, "pkg25_vnd_cn": 778000, "pkg25_usd_cn": 29.92, "jumbo_vnd_cn": 710000, "jumbo_usd_cn": 27.31, "exw_vnd_other": 610000, "exw_usd_other": 23.46, "comm_vnd_other": 9000, "comm_usd_other": 0.35, "pkg25_vnd_other": 788000, "pkg25_usd_other": 30.31, "jumbo_vnd_other": 720000, "jumbo_usd_other": 27.69},
  {"code": "F17A2", "size": "17±1 µm", "standard": "A2", "machine": "318", "exw_vnd": 550000, "exw_usd": 21.15, "comm_vnd": 9000, "comm_usd": 0.35, "pkg25_vnd": 728000, "pkg25_usd": 28, "jumbo_vnd": 660000, "jumbo_usd": 25.38, "exw_vnd_cn": 550000, "exw_usd_cn": 21.15, "comm_vnd_cn": 9000, "comm_usd_cn": 0.35, "pkg25_vnd_cn": 728000, "pkg25_usd_cn": 28, "jumbo_vnd_cn": 660000, "jumbo_usd_cn": 25.38, "exw_vnd_other": 560000, "exw_usd_other": 21.54, "comm_vnd_other": 9000, "comm_usd_other": 0.35, "pkg25_vnd_other": 738000, "pkg25_usd_other": 28.38, "jumbo_vnd_other": 670000, "jumbo_usd_other": 25.77},
  {"code": "F20A2", "size": "20±2 µm", "standard": "A2", "machine": "318", "exw_vnd": 530000, "exw_usd": 20.38, "comm_vnd": 8000, "comm_usd": 0.31, "pkg25_vnd": 708000, "pkg25_usd": 27.23, "jumbo_vnd": 649000, "jumbo_usd": 24.96, "exw_vnd_cn": 530000, "exw_usd_cn": 20.38, "comm_vnd_cn": 8000, "comm_usd_cn": 0.31, "pkg25_vnd_cn": 708000, "pkg25_usd_cn": 27.23, "jumbo_vnd_cn": 649000, "jumbo_usd_cn": 24.96, "exw_vnd_other": 540000, "exw_usd_other": 20.77, "comm_vnd_other": 9000, "comm_usd_other": 0.35, "pkg25_vnd_other": 718000, "pkg25_usd_other": 27.62, "jumbo_vnd_other": 659000, "jumbo_usd_other": 25.35},
  {"code": "F25A2", "size": "25±2 µm", "standard": "A2", "machine": "318", "exw_vnd": 500000, "exw_usd": 19.23, "comm_vnd": 8000, "comm_usd": 0.31, "pkg25_vnd": 678000, "pkg25_usd": 26.08, "jumbo_vnd": 610000, "jumbo_usd": 23.46, "exw_vnd_cn": 500000, "exw_usd_cn": 19.23, "comm_vnd_cn": 8000, "comm_usd_cn": 0.31, "pkg25_vnd_cn": 678000, "pkg25_usd_cn": 26.08, "jumbo_vnd_cn": 610000, "jumbo_usd_cn": 23.46, "exw_vnd_other": 510000, "exw_usd_other": 19.62, "comm_vnd_other": 8000, "comm_usd_other": 0.31, "pkg25_vnd_other": 688000, "pkg25_usd_other": 26.46, "jumbo_vnd_other": 620000, "jumbo_usd_other": 23.85},
  {"code": "F30A2", "size": "30±3 µm", "standard": "A2", "machine": "318", "exw_vnd": 470000, "exw_usd": 18.08, "comm_vnd": 8000, "comm_usd": 0.31, "pkg25_vnd": 648000, "pkg25_usd": 24.92, "jumbo_vnd": 580000, "jumbo_usd": 22.31, "exw_vnd_cn": 470000, "exw_usd_cn": 18.08, "comm_vnd_cn": 8000, "comm_usd_cn": 0.31, "pkg25_vnd_cn": 648000, "pkg25_usd_cn": 24.92, "jumbo_vnd_cn": 580000, "jumbo_usd_cn": 22.31, "exw_vnd_other": 490000, "exw_usd_other": 18.85, "comm_vnd_other": 8000, "comm_usd_other": 0.31, "pkg25_vnd_other": 668000, "pkg25_usd_other": 25.69, "jumbo_vnd_other": 600000, "jumbo_usd_other": 23.08},
  {"code": "K45A2", "size": "45±3 µm", "standard": "A2-", "machine": "1500", "exw_vnd": 350000, "exw_usd": 13.46, "comm_vnd": 6000, "comm_usd": 0.23, "pkg25_vnd": 528000, "pkg25_usd": 20.31, "jumbo_vnd": 460000, "jumbo_usd": 17.69, "exw_vnd_cn": 350000, "exw_usd_cn": 13.46, "comm_vnd_cn": 6000, "comm_usd_cn": 0.23, "pkg25_vnd_cn": 528000, "pkg25_usd_cn": 20.31, "jumbo_vnd_cn": 460000, "jumbo_usd_cn": 17.69, "exw_vnd_other": 350000, "exw_usd_other": 13.46, "comm_vnd_other": 6000, "comm_usd_other": 0.23, "pkg25_vnd_other": 528000, "pkg25_usd_other": 20.31, "jumbo_vnd_other": 460000, "jumbo_usd_other": 17.69},
  {"code": "K65A2", "size": "65±3 µm", "standard": "A2-", "machine": "1500", "exw_vnd": 330000, "exw_usd": 12.69, "comm_vnd": 6000, "comm_usd": 0.23, "pkg25_vnd": 508000, "pkg25_usd": 19.54, "jumbo_vnd": 440000, "jumbo_usd": 16.92, "exw_vnd_cn": 330000, "exw_usd_cn": 12.69, "comm_vnd_cn": 6000, "comm_usd_cn": 0.23, "pkg25_vnd_cn": 508000, "pkg25_usd_cn": 19.54, "jumbo_vnd_cn": 440000, "jumbo_usd_cn": 16.92, "exw_vnd_other": 330000, "exw_usd_other": 12.69, "comm_vnd_other": 6000, "comm_usd_other": 0.23, "pkg25_vnd_other": 508000, "pkg25_usd_other": 19.54, "jumbo_vnd_other": 440000, "jumbo_usd_other": 16.92},
  {"code": "K45A3", "size": "45±3 µm", "standard": "A3", "machine": "1500", "exw_vnd": 260000, "exw_usd": 10, "comm_vnd": 5000, "comm_usd": 0.19, "pkg25_vnd": 438000, "pkg25_usd": 16.85, "jumbo_vnd": 370000, "jumbo_usd": 14.23, "exw_vnd_cn": 260000, "exw_usd_cn": 10, "comm_vnd_cn": 5000, "comm_usd_cn": 0.19, "pkg25_vnd_cn": 438000, "pkg25_usd_cn": 16.85, "jumbo_vnd_cn": 370000, "jumbo_usd_cn": 14.23, "exw_vnd_other": 260000, "exw_usd_other": 10, "comm_vnd_other": 5000, "comm_usd_other": 0.19, "pkg25_vnd_other": 438000, "pkg25_usd_other": 16.85, "jumbo_vnd_other": 370000, "jumbo_usd_other": 14.23},
  {"code": "K65A3", "size": "65±3 µm", "standard": "A3", "machine": "1500", "exw_vnd": 240000, "exw_usd": 9.23, "comm_vnd": 5000, "comm_usd": 0.19, "pkg25_vnd": 418000, "pkg25_usd": 16.08, "jumbo_vnd": 350000, "jumbo_usd": 13.46, "exw_vnd_cn": 240000, "exw_usd_cn": 9.23, "comm_vnd_cn": 5000, "comm_usd_cn": 0.19, "pkg25_vnd_cn": 418000, "pkg25_usd_cn": 16.08, "jumbo_vnd_cn": 350000, "jumbo_usd_cn": 13.46, "exw_vnd_other": 240000, "exw_usd_other": 9.23, "comm_vnd_other": 5000, "comm_usd_other": 0.19, "pkg25_vnd_other": 418000, "pkg25_usd_other": 16.08, "jumbo_vnd_other": 350000, "jumbo_usd_other": 13.46},
  {"code": "E80A2", "size": "80±3 µm", "standard": "A2", "machine": "1300", "exw_vnd": 770000, "exw_usd": 29.62, "comm_vnd": 12000, "comm_usd": 0.46, "pkg25_vnd": 880000, "pkg25_usd": 33.85, "jumbo_vnd": 880000, "jumbo_usd": 33.85, "exw_vnd_cn": 770000, "exw_usd_cn": 29.62, "comm_vnd_cn": 12000, "comm_usd_cn": 0.46, "pkg25_vnd_cn": 880000, "pkg25_usd_cn": 33.85, "jumbo_vnd_cn": 880000, "jumbo_usd_cn": 33.85, "exw_vnd_other": 770000, "exw_usd_other": 29.62, "comm_vnd_other": 12000, "comm_usd_other": 0.46, "pkg25_vnd_other": 880000, "pkg25_usd_other": 33.85, "jumbo_vnd_other": 880000, "jumbo_usd_other": 33.85},
  {"code": "E125A1", "size": "70±3 µm", "standard": "A1", "machine": "1300", "exw_vnd": 1150000, "exw_usd": 44.23, "comm_vnd": 16000, "comm_usd": 0.62, "pkg25_vnd": 1260000, "pkg25_usd": 48.46, "jumbo_vnd": 1260000, "jumbo_usd": 48.46, "exw_vnd_cn": 1150000, "exw_usd_cn": 44.23, "comm_vnd_cn": 16000, "comm_usd_cn": 0.62, "pkg25_vnd_cn": 1260000, "pkg25_usd_cn": 48.46, "jumbo_vnd_cn": 1260000, "jumbo_usd_cn": 48.46, "exw_vnd_other": 1150000, "exw_usd_other": 44.23, "comm_vnd_other": 16000, "comm_usd_other": 0.62, "pkg25_vnd_other": 1260000, "pkg25_usd_other": 48.46, "jumbo_vnd_other": 1260000, "jumbo_usd_other": 48.46},
  {"code": "E70A1", "size": "70±3 µm", "standard": "A1", "machine": "1300", "exw_vnd": 1180000, "exw_usd": 45.38, "comm_vnd": 17000, "comm_usd": 0.65, "pkg25_vnd": 1290000, "pkg25_usd": 49.62, "jumbo_vnd": 1290000, "jumbo_usd": 49.62, "exw_vnd_cn": 1180000, "exw_usd_cn": 45.38, "comm_vnd_cn": 17000, "comm_usd_cn": 0.65, "pkg25_vnd_cn": 1290000, "pkg25_usd_cn": 49.62, "jumbo_vnd_cn": 1290000, "jumbo_usd_cn": 49.62, "exw_vnd_other": 1180000, "exw_usd_other": 45.38, "comm_vnd_other": 17000, "comm_usd_other": 0.65, "pkg25_vnd_other": 1290000, "pkg25_usd_other": 49.62, "jumbo_vnd_other": 1290000, "jumbo_usd_other": 49.62},
  {"code": "S55A1", "size": "55 Mesh", "standard": "A1", "machine": "Sand", "exw_vnd": 900000, "exw_usd": 34.62, "comm_vnd": 13000, "comm_usd": 0.5, "pkg25_vnd": 1010000, "pkg25_usd": 38.85, "jumbo_vnd": 1010000, "jumbo_usd": 38.85, "exw_vnd_cn": 900000, "exw_usd_cn": 34.62, "comm_vnd_cn": 13000, "comm_usd_cn": 0.5, "pkg25_vnd_cn": 1010000, "pkg25_usd_cn": 38.85, "jumbo_vnd_cn": 1010000, "jumbo_usd_cn": 38.85, "exw_vnd_other": 920000, "exw_usd_other": 35.38, "comm_vnd_other": 13000, "comm_usd_other": 0.5, "pkg25_vnd_other": 1030000, "pkg25_usd_other": 39.62, "jumbo_vnd_other": 1030000, "jumbo_usd_other": 39.62},
  {"code": "S30A1", "size": "30 Mesh", "standard": "A1", "machine": "Sand", "exw_vnd": 900000, "exw_usd": 34.62, "comm_vnd": 13000, "comm_usd": 0.5, "pkg25_vnd": 1010000, "pkg25_usd": 38.85, "jumbo_vnd": 1010000, "jumbo_usd": 38.85, "exw_vnd_cn": 900000, "exw_usd_cn": 34.62, "comm_vnd_cn": 13000, "comm_usd_cn": 0.5, "pkg25_vnd_cn": 1010000, "pkg25_usd_cn": 38.85, "jumbo_vnd_cn": 1010000, "jumbo_usd_cn": 38.85, "exw_vnd_other": 920000, "exw_usd_other": 35.38, "comm_vnd_other": 13000, "comm_usd_other": 0.5, "pkg25_vnd_other": 1030000, "pkg25_usd_other": 39.62, "jumbo_vnd_other": 1030000, "jumbo_usd_other": 39.62},
  {"code": "S40A1", "size": "40 Mesh", "standard": "A1", "machine": "Sand", "exw_vnd": 900000, "exw_usd": 34.62, "comm_vnd": 13000, "comm_usd": 0.5, "pkg25_vnd": 1010000, "pkg25_usd": 38.85, "jumbo_vnd": 1010000, "jumbo_usd": 38.85, "exw_vnd_cn": 900000, "exw_usd_cn": 34.62, "comm_vnd_cn": 13000, "comm_usd_cn": 0.5, "pkg25_vnd_cn": 1010000, "pkg25_usd_cn": 38.85, "jumbo_vnd_cn": 1010000, "jumbo_usd_cn": 38.85, "exw_vnd_other": 920000, "exw_usd_other": 35.38, "comm_vnd_other": 13000, "comm_usd_other": 0.5, "pkg25_vnd_other": 1030000, "pkg25_usd_other": 39.62, "jumbo_vnd_other": 1030000, "jumbo_usd_other": 39.62},
  {"code": "S20A1", "size": "20 Mesh", "standard": "A1", "machine": "Sand", "exw_vnd": 950000, "exw_usd": 36.54, "comm_vnd": 14000, "comm_usd": 0.54, "pkg25_vnd": 1060000, "pkg25_usd": 40.77, "jumbo_vnd": 1060000, "jumbo_usd": 40.77, "exw_vnd_cn": 950000, "exw_usd_cn": 36.54, "comm_vnd_cn": 14000, "comm_usd_cn": 0.54, "pkg25_vnd_cn": 1060000, "pkg25_usd_cn": 40.77, "jumbo_vnd_cn": 1060000, "jumbo_usd_cn": 40.77, "exw_vnd_other": 970000, "exw_usd_other": 37.31, "comm_vnd_other": 14000, "comm_usd_other": 0.54, "pkg25_vnd_other": 1080000, "pkg25_usd_other": 41.54, "jumbo_vnd_other": 1080000, "jumbo_usd_other": 41.54},
  {"code": "S16A1", "size": "16 Mesh", "standard": "A1", "machine": "Sand", "exw_vnd": 1090000, "exw_usd": 41.92, "comm_vnd": 16000, "comm_usd": 0.62, "pkg25_vnd": 1200000, "pkg25_usd": 46.15, "jumbo_vnd": 1200000, "jumbo_usd": 46.15, "exw_vnd_cn": 1090000, "exw_usd_cn": 41.92, "comm_vnd_cn": 16000, "comm_usd_cn": 0.62, "pkg25_vnd_cn": 1200000, "pkg25_usd_cn": 46.15, "jumbo_vnd_cn": 1200000, "jumbo_usd_cn": 46.15, "exw_vnd_other": 1120000, "exw_usd_other": 43.08, "comm_vnd_other": 16000, "comm_usd_other": 0.62, "pkg25_vnd_other": 1230000, "pkg25_usd_other": 47.31, "jumbo_vnd_other": 1230000, "jumbo_usd_other": 47.31},
  {"code": "S8A1", "size": "8 Mesh", "standard": "A1", "machine": "Sand", "exw_vnd": 1270000, "exw_usd": 48.85, "comm_vnd": 18000, "comm_usd": 0.69, "pkg25_vnd": 1380000, "pkg25_usd": 53.08, "jumbo_vnd": 1380000, "jumbo_usd": 53.08, "exw_vnd_cn": 1270000, "exw_usd_cn": 48.85, "comm_vnd_cn": 18000, "comm_usd_cn": 0.69, "pkg25_vnd_cn": 1380000, "pkg25_usd_cn": 53.08, "jumbo_vnd_cn": 1380000, "jumbo_usd_cn": 53.08, "exw_vnd_other": 1300000, "exw_usd_other": 50, "comm_vnd_other": 18000, "comm_usd_other": 0.69, "pkg25_vnd_other": 1410000, "pkg25_usd_other": 54.23, "jumbo_vnd_other": 1410000, "jumbo_usd_other": 54.23}
];
function importProducts(arr) {
  DATA_PRODUCTS = [];
  arr.forEach(function(r) {
    var obj = {};
    obj.code = r.code || r.Code || r["Code SP"] || r["Prod Code"] || r["Code product"] || r["Code"] || "";
    if (!obj.code) return;
    obj.size = r.size || r.Size || r["Cỡ hạt"] || r["Co hat"] || r["Size"] || "";
    obj.standard = r.standard || r.Standard || r["Standard"] || r["Tieu chuan"] || r["Standard"] || "";
    obj.machine = r.machine || r.Machine || r["Machine chạy"] || r["May chay"] || r["Machine"] || r["May"] || "";
    var vndFields = {
      exw_vnd: ["EXW (VND)","EXW(VND)","exw_vnd","EXW_VND","exw vnd","EXW VND","Exw(VND)"],
      exw_usd: ["EXW (USD)","EXW(USD)","exw_usd","EXW_USD","exw usd","EXW USD","Exw(USD)"],
      comm_vnd: ["Commission (VND)","Hoa hong (VND)","Commission(VND)","comm_vnd","comm vnd"],
      comm_usd: ["Commission (USD)","Hoa hong (USD)","Commission(USD)","comm_usd","comm usd"],
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
          obj[k + "_cn"] = Number(r[names[i]]);
          obj[k + "_other"] = Number(r[names[i]]);
          break;
        }
      }
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
    // Preserve market-specific fields from template files
    if (r.exw_vnd_cn !== undefined) obj.exw_vnd_cn = Number(r.exw_vnd_cn);
    if (r.exw_usd_cn !== undefined) obj.exw_usd_cn = Number(r.exw_usd_cn);
    if (r.comm_vnd_cn !== undefined) obj.comm_vnd_cn = Number(r.comm_vnd_cn);
    if (r.comm_usd_cn !== undefined) obj.comm_usd_cn = Number(r.comm_usd_cn);
    if (r.pkg25_vnd_cn !== undefined) obj.pkg25_vnd_cn = Number(r.pkg25_vnd_cn);
    if (r.pkg25_usd_cn !== undefined) obj.pkg25_usd_cn = Number(r.pkg25_usd_cn);
    if (r.jumbo_vnd_cn !== undefined) obj.jumbo_vnd_cn = Number(r.jumbo_vnd_cn);
    if (r.jumbo_usd_cn !== undefined) obj.jumbo_usd_cn = Number(r.jumbo_usd_cn);
    if (r.exw_vnd_other !== undefined) obj.exw_vnd_other = Number(r.exw_vnd_other);
    if (r.exw_usd_other !== undefined) obj.exw_usd_other = Number(r.exw_usd_other);
    if (r.comm_vnd_other !== undefined) obj.comm_vnd_other = Number(r.comm_vnd_other);
    if (r.comm_usd_other !== undefined) obj.comm_usd_other = Number(r.comm_usd_other);
    if (r.pkg25_vnd_other !== undefined) obj.pkg25_vnd_other = Number(r.pkg25_vnd_other);
    if (r.pkg25_usd_other !== undefined) obj.pkg25_usd_other = Number(r.pkg25_usd_other);
    if (r.jumbo_vnd_other !== undefined) obj.jumbo_vnd_other = Number(r.jumbo_vnd_other);
    if (r.jumbo_usd_other !== undefined) obj.jumbo_usd_other = Number(r.jumbo_usd_other);
    DATA_PRODUCTS.push(obj);
  });
}

var DATA_BAGS = [{"code": "NVL-BB-PP-K55X85", "cost": 4562, "spec": "25KG", "qty": 18000, "price": 220528, "profit": 0.1}, {"code": "NVL-BB-JB-92X92X125", "cost": 127750, "spec": "Jumbo", "qty": 3000, "price": 143825, "profit": 0.1}, {"code": "NVL-BB-JB-95X95X125", "cost": 131250, "spec": "Jumbo", "qty": 3000, "price": 147675, "profit": 0.1}, {"code": "NVL-BB-25KG-52X78", "cost": 3990, "spec": "25KG", "qty": 18000, "price": 195360, "profit": 0.1}, {"code": "NVL-BB-25KG-52X75", "cost": 3800, "spec": "25KG", "qty": 18000, "price": 187000, "profit": 0.1}, {"code": "NVL-BB-25KG-52X72", "cost": 3587, "spec": "25KG", "qty": 18000, "price": 177628, "profit": 0.1}, {"code": "NVL-BB-34KG-50X78-KOTR", "cost": 3100, "spec": "34KG", "qty": 18000, "price": 156200, "profit": 0.1}, {"code": "50KG-NHUATAICHE-55X85", "cost": 2650, "spec": "50KG", "qty": 18000, "price": 78100, "profit": 0.1}, {"code": "NVL-BB-25KG-50X72-KOTR", "cost": 3000, "spec": "25KG", "qty": 18000, "price": 151800, "profit": 0.1}, {"code": "Bao jumbo của khách", "cost": 0, "spec": "Jumbo", "qty": 3000, "price": 3300, "profit": 0.1}, {"code": "BAO 25KG CỦA KHÁCH", "cost": 0, "spec": "25KG", "qty": 18000, "price": 19800, "profit": 0.1}, {"code": "NVL-BB-JB-90X90X125-TR", "cost": 127000, "spec": "Jumbo", "qty": 3000, "price": 143000, "profit": 0.1}, {"code": "NVL-BB-JB-90X90X125-TR QUAY VÒNG", "cost": 43000, "spec": "Jumbo", "qty": 3000, "price": 59800, "profit": 0.3}, {"code": "NVL-BB-25KG-50X72", "cost": 3587, "spec": "25KG", "qty": 18000, "price": 177628, "profit": 0.1}];


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
}

var DATA_OTHERS = [{"code": "PALLET TÁI SỬ DỤNG", "cost": 70000, "price": 77000, "profit": 0.1}, {"code": "PALLET MỚI", "cost": 120000, "price": 132000, "profit": 0.1}, {"code": "NẸP ĐAI", "cost": 5000, "price": 5500, "profit": 0.1}, {"code": "QUẤN MÀNG", "cost": 18000, "price": 19800, "profit": 0.1}, {"code": "PALLET TRÁNG PHỦ", "cost": 160000, "price": 176000, "profit": 0.1}, {"code": "JUMBO MỞ NẮP (QtyING)", "cost": 95000, "price": 104500, "profit": 0.1}, {"code": "PALLET MỚI + NẸP ĐAI + QUẤN MÀNG", "cost": 143000, "price": 157300, "profit": 0.1}, {"code": "JUMBO MỞ NẮP (QtyING) CỦA KHÁCH", "cost": 35000, "price": 38500, "profit": 0.1}];
var DATA_MAX_LOADING = {}; // Empty - removed from pricelist table
var DATA_COST_FOB = {14:{no:974600,sub:1263900},20:{no:682000,sub:884400},22:{no:620400,sub:804100},24:{no:568700,sub:737000},25:{no:545600,sub:707300},26:{no:524700,sub:680900},27:{no:504900,sub:655600},28:{no:487300,sub:632500}};


// App

// App
// App
var currency = "VND";
var activeTab = "pricelist";
var priceMode = "exw";
var lccType = "no";
var freightUSD = 0;
var managePassword = "Ducthinh@1";
var calcPriceMode = "exw";
var calcLccType = "no";
var calcFreightUSD = 0;
var FREIGHT_DATA = [{"port": "Shanghai", "country": "CHINA", "freight": 2, "forwarder": "Nagel", "via": "ALL IN"}, {"port": "Ningbo", "country": "CHINA", "freight": 2, "forwarder": "Nagel", "via": "ALL IN"}, {"port": "Qingdao", "country": "CHINA", "freight": 2, "forwarder": "Nagel", "via": "ALL IN"}, {"port": "Nansha", "country": "CHINA", "freight": 2, "forwarder": "Nagel", "via": "ALL IN"}, {"port": "ShanTou", "country": "CHINA", "freight": 50, "forwarder": "Nagel", "via": "ALL IN"}, {"port": "Xiamen", "country": "CHINA", "freight": 2, "forwarder": "Nagel", "via": "ALL IN"}, {"port": "RiZhao", "country": "CHINA", "freight": 165, "forwarder": "Nagel", "via": "ALL IN"}, {"port": "Changzhou", "country": "CHINA", "freight": 135, "forwarder": "Nagel", "via": "ALL IN"}, {"port": "Tianjin Xingang", "country": "CHINA", "freight": 12, "forwarder": "Nagel", "via": "Sub Telex"}, {"port": "Wuhu", "country": "CHINA", "freight": 95, "forwarder": "Nagel", "via": "ALL IN"}, {"port": "ZhenJiang", "country": "CHINA", "freight": 105, "forwarder": "Nagel", "via": "ALL IN"}, {"port": "Wuzhou", "country": "CHINA", "freight": 160, "forwarder": "KTO", "via": "ALL IN"}, {"port": "Fuzhou", "country": "CHINA", "freight": 100, "forwarder": "Nagel", "via": "ALL IN"}, {"port": "Jiangyin", "country": "CHINA", "freight": 105, "forwarder": "Nagel", "via": "ALL IN"}, {"port": "Wenzhou", "country": "CHINA", "freight": 195, "forwarder": "Nagel", "via": "ALL IN"}, {"port": "Yangzhou", "country": "CHINA", "freight": 150, "forwarder": "Nagel", "via": "ALL IN"}, {"port": "Zhapu", "country": "CHINA", "freight": 50, "forwarder": "Nagel", "via": "Sub Telex"}, {"port": "Dalian", "country": "CHINA", "freight": 12, "forwarder": "Nagel", "via": "Sub Telex"}, {"port": "Nanchang", "country": "CHINA", "freight": 200, "forwarder": "Nagel", "via": "ALL IN"}, {"port": "Zhongshan", "country": "CHINA", "freight": 100, "forwarder": "Nagel", "via": "ALL IN"}, {"port": "Yangpu", "country": "CHINA", "freight": 65, "forwarder": "Nagel", "via": "ALL IN"}, {"port": "TaiCang", "country": "CHINA", "freight": 25, "forwarder": "Nagel", "via": "Sub Telex"}, {"port": "Taizhou", "country": "CHINA", "freight": 105, "forwarder": "Nagel", "via": "ALL IN"}, {"port": "Jiujiang", "country": "CHINA", "freight": 90, "forwarder": "Nagel", "via": "ALL IN"}, {"port": "Nanjing", "country": "CHINA", "freight": 110, "forwarder": "Nagel", "via": "ALL IN"}, {"port": "ShanShan", "country": "CHINA", "freight": 90, "forwarder": "Nagel", "via": "ALL IN"}, {"port": "Chongqing", "country": "CHINA", "freight": 225, "forwarder": "Nagel", "via": "ALL IN"}, {"port": "SURABAYA", "country": "INDONEXIA", "freight": 210, "forwarder": "ITI", "via": "Sub LCC"}, {"port": "MEDAN (Belawan)", "country": "INDONEXIA", "freight": 245, "forwarder": "Nagel", "via": "Sub LCC"}, {"port": "JAKARTA", "country": "INDONEXIA", "freight": 310, "forwarder": "KMG", "via": "Sub LCC"}, {"port": "SEMARANG", "country": "INDONEXIA", "freight": 290, "forwarder": "ITI", "via": "Sub LCC"}, {"port": "PORT KLANG", "country": "MALAYSIA", "freight": 250, "forwarder": "ITI", "via": "Sub LCC"}, {"port": "PENANG", "country": "MALAYSIA", "freight": 250, "forwarder": "ITI", "via": "Sub LCC"}, {"port": "YANGON", "country": "MYANMAR", "freight": 480, "forwarder": "ITI", "via": "Sub LCC"}, {"port": "BANGKOK", "country": "THAILAND", "freight": 265, "forwarder": "Nagel", "via": "ALL IN"}, {"port": "LAEM CHABANG", "country": "THAILAND", "freight": 235, "forwarder": "Nagel", "via": "ALL IN"}, {"port": "MANILA", "country": "PHILIPPINE", "freight": 120, "forwarder": "Nagel", "via": "Sub LCC"}, {"port": "CEBU", "country": "PHILIPPINE", "freight": 220, "forwarder": "ITI", "via": "Sub LCC"}, {"port": "DAVAO", "country": "PHILIPPINE", "freight": 220, "forwarder": "ITI", "via": "Sub LCC"}, {"port": "SIHANOUKVILLE", "country": "CAMBODIA", "freight": 150, "forwarder": "ITI", "via": "Sub LCC"}, {"port": "CHITTAGONG", "country": "BANGLADESH", "freight": 950, "forwarder": "ITI", "via": "Sub LCC"}, {"port": "NHAVA SHEVA", "country": "INDIA", "freight": 830, "forwarder": "ITI", "via": "Sub LCC"}, {"port": "MUNDRA", "country": "INDIA", "freight": 830, "forwarder": "ITI", "via": "Sub LCC"}, {"port": "CHENNAI", "country": "INDIA", "freight": 830, "forwarder": "ITI", "via": "Sub LCC"}, {"port": "VIZAG", "country": "INDIA", "freight": 1350, "forwarder": "ITI", "via": "Sub LCC"}, {"port": "KARACHI", "country": "INDIA", "freight": 1250, "forwarder": "ITI", "via": "Sub LCC"}, {"port": "TUTICORIN", "country": "INDIA", "freight": 1350, "forwarder": "ITI", "via": "Sub LCC"}, {"port": "COLOMBO", "country": "INDIA", "freight": 1350, "forwarder": "ITI", "via": "Sub LCC"}];
var EXCHANGE_RATE = 26000;

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
  if (cbar) cbar.style.display = (tab === "pricelist") ? "flex" : "none";
  
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
function formatMaxLoading(v) {
  if (v && v > 0) return '<span style="font-weight:600;color:#0f766e">' + v + ' t</span>';
  return '—';
}
function formatMaxLoading(v) {
  if (v && v > 0) return '<span style="font-weight:600;color:#0f766e">' + v + ' t</span>';
  return '—';
}
function renderPriceTab() {
  var search = (document.getElementById("searchInput") && document.getElementById("searchInput").value || "").toLowerCase();
  var specFilter = document.getElementById("specFilter") && document.getElementById("specFilter").value || "";
  var machineFilter = document.getElementById("machineFilter") && document.getElementById("machineFilter").value || "";
  var isUsd = currency === "USD";
  var filtered = DATA_PRODUCTS.filter(function(p) {
    if (search && (!p.code || p.code.toLowerCase().indexOf(search) < 0) && (!p.size || p.size.toLowerCase().indexOf(search) < 0)) return false;
    if (specFilter && p.standard !== specFilter) return false;
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

  // Summary + th\u1ed1ng k\u00ea
  var uniqueCodes = {}, uniqueSpecs = {}, uniqueMachines = {};
  filtered.forEach(function(p) { uniqueCodes[p.code] = true; uniqueSpecs[p.standard] = true; uniqueMachines[p.machine] = true; });
  var sum25=0, cnt25=0, max25=0;
  var sumJ=0, cntJ=0, maxJ=0;
  var sumExw=0, cntExw=0, maxExw=0;
  filtered.forEach(function(p) {
    var v25 = isFob ? getFOB25PriceVND(p, lccType) : (isCif ? getCIF25PriceVND(p, lccType, freightUSD) : p.pkg25_vnd);
    if (v25 && v25 > 0) { sum25 += v25; cnt25++; if (v25 > max25) max25 = v25; }
    var vJ = isFob ? getFOBJumboPriceVND(p, lccType) : (isCif ? getCIFJumboPriceVND(p, lccType, freightUSD) : p.jumbo_vnd);
    if (vJ && vJ > 0) { sumJ += vJ; cntJ++; if (vJ > maxJ) maxJ = vJ; }
    if (p.exw_vnd && p.exw_vnd > 0) { sumExw += p.exw_vnd; cntExw++; if (p.exw_vnd > maxExw) maxExw = p.exw_vnd; }
  });
  var fmt = function(v) { return (v || 0).toLocaleString('vi-VN'); };
  h += '<div class="summary-bar">';
  h += '<div class="summary-card"><div class="lbl">Products</div><div class="val">' + Object.keys(uniqueCodes).length + '</div></div>';
  h += '<div class="summary-card"><div class="lbl">Standard</div><div class="val">' + Object.keys(uniqueSpecs).length + '</div></div>';
  h += '<div class="summary-card"><div class="lbl">Machine</div><div class="val">' + Object.keys(uniqueMachines).length + '</div></div>';
  h += '<div class="summary-card"><div class="lbl">Date</div><div class="val" style="font-size:16px">25/06/2026</div></div>';
  h += '</div>';
  h += '<button class="btn-sm" id="mlToggleBtn" onclick="toggleMaxLoad()" style="margin:0 0 0 auto;font-size:12px;padding:4px 10px;background:var(--card);border:1px solid var(--border);border-radius:var(--radius-sm);cursor:pointer">\ud83d\udccb Hi\u1ec7n max t\u1ea3i</button>';
  h += '<div class="summary-bar" style="margin-top:4px;gap:6px">';
  h += '<div class="summary-card" style="padding:8px 12px;background:#f0f9ff;border-color:#bae6fd"><div class="lbl" style="font-size:10px">Avg 25KG</div><div class="val" style="font-size:15px">' + fmt(cnt25?Math.round(sum25/cnt25):0) + '</div></div>';
  h += '<div class="summary-card" style="padding:8px 12px;background:#fef2f2;border-color:#fecaca"><div class="lbl" style="font-size:10px">C.nh\u1ea5t 25KG</div><div class="val" style="font-size:15px">' + fmt(max25) + '</div></div>';
  h += '<div class="summary-card" style="padding:8px 12px;background:#f0fdf4;border-color:#bbf7d0"><div class="lbl" style="font-size:10px">Avg Jumbo</div><div class="val" style="font-size:15px">' + fmt(cntJ?Math.round(sumJ/cntJ):0) + '</div></div>';
  h += '<div class="summary-card" style="padding:8px 12px;background:#fefce8;border-color:#fde68a"><div class="lbl" style="font-size:10px">C.nh\u1ea5t Jumbo</div><div class="val" style="font-size:15px">' + fmt(maxJ) + '</div></div>';
  h += '<div class="summary-card" style="padding:8px 12px;background:#f5f3ff;border-color:#ddd6fe"><div class="lbl" style="font-size:10px">Avg EXW</div><div class="val" style="font-size:15px">' + fmt(cntExw?Math.round(sumExw/cntExw):0) + '</div></div>';
  h += '<div class="summary-card" style="padding:8px 12px;background:#fff1f2;border-color:#fecdd3"><div class="lbl" style="font-size:10px">C.nh\u1ea5t EXW</div><div class="val" style="font-size:15px">' + fmt(maxExw) + '</div></div>';
  h += '</div>';

  // Table
  h += '<div class="table-wrap pricelist"><table><thead>';
  h += '<tr><th colspan="4">Th\u00f4ng tin</th><th colspan="2" class="ml-toggle">Max load</th><th colspan="2">' + (priceMode==="exw"?"Sell Price (EXW)":"Price incl. bag") + '</th>';
  if (!showFobCif) h += '<th colspan="2">' + (priceMode==="exw"?"Unpacked EXW":"Sell Price (EXW)") + '</th>';
  h += '</tr>';
  h += '<tr><th>M\u00e3</th><th>Size</th><th>Standard</th><th>Machine</th><th class="ml-toggle">Max 25KG <span class="info-row">(tons)</span></th><th class="ml-toggle">Max Jumbo <span class="info-row">(tons)</span></th><th>' + (priceMode==="exw"?"EXW 25KG std bag":"25KG") + ' <span class="info-row">(VND)</span></th><th>' + (priceMode==="exw"?"EXW jumbo std bag":"Jumbo") + ' <span class="info-row">(VND)</span></th>';
  if (!showFobCif) {
    h += '<th>' + (priceMode==="exw"?"Unpacked EXW":"EXW") + ' <span class="info-row">' + (isUsd ? '(USD)' : '(VND)') + '</span></th><th>' + (priceMode==="exw"?"Base commission":"Commission") + ' <span class="info-row">' + (isUsd ? '(USD)' : '(VND)') + '</span></th>';
  }
  h += '</tr></thead><tbody>';

  for (var i = 0; i < filtered.length; i++) {
    var p = filtered[i];
    h += '<tr>';
    h += '<td><strong>' + p.code + '</strong></td>';
    h += '<td>' + p.size + '</td>';
    h += '<td><span class="badge-spec badge-' + p.standard.replace(/-/g, '').replace(/\+/g, '') + '">' + p.standard + '</span></td>';
    h += '<td>' + p.machine + '</td>';
    h += '<td class="text-right ml-toggle">' + formatMaxLoading(getMaxLoading(p.code, "max25")) + '</td>';
    h += '<td class="text-right ml-toggle">' + formatMaxLoading(getMaxLoading(p.code, "maxJumbo")) + '</td>';

    if (isFob) {
      h += '<td class="text-right">' + (isUsd ? formatCurrency(getFOB25PriceUSD(p, lccType), true) : formatCurrency(getFOB25PriceVND(p, lccType), false)) + '</td>';
      h += '<td class="text-right">' + (isUsd ? formatCurrency(getFOBJumboPriceUSD(p, lccType), true) : formatCurrency(getFOBJumboPriceVND(p, lccType), false)) + '</td>';
    } else if (isCif) {
      h += '<td class="text-right">' + (isUsd ? formatCurrency(getCIF25PriceUSD(p, lccType, freightUSD), true) : formatCurrency(getCIF25PriceVND(p, lccType, freightUSD), false)) + '</td>';
      h += '<td class="text-right">' + (isUsd ? formatCurrency(getCIFJumboPriceUSD(p, lccType, freightUSD), true) : formatCurrency(getCIFJumboPriceVND(p, lccType, freightUSD), false)) + '</td>';
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
  var h = '<div class="calc-grid">';

  // ===== LEFT PANEL =====
  h += '<div class="calc-left">';

  // --- Section: Products ---
  h += '<div class="calc-section-title"><span class="badge blue">📦</span><span class="title-text">Select Product</span></div>';

  // Machine + Standard side by side
  var machines = {};
  DATA_PRODUCTS.forEach(function(p) { machines[p.machine] = true; });
  var machineKeys = Object.keys(machines).sort();
  h += '<div class="calc-form-group"><div class="calc-row-inline">';
  h += '<div><label class="calc-form-label">🏭 Machine</label>';
  h += '<select class="calc-select" id="calcMachine" onchange="filterCalcProducts()"><option value="">— -- Select Machine -- —</option>';
  for (var i = 0; i < machineKeys.length; i++) {
    h += '<option value="' + machineKeys[i].replace(/"/g, '&quot;') + '">' + machineKeys[i] + '</option>';
  }
  h += '</select></div>';
  h += '<div><label class="calc-form-label">📋 Standard</label>';
  h += '<select class="calc-select" id="calcStandard" onchange="filterCalcProducts()"><option value="">— -- Select Standard -- —</option></select></div>';
  h += '</div></div>';

  h += '<div class="calc-form-group"><label class="calc-form-label">🔖 Product</label>';
  h += '<select class="calc-select" id="calcProduct" onchange="onCalcProductChange()"><option value="">— Select Product —</option></select></div>';
  // Max loading dropdown (shown only in FOB/CIF mode)
  h += '<div class="calc-form-group" id="calcMaxLoadRow" style="display:none">';
  h += '<label class="calc-form-label">⚖️ Max loading</label>';
  h += '<select class="calc-select" id="calcMaxLoad" onchange="calcPrice()"><option value="">— -- Auto -- —</option></select></div>';

  // --- Section: Packaging ---
  h += '<div class="calc-section-title" style="margin-top:16px"><span class="badge green">🛍️</span><span class="title-text">Bag Options</span></div>';

  // Bag spec + Bag select side by side
  h += '<div class="calc-form-group"><div class="calc-row-inline">';
  h += '<div><label class="calc-form-label">📏 Bag Spec</label>';
  h += '<select class="calc-select" id="calcBagSpec" onchange="filterBagSpec()"><option value="25KG">25KG</option><option value="34KG">34KG</option><option value="50KG">50KG</option><option value="Jumbo">Jumbo</option></select></div>';
  h += '<div><label class="calc-form-label">🛍️ Bag Type</label>';
  h += '<select class="calc-select" id="calcBag" onchange="calcPrice()"><option value="">— -- None -- —</option>';
  h += '</select></div>';
  h += '</div></div>';

  // Jumbo tonnage (hidden by default)
  h += '<div class="calc-form-group" id="calcTonnageRow" style="display:none">';
  h += '<label class="calc-form-label">⚖️ Tons / Jumbo Bag</label>';
  h += '<select class="calc-select" id="calcTonnage" onchange="calcPrice()">';
  var jumboTons = ["0.5","0.7","1","1.1","1.2","1.25","1.3","1.35","1.375","1.38","1.4","1.5"];
  for (var i = 0; i < jumboTons.length; i++) {
    h += '<option value="' + jumboTons[i] + '">' + jumboTons[i] + ' tons</option>';
  }
  h += '</select></div>';

  // --- Section: Other Specs ---
  h += '<div class="calc-section-title" style="margin-top:16px"><span class="badge purple">📦</span><span class="title-text">Other Specs</span></div>';

  h += '<div class="calc-form-group"><div class="calc-row-inline">';
  h += '<div><label class="calc-form-label">📋 Spec Type</label>';
  h += '<select class="calc-select" id="calcOther" onchange="calcPrice()"><option value="">— -- None -- —</option>';
  for (var i = 0; i < DATA_OTHERS.length; i++) {
    h += '<option value="' + DATA_OTHERS[i].code + '">' + DATA_OTHERS[i].code + '</option>';
  }
  h += '</select></div>';
  h += '<div id="calcOtherTonnageRow"><label class="calc-form-label">⚖️ Tons</label>';
  h += '<select class="calc-select" id="calcOtherTonnage" onchange="calcPrice()">';
  var otherTons = ["0.5","0.7","1","1.1","1.2","1.25","1.3","1.35","1.375","1.38","1.4","1.5","1.53","1.6"];
  for (var i = 0; i < otherTons.length; i++) {
    h += '<option value="' + otherTons[i] + '">' + otherTons[i] + ' tons</option>';
  }
  h += '</select></div>';
  h += '</div></div>';

  h += '</div>'; // end calc-left

  // ===== RIGHT PANEL =====
  h += '<div class="calc-right">';
  h += '<div class="calc-right-header">';
  h += '<span class="icon">💰</span>';
  h += '<span>Calculation Result</span>';
  h += '</div>';
  // Price mode bar for calc tab
  h += '<div class="price-mode-bar" id="calcPriceModeBar" style="margin-bottom:12px;padding:8px 14px">';
  h += '<div class="mode-group">';
  h += '<button class="mode-btn active" data-mode="exw" onclick="setCalcPriceMode(\'exw\')">EXW</button>';
  h += '<button class="mode-btn" data-mode="fob" onclick="setCalcPriceMode(\'fob\')">FOB</button>';
  h += '<button class="mode-btn" data-mode="cif" onclick="setCalcPriceMode(\'cif\')">CIF</button>';
  h += '</div>';
  h += '<div class="lcc-group" id="calcLccGroup" style="display:none">';
  h += '<span class="ext-label">LCC Type:</span>';
  h += '<button class="lcc-btn active" data-lcc="no" onclick="setCalcLccType(\'no\')">No LCC</button>';
  h += '<button class="lcc-btn" data-lcc="sub" onclick="setCalcLccType(\'sub\')">Sub LCC</button>';
  h += '</div>';
  h += '<div id="calcFreightGroup" style="display:none">';
  h += '<span class="ext-label">🚂 Freight:</span>';
  h += '<input type="number" class="ext-input" id="calcFreightInput" value="0" min="0" step="100" oninput="setCalcFreight(this.value)" style="width:100px">';
  h += '<span class="ext-label">USD</span>;';
  h += '<button class="ext-label" onclick="showFreightPopup()" style="background:var(--primary);color:white;border:none;border-radius:6px;padding:4px 10px;cursor:pointer;font-size:12px;font-weight:600">📡 Look Up</button>';
  h += '</div>';
  h += '</div>';
      // Currency toggle for calc tab 
  h += '<div style="display:flex;align-items:center;gap:8px;margin-bottom:10px;padding:4px 0">';
  h += '<span style="font-size:11px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:.03em">💱 Currency:</span>';
  h += '<div class="calc-currency-bar">';
  h += '<button class="mode-btn active" id="calcCcyVnd" onclick="setCalcCurrency(\'VND\')">VND</button>';
  h += '<button class="mode-btn" id="calcCcyUsd" onclick="setCalcCurrency(\'USD\')">USD</button>';
  h += '</div>';
  h += '</div>';
h += '<div class="calc-result" id="calcResult">';
  h += '<div class="calc-empty">';
  h += '<div class="calc-empty-icon">📊</div>';
  h += '<div class="calc-empty-text">Select product & packaging to start</div>';
  h += '</div>';
  h += '</div>';
  h += '</div>';

  h += '</div>'; // end calc-grid
  return h;
}// ====== CALC FILTER HELPERS ======
function filterCalcProducts() {
  var me = document.getElementById("calcMachine"), se = document.getElementById("calcStandard"), pe = document.getElementById("calcProduct");
  if (!me || !se || !pe) return;
  var m = me.value, s = se.value;
  // Collect standards by machine, and machines by standard
  var machinesByStd = {}, standardsByMach = {};
  DATA_PRODUCTS.forEach(function(p) {
    if (!m || p.machine === m) standardsByMach[p.standard] = true;
    if (!s || p.standard === s) machinesByStd[p.machine] = true;
  });
  // Populate machines (if standard is selected, filter)
  var prevMach = me.value;
  me.innerHTML = '<option value="">— -- Select Machine -- —</option>';
  var mk = Object.keys(machinesByStd).sort();
  for (var i = 0; i < mk.length; i++) me.innerHTML += '<option value="' + mk[i].replace(/"/g, '&quot;') + '">' + mk[i] + '</option>';
  me.value = prevMach && mk.indexOf(prevMach) >= 0 ? prevMach : "";
  // Populate standards (if machine is selected, filter)
  var prevStd = se.value;
  se.innerHTML = '<option value="">— -- Select Standard -- —</option>';
  var sk = Object.keys(standardsByMach).sort();
  for (var i = 0; i < sk.length; i++) se.innerHTML += '<option value="' + sk[i].replace(/"/g, '&quot;') + '">' + sk[i] + '</option>';
  se.value = prevStd && sk.indexOf(prevStd) >= 0 ? prevStd : "";
  filterCalcProducts_products();
}
function filterCalcProducts_products() {
  var me = document.getElementById("calcMachine"), se = document.getElementById("calcStandard"), pe = document.getElementById("calcProduct");
  if (!me || !se || !pe) return;
  var m = me.value, s = se.value;
  var prevProd = pe.value;
  pe.innerHTML = '<option value="">— Select Product —</option>';
  DATA_PRODUCTS.forEach(function(p) { if ((!m || p.machine === m) && (!s || p.standard === s)) pe.innerHTML += '<option value="' + p.code + '">' + p.code + ' — ' + p.size + '</option>'; });
  pe.value = prevProd;
}
function onCalcProductChange() { populateCalcMaxLoad(); calcPrice(); }
function populateCalcMaxLoad() {
  var psel = document.getElementById("calcProduct"), mlsel = document.getElementById("calcMaxLoad");
  if (!psel || !mlsel) return;
  var pcode = psel.value;
  mlsel.innerHTML = '<option value="">— -- Auto (per bag spec) -- —</option>';
  if (!pcode) return;
  // Collect all unique max loading values from DATA_MAX_LOADING
  var allVals = {};
  for (var k in DATA_MAX_LOADING) {
    var obj = DATA_MAX_LOADING[k];
    for (var spec in obj) {
      var v = obj[spec];
      if (v !== undefined && v !== null) {
        if (!allVals[v]) allVals[v] = {};
        allVals[v][spec] = true;
      }
    }
  }
  // Sort numeric ascending
  var sorted = Object.keys(allVals).map(Number).sort(function(a,b){return a-b;});
  for (var i = 0; i < sorted.length; i++) {
    mlsel.innerHTML += '<option value="' + sorted[i] + '">' + sorted[i] + ' tons</option>';
  }
}
// ====== FILTER HELPERS ======
function filterBagSpec() {
  var bagSpec = document.getElementById("calcBagSpec").value;
  var bsel = document.getElementById("calcBag");
  if (bsel) {
    var curVal = bsel.value;
    bsel.innerHTML = '<option value="">— -- No bag selected -- —</option>';
    for (var i = 0; i < DATA_BAGS.length; i++) {
      if (DATA_BAGS[i].spec === bagSpec) {
        bsel.innerHTML += '<option value="' + DATA_BAGS[i].code + '">' + DATA_BAGS[i].code + '</option>';
      }
    }
    bsel.value = curVal;
  }
  var tnRow = document.getElementById("calcTonnageRow");
  var otnRow = document.getElementById("calcOtherTonnageRow");
  if (tnRow) tnRow.style.display = (bagSpec === "Jumbo") ? "flex" : "none";
  if (otnRow) otnRow.style.display = (bagSpec === "Jumbo") ? "none" : "flex";
  calcPrice();
}
// ====== CALC FUNCTIONS ======
// ====== CALC PRICE MODE HELPERS ======
function setCalcCurrency(ccy) {
  currency = ccy;
  var vndBtn = document.getElementById("calcCcyVnd");
  var usdBtn = document.getElementById("calcCcyUsd");
  if (vndBtn) vndBtn.classList.toggle("active", ccy === "VND");
  if (usdBtn) usdBtn.classList.toggle("active", ccy === "USD");
  calcPrice();
}
function setCalcPriceMode(mode) {
  calcPriceMode = mode;
  var bar = document.getElementById("calcPriceModeBar");
  if (!bar) return;
  bar.querySelectorAll(".mode-btn").forEach(function(b) { b.classList.toggle("active", b.dataset.mode === mode); });
  var lccGrp = document.getElementById("calcLccGroup");
  if (lccGrp) lccGrp.style.display = (mode === "fob" || mode === "cif") ? "flex" : "none";
  var fg = document.getElementById("calcFreightGroup");
  if (fg) fg.style.display = mode === "cif" ? "inline-flex" : "none";
  // Show/hide max loading dropdown
  var mlRow = document.getElementById("calcMaxLoadRow");
  if (mlRow) mlRow.style.display = (mode === "fob" || mode === "cif") ? "flex" : "none";
  if (mode === "fob" || mode === "cif") populateCalcMaxLoad();
  calcPrice();
}
function setCalcLccType(type) {
  calcLccType = type;
  var bar = document.getElementById("calcPriceModeBar");
  if (bar) bar.querySelectorAll(".lcc-btn").forEach(function(b) { b.classList.toggle("active", b.dataset.lcc === type); });
  calcPrice();
}
function setCalcFreight(val) {
  calcFreightUSD = parseFloat(val) || 0;
  calcPrice();
}
function getCalcBagSpec() {
  var sel = document.getElementById("calcBagSpec");
  return sel ? sel.value : "25KG";
}
function getCalcMaxLoading(prod) {
  var bs = getCalcBagSpec();
  if (bs === "Jumbo") return getMaxLoading(prod.code, "maxJumbo");
  return getMaxLoading(prod.code, "max25");
}
function calcCommission() {
  var sp = document.getElementById("calcSellPrice"), cr = document.getElementById("calcCommissionResult");
  if (!sp || !cr || !sp.value) { if (cr) cr.innerHTML = ""; return; }
  var sellPrice = parseFloat(sp.value);
  if (isNaN(sellPrice) || sellPrice <= 0) { cr.innerHTML = ""; return; }
  var psel = document.getElementById("calcProduct");
  if (!psel || !psel.value) { cr.innerHTML = '<div style="color:var(--muted);font-size:12px">Select product first</div>'; return; }
  var prod = null;
  for (var i = 0; i < DATA_PRODUCTS.length; i++) { if (DATA_PRODUCTS[i].code === psel.value) { prod = DATA_PRODUCTS[i]; break; } }
  if (!prod) { cr.innerHTML = ""; return; }
  var isUsd = currency === "USD";
  var commBase = isUsd ? prod.comm_usd : prod.comm_vnd;
  var bsel = document.getElementById("calcBag"), tnsel = document.getElementById("calcTonnage"), otnsel = document.getElementById("calcOtherTonnage"), osel = document.getElementById("calcOther"), bagSpecSel = document.getElementById("calcBagSpec");
  var bs = bagSpecSel ? bagSpecSel.value : "25KG";
  var isJumbo = bs === "Jumbo";
  var bagPrice = 0, bcode = bsel ? bsel.value : "", bagTons = 1;
  if (isJumbo && tnsel && tnsel.value && parseFloat(tnsel.value) > 0) bagTons = parseFloat(tnsel.value);
  var otherTons = 1;
  if (otnsel && otnsel.value && parseFloat(otnsel.value) > 0) otherTons = parseFloat(otnsel.value);
  // When Jumbo selected, other spec also divides by bag tonnage
  if (isJumbo && bagTons > 0) otherTons = bagTons;
  var exwBase = 0;
  if (bcode) {
    // User selected a specific bag -> EXW + bagPrice
    exwBase = isUsd ? prod.exw_usd : prod.exw_vnd;
    for (var i = 0; i < DATA_BAGS.length; i++) { if (DATA_BAGS[i].code === bcode) { bagPrice = DATA_BAGS[i].price; break; } } if (isJumbo && bagTons > 0) bagPrice = bagPrice / bagTons;
  } else {
    // No bag selected -> use pkg price (includes bag)
    exwBase = isUsd ? (isJumbo ? prod.jumbo_usd : prod.pkg25_usd) : (isJumbo ? prod.jumbo_vnd : prod.pkg25_vnd);
    bagPrice = 0;
  }
  var otherPrice = 0, ocode = osel ? osel.value : "";
  if (ocode) { for (var i = 0; i < DATA_OTHERS.length; i++) { if (DATA_OTHERS[i].code === ocode) { otherPrice = DATA_OTHERS[i].price; break; } } if (otherTons > 0) otherPrice = otherPrice / otherTons; }
  var totalCost = 0;
  if (calcPriceMode === "fob" || calcPriceMode === "cif") {
    // Compute FOB/CIF the same way as calcPrice
    var mlsel = document.getElementById("calcMaxLoad");
    var cml = mlsel && mlsel.value ? parseFloat(mlsel.value) : 0;
    if (!cml) cml = isJumbo ? getMaxLoading(prod.code, "maxJumbo") : getMaxLoading(prod.code, "max25");
    var cfobCost = getCostFobVND(cml, calcLccType);
    // Convert to USD if needed
    if (isUsd) {
      bagPrice = Math.round(bagPrice / EXCHANGE_RATE);
      otherPrice = Math.round(otherPrice / EXCHANGE_RATE);
      cfobCost = Math.round(cfobCost / EXCHANGE_RATE);
    }
    totalCost = (exwBase + bagPrice + otherPrice + cfobCost) * 1.05;
    if (calcPriceMode === "cif" && cml > 0) {
      totalCost += isUsd ? (calcFreightUSD + 10) / cml : (calcFreightUSD + 10) * EXCHANGE_RATE / cml;
    }
    // Hoa hong FOB/CIF: commBase + (gia ban - gia fob) / 1.05 * 30%
    var diff = Math.max(0, (sellPrice - totalCost) / 1.05);
    var commissionVar = diff * 0.3;
    var effCommBase = sellPrice < totalCost ? 0 : commBase;
    var totalComm = effCommBase + commissionVar;
  } else {
    if (isUsd) {
      bagPrice = Math.round(bagPrice / EXCHANGE_RATE);
      otherPrice = Math.round(otherPrice / EXCHANGE_RATE);
    }
    totalCost = exwBase + bagPrice + otherPrice;
    var diff = Math.max(0, sellPrice - totalCost);
    var commissionVar = diff * 0.3;
    var effCommBase = sellPrice < totalCost ? 0 : commBase;
    var totalComm = effCommBase + commissionVar;
  }
  var h = '<div class="calc-comm-row"><span>Base Commission</span><strong>' + fmtNum(effCommBase, isUsd) + ' ' + (isUsd ? "USD" : "VND") + '</strong></div>';
  h += '<div class="calc-comm-row"><span>Diff (30%)</span><strong>' + fmtNum(commissionVar, isUsd) + ' ' + (isUsd ? "USD" : "VND") + '</strong></div>';
  h += '<div class="calc-comm-row"><span>Total Cost</span><strong>' + fmtNum(totalCost, isUsd) + ' ' + (isUsd ? "USD" : "VND") + '</strong></div>';
  h += '<div class="calc-comm-row calc-total" style="padding:10px 0;border-top:2px solid var(--primary);margin-top:6px"><span>Total Commission</span><strong style="color:var(--primary);font-size:16px">' + fmtNum(totalComm, isUsd) + ' ' + (isUsd ? "USD" : "VND") + '</strong></div>';
  cr.innerHTML = h;
}
function calcPrice() {
  var res = document.getElementById("calcResult");
  if (!res) return;
  var psel = document.getElementById("calcProduct"), bsel = document.getElementById("calcBag"), tnsel = document.getElementById("calcTonnage"), otnsel = document.getElementById("calcOtherTonnage"), osel = document.getElementById("calcOther"), bagSpecSel = document.getElementById("calcBagSpec");
  var isUsd = currency === "USD", pcode = psel ? psel.value : "";
  if (!pcode) { res.innerHTML = '<div class="calc-empty">👈 Please select a product</div>'; return; }
  var prod = null;
  for (var i = 0; i < DATA_PRODUCTS.length; i++) { if (DATA_PRODUCTS[i].code === pcode) { prod = DATA_PRODUCTS[i]; break; } }
  if (!prod) { res.innerHTML = '<div class="calc-empty">❌ Product not found</div>'; return; }
  var bs = bagSpecSel ? bagSpecSel.value : "25KG";
  var isJumbo = bs === "Jumbo";
  // Determine base price: EXW or FOB or CIF
  var exwMin = 0;
  var commBase = isUsd ? prod.comm_usd : prod.comm_vnd;
  var fobCostPerTon = 0;
  var maxLoad = isJumbo ? getMaxLoading(prod.code, "maxJumbo") : getMaxLoading(prod.code, "max25");
  var isFobMode = calcPriceMode === "fob";
  var isCifMode = calcPriceMode === "cif";

  // Get selected max loading (or auto from bag spec)
  var mlsel = document.getElementById("calcMaxLoad");
  var selectedMaxLoad = mlsel && mlsel.value ? parseFloat(mlsel.value) : 0;
  if (!selectedMaxLoad) {
    selectedMaxLoad = isJumbo ? getMaxLoading(prod.code, "maxJumbo") : getMaxLoading(prod.code, "max25");
  }
  maxLoad = selectedMaxLoad;

  // Determine base price: EXW or pkg (when no bag selected)
  var bcode = bsel ? bsel.value : "";
  var isDefaultBag = !bcode;
  var bagPrice = 0, bagTons = 1;
  if (isJumbo && tnsel && tnsel.value && parseFloat(tnsel.value) > 0) bagTons = parseFloat(tnsel.value);
  var ocode = osel ? osel.value : "", otherTons = 1;
  if (otnsel && otnsel.value && parseFloat(otnsel.value) > 0) otherTons = parseFloat(otnsel.value);
  // When Jumbo selected, other spec also divides by bag tonnage
  if (isJumbo && bagTons > 0) otherTons = bagTons;
  var bagCode = "";
  var hasBag = false;

  if (bcode) {
    // User selected a specific bag -> use EXW + bagPrice + otherPrice
    hasBag = true;
    exwMin = isUsd ? prod.exw_usd : prod.exw_vnd;
    for (var i = 0; i < DATA_BAGS.length; i++) { if (DATA_BAGS[i].code === bcode) { bagPrice = DATA_BAGS[i].price; bagCode = DATA_BAGS[i].code; break; } } if (isJumbo && bagTons > 0) bagPrice = bagPrice / bagTons;
  } else {
    // No bag selected -> use pkg price (already includes bag)
    exwMin = isUsd ? (isJumbo ? prod.jumbo_usd : prod.pkg25_usd) : (isJumbo ? prod.jumbo_vnd : prod.pkg25_vnd);
    bagPrice = 0;
    bagCode = "Standard " + bs;
  }
  var otherPrice = 0, otherCode = "";
  if (ocode) { for (var i = 0; i < DATA_OTHERS.length; i++) { if (DATA_OTHERS[i].code === ocode) { otherPrice = DATA_OTHERS[i].price; otherCode = DATA_OTHERS[i].code; break; } } if (otherTons > 0) otherPrice = otherPrice / otherTons; }

  // FOB/CIF mode needs fobCost
  if (isFobMode || isCifMode) {
    fobCostPerTon = getCostFobVND(maxLoad, calcLccType);
  }
  // Convert to USD if needed
  if (isUsd) {
    otherPrice = Math.round(otherPrice / EXCHANGE_RATE);
    bagPrice = Math.round(bagPrice / EXCHANGE_RATE);
    fobCostPerTon = Math.round(fobCostPerTon / EXCHANGE_RATE);
  }
var total = 0;
  if (isFobMode || isCifMode) {
    total = (exwMin + bagPrice + otherPrice + fobCostPerTon) * 1.05;
    if (isCifMode && maxLoad > 0) {
      total += isUsd ? (calcFreightUSD + 10) / maxLoad : (calcFreightUSD + 10) * EXCHANGE_RATE / maxLoad;
    }
  } else {
    total = exwMin + bagPrice + otherPrice;
  }
  var cc = isUsd ? "USD" : "VND";
    var h = '<div class="calc-result-summary">';
  h += '<div class="calc-result-item"><span class="calc-rl">📦 Products</span><span class="calc-rv">' + prod.code + '</span></div>';
  h += '<div class="calc-result-item"><span class="calc-rl">⚙️ Machine / Standard</span><span class="calc-rv">' + prod.machine + ' · ' + prod.standard + '</span></div>';
  h += '<div class="calc-result-item"><span class="calc-rl">📐 Size</span><span class="calc-rv">' + prod.size + '</span></div>';
  var modeLabel = calcPriceMode.toUpperCase();
  if (isFobMode) modeLabel += " (" + (calcLccType === "sub" ? "Sub LCC" : "No LCC") + ")";
  if (isCifMode) modeLabel += " (LCC:" + (calcLccType === "sub" ? "Sub" : "No") + " F:" + calcFreightUSD + "USD)";
  h += '<div class="calc-result-item"><span class="calc-rl">💰 ' + 'EXW' + (hasBag ? ' no packaging' : ' with packaging') + '</span><span class="calc-rv exw">' + fmtNum(exwMin, isUsd) + ' ' + cc + '</span></div>';
  if (isFobMode && maxLoad) {
    h += '<div class="calc-result-item"><span class="calc-rl">⚖️ Max loading</span><span class="calc-rv other">' + maxLoad + ' tons</span></div>';
    h += '<div class="calc-result-item"><span class="calc-rl">🚛 FOB Cost / ton</span><span class="calc-rv other">' + fmtNum(fobCostPerTon, isUsd) + ' ' + cc + '</span></div>';
  }
  if (isCifMode) {
    if (maxLoad > 0) {
      h += '<div class="calc-result-item"><span class="calc-rl">⚖️ Max loading</span><span class="calc-rv other">' + maxLoad + ' tons</span></div>';
      h += '<div class="calc-result-item"><span class="calc-rl">🚛 FOB Cost / ton</span><span class="calc-rv other">' + fmtNum(fobCostPerTon, isUsd) + ' ' + cc + '</span></div>';
      var cifFreightPerTon = isUsd ? (calcFreightUSD + 10) / maxLoad : (calcFreightUSD + 10) * EXCHANGE_RATE / maxLoad;
      h += '<div class="calc-result-item"><span class="calc-rl">🚢 Freight / ton</span><span class="calc-rv other">' + fmtNum(cifFreightPerTon, isUsd) + ' ' + cc + '</span></div>';
    }
  }
  var bd = ""; if (bcode || isDefaultBag) { if (hasBag) { bd = bagCode; } else { bd = bagCode; } if (isJumbo && bagTons > 0) bd += " / " + bagTons + " tons"; h += '<div class="calc-result-item"><span class="calc-rl">🛍️ Packaging (' + bd + ')</span><span class="calc-rv bag">' + fmtNum(bagPrice, isUsd) + ' ' + cc + '</span></div>'; if (!hasBag) h += '<div class="calc-result-item"><span style="font-size:11px;color:#f59e0b;font-style:italic">⚠️ Using standard packaging price. If bag is different, please select correctly!</span></div>'; }
  if (ocode) { var od = otherCode; if (!isJumbo && otherTons > 0) od += " / " + otherTons + " tons"; h += '<div class="calc-result-item"><span class="calc-rl">📦 Other Specs (' + od + ')</span><span class="calc-rv other">' + fmtNum(otherPrice, isUsd) + ' ' + cc + '</span></div>'; }
  h += '<div class="calc-result-total-row">';
  h += '<span class="calc-rl">🏷️ Total Cost (' + modeLabel + ')</span>';
  h += '<span class="calc-rv total">' + fmtNum(total, isUsd) + ' ' + cc + '</span>';
  h += '</div>';
  h += '</div>';
  h += '<div class="calc-commission-wrap">';
  h += '<div class="calc-sell-input"><span>💰 Sell Price</span><input type="number" id="calcSellPrice" placeholder="Enter sell price..." oninput="calcCommission()"></div>';
  h += '<div class="calc-comm-result" id="calcCommissionResult"></div>';
  h += '<div style="margin-top:12px;text-align:center"><button onclick="showQuotationPopup()" style="background:var(--primary);color:white;border:none;border-radius:8px;padding:10px 24px;cursor:pointer;font-size:14px;font-weight:700;box-shadow:0 4px 12px rgba(37,99,235,0.3)">📄 Create Quote</button></div>';
  h += '</div>';
  res.innerHTML = h;
}


// ====== EXPORT FUNCTIONS ======
function exportToExcel() {
  var dt = new Date();
  var isUsd = currency === "USD";
  var modeLabel = priceMode.toUpperCase();
  if (priceMode === "fob" || priceMode === "cif") modeLabel += " (" + (lccType === "sub" ? "Sub LCC" : "No LCC") + ")";
  var fn = "DT-PriceList-" + dt.getFullYear() + "-" + (dt.getMonth() + 1) + "-" + dt.getDate() + ".xlsx";

  var rows = [["M\u00e3","Size","Standard","Machine","25KG (VND)","Jumbo (VND)","Gi\u00e1 b\u00e1n (" + modeLabel + ", " + (isUsd ? "USD" : "VND") + ")","Hoa h\u1ed3ng (" + (isUsd ? "USD" : "VND") + ")"]];

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


function downloadTemplate(type) {
  var headers, fn, row;
  if (type === 0) {
    fn = "Mau_gia_ban.xlsx";
    headers = ["code","size","standard","machine","max25","maxJumbo","exw_vnd_cn","exw_usd_cn","comm_vnd_cn","comm_usd_cn","pkg25_vnd_cn","pkg25_usd_cn","jumbo_vnd_cn","jumbo_usd_cn","exw_vnd_other","exw_usd_other","comm_vnd_other","comm_usd_other","pkg25_vnd_other","pkg25_usd_other","jumbo_vnd_other","jumbo_usd_other"];
  } else if (type === 1) {
    fn = "Mau_bao_bi.xlsx";
    headers = ["code","cost","spec","qty","price","profit"];
  } else if (type === 2) {
    fn = "Mau_quy_cach_khac.xlsx";
    headers = ["code","name","cost","qty","price","profit"];
  } else if (type === 3) {
    fn = "Mau_max_tai.xlsx";
    headers = ["SẢN PHẨM","Max Loading 25KG","Max Loading Jumbo"];
  }
  var ws = XLSX.utils.aoa_to_sheet([headers]);
  var wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Template");
  XLSX.writeFile(wb, fn);
}

function downloadFullTemplate() {
  var ws_data = [];
  var dt = new Date();
  var fn = "DT-Mau_Day_Du-" + dt.getFullYear() + "-" + (dt.getMonth() + 1) + "-" + dt.getDate() + ".xlsx";
  var wb = XLSX.utils.book_new();
  
  // Sheet 1: Products
  var prodHeaders = ["code","size","standard","machine","max25","maxJumbo","exw_vnd_cn","exw_usd_cn","comm_vnd_cn","comm_usd_cn","pkg25_vnd_cn","pkg25_usd_cn","jumbo_vnd_cn","jumbo_usd_cn","exw_vnd_other","exw_usd_other","comm_vnd_other","comm_usd_other","pkg25_vnd_other","pkg25_usd_other","jumbo_vnd_other","jumbo_usd_other"];
  XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet([prodHeaders]), "Products");
  
  // Sheet 2: Bags
  XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet([["code","cost","spec","qty","price","profit"]]), "Bags");
  
  // Sheet 3: Others
  XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet([["code","name","cost","qty","price","profit"]]), "Others");
  
  // Sheet 4: MaxLoading
  XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet([["code","max25","maxJumbo"]]), "MaxLoading");
  
  // Sheet 5: CostFOB
  XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet([["maxLoading","no","sub"]]), "CostFOB");
  
  XLSX.writeFile(wb, fn);
}

function downloadFile(type) {
  var fn = "", data = [], sheetName = "";
  if (type === 0) { fn = "Gia_ban_toi_thieu.xlsx"; data = DATA_PRODUCTS; sheetName = "Products"; }
  else if (type === 1) { fn = "Surcharge_bao_bi.xlsx"; data = DATA_BAGS; sheetName = "Bags"; }
  else if (type === 2) { fn = "Quy_cach_khac.xlsx"; data = DATA_OTHERS; sheetName = "Others"; }
  else if (type === 3) {
    fn = "Max_loadding.xlsx";
    var mlArr = [];
    if (DATA_MAX_LOADING && Object.keys(DATA_MAX_LOADING).length > 0) {
      Object.keys(DATA_MAX_LOADING).forEach(function(k) {
        var o = {"SẢN PHẨM": k};
        if (DATA_MAX_LOADING[k].max25 !== undefined) o["Max Loading 25KG"] = DATA_MAX_LOADING[k].max25;
        if (DATA_MAX_LOADING[k].maxJumbo !== undefined) o["Max Loading Jumbo"] = DATA_MAX_LOADING[k].maxJumbo;
        mlArr.push(o);
      });
    }
    data = mlArr;
    sheetName = "MaxLoading";
  }
  if (!data.length) return;
  var ws = XLSX.utils.json_to_sheet(data);
  var wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, sheetName);
  XLSX.writeFile(wb, fn);
}

function downloadAsExcel() {
  var dt = new Date();
  var fn = "DT-FullData-" + dt.getFullYear() + "-" + (dt.getMonth() + 1) + "-" + dt.getDate() + ".xlsx";
  var wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(DATA_PRODUCTS), "Products");
  XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(DATA_BAGS), "Bags");
  XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(DATA_OTHERS), "Others");
  // Export MaxLoading if data exists
  if (DATA_MAX_LOADING && Object.keys(DATA_MAX_LOADING).length > 0) {
    var mlArr = [];
    Object.keys(DATA_MAX_LOADING).forEach(function(k) {
      var o = {code: k};
      if (DATA_MAX_LOADING[k].max25 !== undefined) o.max25 = DATA_MAX_LOADING[k].max25;
      if (DATA_MAX_LOADING[k].maxJumbo !== undefined) o.maxJumbo = DATA_MAX_LOADING[k].maxJumbo;
      mlArr.push(o);
    });
    XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(mlArr), "MaxLoading");
  }
  // Export CostFOB if data exists
  if (DATA_COST_FOB && Object.keys(DATA_COST_FOB).length > 0) {
    var cfArr = [];
    Object.keys(DATA_COST_FOB).forEach(function(k) {
      var o = {maxLoading: Number(k)};
      if (DATA_COST_FOB[k].no !== undefined) o.no = DATA_COST_FOB[k].no;
      if (DATA_COST_FOB[k].sub !== undefined) o.sub = DATA_COST_FOB[k].sub;
      cfArr.push(o);
    });
    XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(cfArr), "CostFOB");
  }
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
  status.style.display = "block";
  if (!file.name.match(/.xlsx?$/i)) {
    status.className = "manage-status-sm err";
    status.textContent = "❌ Only supports Excel files (.xlsx)";
    return;
  }
  status.className = "manage-status-sm loading";
  status.textContent = "⏳ Processing file...";
  var reader = new FileReader();
  reader.onload = function(e) {
    try {
      var data = new Uint8Array(e.target.result);
      var wb = XLSX.read(data, {type: "array"});
      var sheets = wb.SheetNames;
      var updated = 0;
      
      // Try multiple sheet name variants
      function hasSheet(variants) {
        for (var i = 0; i < variants.length; i++) {
          if (sheets.indexOf(variants[i]) >= 0) return variants[i];
        }
        return null;
      }
      
      var prodSheet = hasSheet(["Products", "products", "Products", "product", "Product", "product", "Template", "Minimum Sell Price", "min sell price", "Sell Price", "Sell Price", "Price"]);
      if (prodSheet) {
        var s = XLSX.utils.sheet_to_json(wb.Sheets[prodSheet]);
        if (s.length > 0) { importProducts(s); updated++; }
      }
      
      var bagSheet = hasSheet(["Bags", "bags", "Packaging", "packaging", "Bao", "bao", "Bag"]);
      if (bagSheet) {
        var s = XLSX.utils.sheet_to_json(wb.Sheets[bagSheet]);
        if (s.length > 0) { DATA_BAGS = s; updated++; }
      }
      
      var otherSheet = hasSheet(["Others", "others", "Other Specs", "Other", "other"]);
      if (otherSheet) {
        var s = XLSX.utils.sheet_to_json(wb.Sheets[otherSheet]);
        if (s.length > 0) { DATA_OTHERS = s; updated++; }
      }
      
      var mlSheet = hasSheet(["MaxLoading", "maxloading", "Max Load", "max_load", "Max Load", "max load"]);
      if (mlSheet) {
        var s = XLSX.utils.sheet_to_json(wb.Sheets[mlSheet]);
        if (s.length > 0) { importMaxLoading(s); updated++; }
      }
      
      var fobSheet = hasSheet(["CostFOB", "Cost FOB", "costfob", "cost fob", "FOB", "fob", "Cost_FOB", "cost_fob", "Cost Fob"]);
      if (fobSheet) {
        var s = XLSX.utils.sheet_to_json(wb.Sheets[fobSheet]);
        if (s.length > 0) { importCostFOB(s); updated++; }
      }
      
      applyMarket();
      localStorage.setItem("dq_products", JSON.stringify(DATA_PRODUCTS));
      localStorage.setItem("dq_bags", JSON.stringify(DATA_BAGS));
      localStorage.setItem("dq_others", JSON.stringify(DATA_OTHERS));
      localStorage.setItem("dq_maxLoading", JSON.stringify(DATA_MAX_LOADING));
      localStorage.setItem("dq_costFOB", JSON.stringify(DATA_COST_FOB));
            document.getElementById("mProdCnt").textContent = DATA_PRODUCTS.length;
      document.getElementById("mBagCnt").textContent = DATA_BAGS.length;
      document.getElementById("mOtherCnt").textContent = DATA_OTHERS.length;
      populateFilters();
      render();
      status.className = "manage-status-sm ok";
      status.textContent = "✅ Updated " + updated + " data tables!";
    } catch(err) {
      status.className = "manage-status-sm err";
      status.textContent = "❌ Error: " + err.message;
    }
  };
  reader.readAsArrayBuffer(file);
}function importMaxLoading(arr) {
  DATA_MAX_LOADING = {};
  arr.forEach(function(r) {
    // Support Vietnamese column names from Max_loadding.xlsx
    var code = r.code || r.Code || r.CodeSP || r.CodeSP_Standard || r["SẢN PHẨM"] || r["SAN PHAM"] || "";
    if (!code) return;
    var obj = {};
    var v25 = r.max25 || r["Max Loading 25KG"] || r["Max Loading 25kg"] || r["max25"] || r["Max25"];
    var vJb = r.maxJumbo || r["Max Loading Jumbo"] || r["Max Loading jumbo"] || r["maxJumbo"] || r["MaxJumbo"] || r["Max Jumbo"];
    if (v25 !== undefined && v25 !== null && v25 !== "") obj.max25 = Number(v25);
    if (vJb !== undefined && vJb !== null && vJb !== "") obj.maxJumbo = Number(vJb);
    if (Object.keys(obj).length > 0) DATA_MAX_LOADING[code] = obj;
  });
}

function importCostFOB(arr) {
  DATA_COST_FOB = {};
  arr.forEach(function(r) {
    var load = Number(r.maxLoading || r.MaxLoading || r.load || r.Load || r.tan || r.Tan || r["Ton"] || r["Max loadding"] || r["Max Loadding"]);
    if (!load) return;
    var obj = {};
    var vNo = r.no !== undefined ? r.no : r["No LCC"] || r["No lcc"];
    var vSub = r.sub !== undefined ? r.sub : r["Sub LCC"] || r["Sub lcc"];
    if (vNo !== undefined && vNo !== null && vNo !== "") obj.no = Number(vNo);
    if (vSub !== undefined && vSub !== null && vSub !== "") obj.sub = Number(vSub);
    if (Object.keys(obj).length > 0) DATA_COST_FOB[load] = obj;
  });
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
  sf.innerHTML = '<option value="">All Standards</option>';
  Object.keys(specSet).sort().forEach(function(s) {
    sf.innerHTML += '<option value="' + s.replace(/"/g, '&quot;') + '">' + s + '</option>';
  });
  sf.value = curSpec;
  mf.innerHTML = '<option value="">All Machines</option>';
  Object.keys(machSet).sort().forEach(function(m) {
    mf.innerHTML += '<option value="' + m.replace(/"/g, '&quot;') + '">' + m + '</option>';
  });
  mf.value = curMach;
}

// ====== RENDER BAGS TAB ======

function toggleMaxLoad() {
  var cols = document.querySelectorAll('.ml-toggle');
  var btn = document.getElementById('mlToggleBtn');
  var hidden = btn.textContent.indexOf('Hi\u1ec7n') >= 0;
  cols.forEach(function(el) { el.classList.toggle('ml-visible', hidden); });
  btn.textContent = hidden ? '\ud83d\udccb \u1ea8n max t\u1ea3i' : '\ud83d\udccb Hi\u1ec7n max t\u1ea3i';
}

function renderBagsTab() {
  var h = '<div class="table-wrap" style="margin-top:0"><table><thead>';
  h += '<tr><th colspan="4">Packaging Info</th><th colspan="2">Price</th></tr>';
  h += '<tr><th>Bag Code</th><th>Spec</th><th>Qty</th><th>Cost Price</th><th>Sell Price</th><th>Profit</th></tr>';
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
  h += '<div class="summary-card"><div class="lbl">Total Bag Types</div><div class="val">' + DATA_BAGS.length + '</div></div>';
  var bag25 = DATA_BAGS.filter(function(b) { return b.spec === '25KG'; }).length;
  var bagJumbo = DATA_BAGS.filter(function(b) { return b.spec === 'Jumbo'; }).length;
  h += '<div class="summary-card"><div class="lbl">25KG Bags</div><div class="val">' + bag25 + '</div></div>';
  h += '<div class="summary-card"><div class="lbl">Jumbo Bags</div><div class="val">' + bagJumbo + '</div></div>';
  h += '</div>';
  return h;
}

// ====== RENDER OTHERS TAB ======
function renderOthersTab() {
  var h = '<div class="table-wrap" style="margin-top:0"><table><thead>';
  h += '<tr><th>Other Specs</th><th>Cost Price</th><th>Sell Price</th><th>Profit</th></tr>';
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
  h += '<div class="summary-card"><div class="lbl">Total Specs</div><div class="val">' + DATA_OTHERS.length + '</div></div>';
  h += '</div>';
  return h;
}

// ====== MAIN RENDER ======
function render() {
  var container = document.getElementById("mainContainer");
  if (!container) return;
  
  // Control bar visibility (safe redundant call)
  var cbar = document.getElementById("controlBar");
  if (cbar) cbar.style.display = (activeTab === "pricelist") ? "flex" : "none";
  var pBar = document.getElementById("priceModeBar");
  if (pBar) pBar.style.display = (activeTab === "pricelist") ? "flex" : "none";
  
  if (activeTab === "pricelist") populateFilters();
  
  if (activeTab === "pricelist") {
    container.innerHTML = renderPriceTab();
  } else if (activeTab === "bags") {
    container.innerHTML = renderBagsTab();
  } else if (activeTab === "others") {
    container.innerHTML = renderOthersTab();
  } else if (activeTab === "calc") {
    container.innerHTML = renderCalcTab();
    setTimeout(function(){ filterCalcProducts(); filterBagSpec();
    // Sync calc currency toggle with current global currency
    var vndBtn = document.getElementById("calcCcyVnd");
    var usdBtn = document.getElementById("calcCcyUsd");
    if (vndBtn && usdBtn) {
      vndBtn.classList.toggle("active", currency === "VND");
      usdBtn.classList.toggle("active", currency === "USD");
    }
  }, 0);
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


// ====== FREIGHT LOOKUP POPUP ======
var selectedFreightRoute = null;

function showFreightPopup() {
  var popup = document.getElementById("freightPopup");
  if (!popup) return;
  
  // Populate filters
  var countries = {}, forwarders = {}, vias = {};
  FREIGHT_DATA.forEach(function(r) {
    countries[r.country] = true;
    forwarders[r.forwarder] = true;
    vias[r.via] = true;
  });
  
  var cf = document.getElementById("freightCountryFilter");
  var ff = document.getElementById("freightForwarderFilter");
  var vf = document.getElementById("freightViaFilter");
  
  if (cf) {
    var cur = cf.value;
    cf.innerHTML = '<option value="">All Countries</option>';
    Object.keys(countries).sort().forEach(function(c) { cf.innerHTML += '<option value="' + c + '">' + c + '</option>'; });
    cf.value = cur;
  }
  if (ff) {
    var cur = ff.value;
    ff.innerHTML = '<option value="">All Forwarders</option>';
    Object.keys(forwarders).sort().forEach(function(f) { ff.innerHTML += '<option value="' + f + '">' + f + '</option>'; });
    ff.value = cur;
  }
  if (vf) {
    var cur = vf.value;
    vf.innerHTML = '<option value="">All Types</option>';
    Object.keys(vias).sort().forEach(function(v) { vf.innerHTML += '<option value="' + v + '">' + v + '</option>'; });
    vf.value = cur;
  }
  
  selectedFreightRoute = null;
  document.getElementById("freightSearch").value = "";
  filterFreightRoutes();
  popup.classList.add("open");
}

function closeFreightPopup() {
  document.getElementById("freightPopup").classList.remove("open");
}

function filterFreightRoutes() {
  var search = (document.getElementById("freightSearch").value || "").toLowerCase().trim();
  var country = document.getElementById("freightCountryFilter").value;
  var forwarder = document.getElementById("freightForwarderFilter").value;
  var via = document.getElementById("freightViaFilter").value;
  
  var filtered = FREIGHT_DATA.filter(function(r) {
    if (search && r.port.toLowerCase().indexOf(search) < 0 && r.country.toLowerCase().indexOf(search) < 0) return false;
    if (country && r.country !== country) return false;
    if (forwarder && r.forwarder !== forwarder) return false;
    if (via && r.via !== via) return false;
    return true;
  });
  
  var tbody = document.getElementById("freightTableBody");
  var count = document.getElementById("freightCount");
  if (count) count.textContent = filtered.length + " routes";
  if (!tbody) return;
  
  tbody.innerHTML = "";
  filtered.forEach(function(r) {
    var tr = document.createElement("tr");
    tr.dataset.index = FREIGHT_DATA.indexOf(r);
    tr.innerHTML = '<td>' + r.port + '</td><td>' + r.country + '</td><td class="freight-val">$' + r.freight + '</td><td>' + r.forwarder + '</td><td>' + r.via + '</td>';
    tr.onclick = function() {
      tbody.querySelectorAll("tr").forEach(function(t) { t.classList.remove("selected"); });
      this.classList.add("selected");
      selectedFreightRoute = r;
    };
    tbody.appendChild(tr);
  });
}

function selectFreightRoute() {
  if (!selectedFreightRoute) return;
  var input = document.getElementById("calcFreightInput");
  if (input) input.value = selectedFreightRoute.freight;
  setCalcFreight(selectedFreightRoute.freight);
  closeFreightPopup();
}



// ====== QUOTATION POPUP ======
function showQuotationPopup() {
  var data = getCalcPriceData();
  if (!data) {
    alert("Select product & calculate price first!");
    return;
  }
  document.getElementById("quotationPopup").classList.add("open");
  updateQuotationPreview();
  var now = new Date();
  var dd = String(now.getDate()).padStart(2,"0");
  var mm = String(now.getMonth()+1).padStart(2,"0");
  var yy = now.getFullYear();
  var hh = String(now.getHours()).padStart(2,"0");
  var min = String(now.getMinutes()).padStart(2,"0");
  var rand = String(Math.floor(1000+Math.random()*9000));
  var code = dd+mm+yy+hh+min+rand;
  var qn = parseInt(localStorage.getItem("dq_quote_num")||"0")+1;
  localStorage.setItem("dq_quote_num",String(qn));
  document.getElementById("qDateSpan").textContent = "Code: "+code+" | No: "+qn+" | "+dd+"/"+mm+"/"+yy;
  document.getElementById("qPreviewBody").scrollTop = 0;
}
function closeQuotationPopup() {
  document.getElementById("quotationPopup").classList.remove("open");
}
function getCalcPriceData() {
  var psel=document.getElementById("calcProduct"), bsel=document.getElementById("calcBag");
  var bagSpecSel=document.getElementById("calcBagSpec"), sp=document.getElementById("calcSellPrice");
  if (!psel||!psel.value) return null;
  var prod=null;
  for (var i=0;i<DATA_PRODUCTS.length;i++) { if (DATA_PRODUCTS[i].code===psel.value) { prod=DATA_PRODUCTS[i]; break; } }
  if (!prod) return null;
  var isUsd=currency==="USD";
  var cc=isUsd?"USD":"VND";
  var bs=bagSpecSel?bagSpecSel.value:"25KG";
  var bcode=bsel?bsel.value:"";
  var bagLabel="";
  if (bcode) { for (var i=0;i<DATA_BAGS.length;i++) { if (DATA_BAGS[i].code===bcode) { bagLabel=DATA_BAGS[i].spec; break; } } }
  else { bagLabel=bs; }
  var sellPrice=sp&&sp.value?parseFloat(sp.value):0;
  var modeStr=calcPriceMode.toUpperCase();
  if (calcPriceMode==="fob") modeStr+=" ("+(calcLccType==="sub"?"Sub LCC":"No LCC")+")";
  if (calcPriceMode==="cif") modeStr+=" ("+(calcLccType==="sub"?"Sub":"No")+")";
  var spec="";
  if (prod.d50) spec+="D50: "+prod.d50;
  if (prod.d97) spec+=(spec?" | ":"")+"D97: "+prod.d97;
  if (prod.whiteness) spec+=(spec?" | ":"")+"White: "+prod.whiteness;
  if (prod.brightness) spec+=(spec?" | ":"")+"Bright: "+prod.brightness;
  return {
    product: prod.code+" - "+prod.size,
    code: prod.code,
    size: prod.size,
    machine: prod.machine,
    standard: prod.standard,
    spec: spec,
    bagSpec: bagLabel,
    bagCode: bcode||bagLabel,
    isJumbo: bs==="Jumbo",
    mode: modeStr,
    totalPrice: sellPrice,
    cc: cc,
    isUsd: isUsd
  };
}
function updateQuotationPreview() {
  var data=getCalcPriceData();
  if (!data) return;
  var content=document.getElementById("qPreviewContent");
  var customer=document.getElementById("qCustomer").value||"______________________";
  var contact=document.getElementById("qContact").value||"";
  var assigned=document.getElementById("qAssigned").value||"";
  var custEmail=document.getElementById("qCustEmail").value||"";
  var qty=parseFloat(document.getElementById("qQty").value)||1;
  var valid=document.getElementById("qValid").value;
  var payment=document.getElementById("qPayment").value;
  var port=document.getElementById("qPort").value||"";
  var delivery=document.getElementById("qDelivery").value;
  var note=document.getElementById("qNote").value;
  if (!data) {
    content.innerHTML="<p style=\"text-align:center;color:#94a3b8;font-size:13px\">Select product & calculate price first</p>";
    return;
  }
  var totalFmt=data.totalPrice>0?data.totalPrice.toLocaleString("en-US",data.isUsd?{minimumFractionDigits:0,maximumFractionDigits:2}:{}):"__________";
  var now=new Date();
  var dd=String(now.getDate()).padStart(2,"0");
  var mm=String(now.getMonth()+1).padStart(2,"0");
  var yy=now.getFullYear();
  var dateStr=dd+"/"+mm+"/"+yy;
  var h="";
  h+="<p style=\"text-align:center;font-weight:700;font-size:14px;color:#1e293b;margin:0 0 16px\">📄 QUOTATION</p>";
  h+="<div class=\"q-row\"><strong>Customer:</strong><span>"+customer+"</span></div>";
  if (contact) h+="<div class=\"q-row\"><strong>Contact:</strong><span>"+contact+"</span></div>";
  if (assigned) h+="<div class=\"q-row\"><strong>PIC:</strong><span>"+assigned+"</span></div>";
  if (custEmail) h+="<div class=\"q-row\"><strong>Email:</strong><span>"+custEmail+"</span></div>";
  h+="<div class=\"q-row\"><strong>Date:</strong><span>"+dateStr+"</span></div>";
  if (port) h+="<div class=\"q-row\"><strong>Port of Loading:</strong><span>"+port+"</span></div>";
  h+="<table class=\"q-table\">";
  h+="<thead><tr><th>No.</th><th>Code</th><th>Product Name</th><th>Spec</th><th>Bag Spec</th><th>Unit</th><th>Qty</th><th>Price</th><th>Currency</th></tr></thead>";
  h+="<tbody>";
  h+="<tr><td>1</td><td>"+data.code+"</td><td>"+data.size+"</td><td style=\"font-size:11px\">"+data.spec+"</td><td>"+data.bagSpec+"</td><td>Ton</td><td>"+qty+"</td><td style=\"font-weight:700\">"+totalFmt+"</td><td>"+data.cc+"</td></tr>";
  h+="</tbody></table>";
  h+="<div class=\"q-terms\">";
  h+="<div class=\"q-row\"><strong>Delivery Terms:</strong><span>"+delivery+"</span></div>";
  if (port&&(delivery==="FOB"||delivery==="CIF")) h+="<div class=\"q-row\"><strong>Port of Loading:</strong><span>"+port+"</span></div>";
  h+="<div class=\"q-row\"><strong>Condition:</strong><span>"+data.mode+"</span></div>";
  h+="<div class=\"q-row\"><strong>Validity:</strong><span>"+valid+"</span></div>";
  h+="<div class=\"q-row\"><strong>Payment:</strong><span>"+payment+"</span></div>";
  if (note) h+="<div class=\"q-row\"><strong>Note:</strong><span>"+note+"</span></div>";
  h+="</div>";
  h+="<div class=\"q-footer\">";
  h+="- Price excludes VAT<br>";
  h+="- "+(delivery==="At Duc Thinh Factory"?"Price excl. delivery to buyer warehouse":"Price incl. delivery to buyer warehouse")+"<br>";
  h+="- This quotation is valid for "+valid+"<br>";
  h+="- Min qty: 1x20ft container (~21 tons)";
  h+="</div>";
  content.innerHTML=h;
}
function getQuotationText() {
  var data=getCalcPriceData();
  if (!data) return "No product data";
  var customer=document.getElementById("qCustomer").value||"______________________";
  var contact=document.getElementById("qContact").value||"";
  var assigned=document.getElementById("qAssigned").value||"";
  var custEmail=document.getElementById("qCustEmail").value||"";
  var qty=parseFloat(document.getElementById("qQty").value)||1;
  var valid=document.getElementById("qValid").value;
  var payment=document.getElementById("qPayment").value;
  var port=document.getElementById("qPort").value||"";
  var delivery=document.getElementById("qDelivery").value;
  var note=document.getElementById("qNote").value;
  var totalFmt=data.totalPrice>0?data.totalPrice.toLocaleString("en-US",data.isUsd?{minimumFractionDigits:0,maximumFractionDigits:2}:{}):"__________";
  var now=new Date();
  var dd=String(now.getDate()).padStart(2,"0");
  var mm=String(now.getMonth()+1).padStart(2,"0");
  var yy=now.getFullYear();
  var dateStr=dd+"/"+mm+"/"+yy;
  var t=COMPANY+"\n";
  t+=ADDR+"\n";
  t+="Email: "+EMAIL+" - "+WEBSITE+"\n";
  t+="Tel: "+PHONE+" Ext: "+EXT+" - MST: "+MST+"\n";
  t+="──────────────────────────────────────────────────\n";
  t+="📄 QUOTATION\n";
  t+="──────────────────────────────────────────────────\n";
  t+="Customer: "+customer+"\n";
  if (contact) t+="Contact: "+contact+"\n";
  if (assigned) t+="PIC: "+assigned+"\n";
  if (custEmail) t+="Email: "+custEmail+"\n";
  t+="Date: "+dateStr+"\n";
  t+="──────────────────────────────────────────────────\n";
  t+="Products: "+data.product+"\n";
  t+="Spec: "+data.spec+"\n";
  t+="Bag Spec: "+data.bagSpec+"\n";
  t+="Qty: "+qty+" tons\n";
  t+="Condition: "+data.mode+"\n";
  if (port) t+="Port of Loading: "+port+"\n";
  t+="Delivery Terms: "+delivery+"\n";
  t+="──────────────────────────────────────────────────\n";
  t+="Sell Price: "+totalFmt+" "+data.cc+" / ton\n";
  t+="──────────────────────────────────────────────────\n";
  t+="Validity: "+valid+"\n";
  t+="Payment: "+payment+"\n";
  if (note) t+="Note: "+note+"\n";
  t+="\n";
  t+="- Price excludes VAT\n";
  t+="- "+(delivery==="At Duc Thinh Factory"?"Price excluding delivery cost":"Price including delivery cost")+"\n";
  t+="- This quotation is valid for "+valid+"\n";
  return t;
}
function copyQuotation() {
  var txt=getQuotationText();
  if (navigator.clipboard) { navigator.clipboard.writeText(txt).then(function(){alert("✅ Quote copied to clipboard");}); }
  else { prompt("Copy the text below:",txt); }
}
function printQuotation() {
  var data=getCalcPriceData();
  if (!data) return alert("Select Product and calculate price first!");
  var customer=document.getElementById("qCustomer").value||"______________________";
  var contact=document.getElementById("qContact").value||"";
  var assigned=document.getElementById("qAssigned").value||"";
  var custEmail=document.getElementById("qCustEmail").value||"";
  var qty=parseFloat(document.getElementById("qQty").value)||1;
  var valid=document.getElementById("qValid").value;
  var payment=document.getElementById("qPayment").value;
  var port=document.getElementById("qPort").value||"";
  var delivery=document.getElementById("qDelivery").value;
  var note=document.getElementById("qNote").value;
  var totalFmt=data.totalPrice>0?data.totalPrice.toLocaleString("en-US",data.isUsd?{minimumFractionDigits:0,maximumFractionDigits:2}:{}):"__________";
  var now=new Date();
  var dd=String(now.getDate()).padStart(2,"0");
  var mm=String(now.getMonth()+1).padStart(2,"0");
  var yy=now.getFullYear();
  var dateStr=dd+"/"+mm+"/"+yy;
  var w=window.open("","_blank");
  w.document.write('<!DOCTYPE html><html><head><meta charset="utf-8"><title>Quotation - '+data.product+'</title>');
  w.document.write('<style>body{font-family:"Arial",sans-serif;padding:40px;max-width:780px;margin:0 auto;color:#1e293b}h1{font-size:22px;text-align:center;margin:0 0 4px;text-transform:uppercase;letter-spacing:.05em}.sub{text-align:center;color:#64748b;font-size:12px;margin:0 0 20px;line-height:1.5}.divider{height:2px;background:#2563eb;margin:0 0 16px}.title{text-align:center;font-weight:700;font-size:15px;margin:0 0 20px}table{width:100%;border-collapse:collapse;font-size:12px;margin-bottom:16px}th{background:#f1f5f9;text-align:left;padding:8px 6px;font-size:11px;text-transform:uppercase;color:#475569;border:1px solid #e2e8f0}td{padding:8px 6px;border:1px solid #e2e8f0}.row{display:flex;justify-content:space-between;padding:5px 0;font-size:13px;border-bottom:1px solid #f1f5f9}.row strong{color:#1e293b}.row span{color:#475569}.footer{margin-top:20px;font-size:11px;color:#94a3b8;line-height:1.6}@media print{body{padding:20px}}</style></head><body>');
  w.document.write('<h1>'+COMPANY+'</h1>');
  w.document.write('<p class="sub">'+ADDR+'<br>Email: '+EMAIL+' - '+WEBSITE+'<br>Tel: '+PHONE+' Ext: '+EXT+' - MST: '+MST+'</p>');
  w.document.write('<div class="divider"></div>');
  w.document.write('<p class="title">📄 QUOTATION</p>');
  w.document.write('<div class="row"><strong>Customer:</strong><span>'+customer+'</span></div>');
  if (contact) w.document.write('<div class="row"><strong>Contact:</strong><span>'+contact+'</span></div>');
  if (assigned) w.document.write('<div class="row"><strong>PIC:</strong><span>'+assigned+'</span></div>');
  if (custEmail) w.document.write('<div class="row"><strong>Email:</strong><span>'+custEmail+'</span></div>');
  w.document.write('<div class="row"><strong>Date:</strong><span>'+dateStr+'</span></div>');
  if (port) w.document.write('<div class="row"><strong>Port of Loading:</strong><span>'+port+'</span></div>');
  w.document.write('<table><thead><tr><th>No.</th><th>Code</th><th>Product Name</th><th>Spec</th><th>Bag Spec</th><th>Unit</th><th>Qty</th><th>Price</th><th>Currency</th></tr></thead><tbody>');
  w.document.write('<tr><td>1</td><td>'+data.code+'</td><td>'+data.size+'</td><td style="font-size:11px">'+data.spec+'</td><td>'+data.bagSpec+'</td><td>Ton</td><td>'+qty+'</td><td><strong>'+totalFmt+'</strong></td><td>'+data.cc+'</td></tr>');
  w.document.write('</tbody></table>');
  w.document.write('<div class="row"><strong>Delivery Terms:</strong><span>'+delivery+'</span></div>');
  w.document.write('<div class="row"><strong>Condition:</strong><span>'+data.mode+'</span></div>');
  w.document.write('<div class="row"><strong>Validity:</strong><span>'+valid+'</span></div>');
  w.document.write('<div class="row"><strong>Payment:</strong><span>'+payment+'</span></div>');
  if (note) w.document.write('<div class="row"><strong>Note:</strong><span>'+note+'</span></div>');
  w.document.write('<div class="footer">- Price excludes VAT<br>- '+(delivery==="At Duc Thinh Factory"?"Price excl. delivery to buyer warehouse":"Price incl. delivery to buyer warehouse")+'<br>- This quotation is valid for '+valid+'<br>- Min qty: 1x20ft container (~21 tons)<br><br><strong>'+COMPANY_EN+'</strong></div>');
  w.document.write('</body></html>');
  w.document.close();
  setTimeout(function(){w.print();},500);
}
function fmtNum(n, isUsd) {
  if (isUsd) return n.toLocaleString('en-US', {minimumFractionDigits:1, maximumFractionDigits:2});
  return Math.round(n).toLocaleString();
}
var saved = localStorage.getItem("dq_products");
if (saved) {
  try { DATA_PRODUCTS = JSON.parse(saved); } catch(e) {}
}
var savedBags = localStorage.getItem("dq_bags");
if (savedBags) {
  try { DATA_BAGS = JSON.parse(savedBags); } catch(e) {}
}
var savedOthers = localStorage.getItem("dq_others");
if (savedOthers) {
  try { DATA_OTHERS = JSON.parse(savedOthers); } catch(e) {}
}
var savedML = localStorage.getItem("dq_maxLoading");
if (savedML) {
  try { DATA_MAX_LOADING = JSON.parse(savedML); } catch(e) {}
}
var savedCF = localStorage.getItem("dq_costFOB");
if (savedCF) {
  try { DATA_COST_FOB = JSON.parse(savedCF); } catch(e) {}
}
applyMarket();
switchTab("pricelist");