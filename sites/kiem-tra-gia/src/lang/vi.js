// ============================================================
// src/lang/vi.js — Vietnamese strings (base/reference)
// Template uses {{KEY}} placeholders; JS strings use Vietnamese
// ============================================================

// Template placeholders
var LANG_TEMPLATE = {
  HTML_TITLE: "Kiểm Tra Giá - Vật Liệu Mới Đức Thịnh",
  TITLE: "Kiểm Tra Giá",
  SUBTITLE: "Vật Liệu Mới Đức Thịnh - Bảng giá tháng 06/2026",
  BADGE_COMPANY: "🏭 VL MỚI ĐỨC THỊNH",

  TAB_PRICE: "📋 Giá bán",
  TAB_PRICE_SUB: "Bảng giá sản phẩm",
  TAB_BAGS: "📦 Bao bì",
  TAB_BAGS_SUB: "Giá bao bì",
  TAB_OTHERS: "📐 Quy cách khác",
  TAB_OTHERS_SUB: "Các quy cách khác",
  TAB_CALC: "📝 Tính giá",
  TAB_CALC_SUB: "Tính giá bán",
  TAB_MANAGE: "⚙️ Quản lý",
  TAB_MANAGE_SUB: "Dữ liệu & upload",
  TAB_APPS: "📋 Ứng Dụng",
  TAB_APPS_SUB: "Sản phẩm theo ứng dụng",
  TAB_QUOTATION: "📄 Báo giá",
  TAB_QUOTATION_SUB: "Lên báo giá",

  SEARCH_PLACEHOLDER: "🔍 Tìm sản phẩm...",
  FILTER_ALL_STANDARDS: "Tất cả tiêu chuẩn",
  FILTER_ALL_SIZES: "Tất cả kích thước",
  FILTER_ALL_MACHINES: "Tất cả máy",
  RESET_FILTERS_TITLE: "Bỏ lọc",
  NO_RESULTS: "Không tìm thấy sản phẩm nào.",

  // Price list table headers
  PL_CODE: "Mã SP",
  PL_SIZE: "Kích thước",
  PL_PACK: "Bao bì",
  PL_EXW_VND: "EXW (VND)",
  PL_FOB_VND: "FOB 25 (VND)",
  PL_CIF_VND: "CIF 25 (VND)",
  PL_EXW_USD: "EXW (USD)",
  PL_FOB_USD: "FOB 25 (USD)",
  PL_CIF_USD: "CIF 25 (USD)",
  EXW_HEADER: "EXW (VND)",
  PACK_25KG: "25KG",
  PACK_SPEC: "Quy cách",

  // Bags tab
  BAGS_TITLE: "📦 Danh sách bao bì",
  BAGS_CODE: "Loại bao",
  BAGS_SPEC: "Quy cách",
  BAGS_PRICE: "Đơn giá (VND)",
  BAGS_EMPTY: "Chưa có dữ liệu bao bì.",

  // Others tab
  OTHERS_TITLE: "📐 Quy cách khác",
  OTHERS_EMPTY: "Chưa có dữ liệu.",
  OTHERS_NOT_FOUND: "Chưa có dữ liệu quy cách khác.",

  // Calc tab
  CALC_TITLE: "📝 Tính giá bán",
  CALC_PRODUCT: "Sản phẩm:",
  CALC_BAG_SPEC: "Quy cách bao:",
  CALC_25KG: "25KG",
  CALC_JUMBO: "Jumbo",
  CALC_OTHERS: "Quy cách khác:",
  CALC_NONE: "Không",
  CALC_BAGS: "Loại bao:",
  CALC_DEFAULT: "Mặc định",
  CALC_QTY: "Số lượng (tấn):",
  CALC_DELIVERY: "Điều kiện:",
  CALC_COST: "Giá gốc:",
  CALC_COMMISSION: "Hoa hồng ~30%:",
  CALC_MIN_PRICE: "Giá tối thiểu:",
  CALC_RECOMMENDED_PRICE_EXW: "Giá bán đề xuất (EXW):",
  CALC_RECOMMENDED_PRICE: "Giá bán đề xuất ({mode}):",
  CALC_MIN: "TỐI THIỂU",
  CALC_EMPTY: "👈 Chọn sản phẩm và các thông số để tính giá.",
  CALC_SETTING_BAG: "(chưa bao bì)",
  CALC_INCLUDED_BAG: "(cả bao bì)",

  // Manage tab (template)
  MANAGE_TITLE: "⚙️ Quản lý dữ liệu",
  MANAGE_DESC: "Quản lý dữ liệu sản phẩm, bao bì và quy cách khác.",
  MANAGE_PASS_PLACEHOLDER: "Nhập mật khẩu...",
  MANAGE_LOGIN_BTN: "🔓 Đăng nhập",
  MANAGE_CARD_PRODUCTS: "Sản phẩm",
  MANAGE_CARD_BAGS: "Bao bì",
  MANAGE_CARD_OTHERS: "QC khác",
  MANAGE_CARD_APPS: "Ứng dụng",
  MANAGE_CARD_UPDATED: "Cập nhật",
  MANAGE_UPLOAD_TITLE: "📤 Tải lên",
  MANAGE_DOWNLOAD_TITLE: "📥 Tải xuống",
  MANAGE_DOWNLOAD_PRICE: "📋 Bảng giá",
  MANAGE_DOWNLOAD_BAGS: "📦 Bao bì",
  MANAGE_DOWNLOAD_OTHERS: "📐 Quy cách khác",
  MANAGE_DOWNLOAD_APPS: "📋 Ứng Dụng",
  MANAGE_DRAG_TEXT: "Kéo thả file vào đây",
  MANAGE_DRAG_SUB: "hoặc bấm để chọn",

  // Freight (template)
  LCC_LABEL: "📦 LCC:",
  FREIGHT_TITLE: "🚢 Cước vận chuyển",
  FREIGHT_SEARCH: "🔍 Tìm kiếm...",
  FREIGHT_SELECT: "🚢 Chọn tuyến",
  FREIGHT_LABEL: "🚢 Cước:",
  FREIGHT_FILTER_COUNTRY: "Tất cả nước",
  FREIGHT_FILTER_FORWARDER: "Tất cả hãng",
  FREIGHT_FILTER_VIA: "Tất cả loại",
  FREIGHT_TABLE_FROM: "Cảng đi",
  FREIGHT_TABLE_TO: "Nước đến",
  FREIGHT_TABLE_RATE: "Cước (USD)",
  FREIGHT_TABLE_FORWARDER: "Hãng",
  FREIGHT_TABLE_VIA: "Loại",
  FREIGHT_CLOSE: "Đóng",

  // Password modal (template)
  PW_MODAL_TITLE: "🔒 Nhập mật khẩu",
  PW_MODAL_DESC: "Vui lòng nhập mật khẩu quản trị để tiếp tục.",
  PW_MODAL_PLACEHOLDER: "Mật khẩu...",
  PW_MODAL_ERROR: "❌ Sai mật khẩu!",
  PW_MODAL_CANCEL: "Hủy",
  PW_MODAL_CONFIRM: "Xác nhận",

  // Market
  MARKET_LABEL: "🌏 Thị trường:",
  MARKET_CN: "🇨🇳 TQ",
  MARKET_OTHER: "🌏 Khác",

  // Company
  COMPANY_NAME: "CÔNG TY TNHH CÔNG NGHỆ VẬT LIỆU MỚI ĐỨC THỊNH",
  COMPANY_ADDR: "ĐC: KCN NGHĨA ĐÀN, XÃ NGHĨA THỌ, TỈNH NGHỆ AN, VIỆT NAM",

  // Quotation Tab
  Delivery_Terms: "Delivery Terms",
  Currency: "Loại tiền",
  Market: "Thị trường",
  Market_Other: "Khác",
  Market_CN: "TQ",
  Q_QTY_UNIT: "ĐVT",
  Products: "Sản phẩm",
  Add_Product: "Thêm SP",
  Select_Product: "Chọn sản phẩm",
  Product: "Sản phẩm",
  Bag_Spec: "Quy cách bao",
  Bag: "Bao",
  Default_Bag: "Mặc định",
  Q_QTY_LABEL: "SL",
  Tons_Jumbo: "Tấn/bao",
  Select: "Chọn",
  Other_Spec: "QC khác",
  None: "Không",
  Tons_Unit: "Tấn/ĐV",
  Selling_Price: "Giá bán",
  Min_Price: "Giá tối thiểu",
  Commission: "Hoa hồng",
  Specs: "Thông số KT",
  Select_product_first: "Chọn SP trước",
  Clear: "Xóa",
  Print: "In",
  Copy: "Copy",
  Q_PREVIEW_EMPTY_QUOT: "👈 Chọn sản phẩm và điền thông tin",

  // Others (non-template)
  Q_VALID_7: "7 ngày",
  Q_VALID_FROM_SIGN: "Kể từ ngày ký",
};

// JS strings (used in modules)
var LANG = {
  // Price list
  EXW_HEADER: 'EXW (VND)',
  FOB_HEADER: 'FOB 25 (VND)',
  CIF_HEADER: 'CIF 25 (VND)',
  PACK_25KG: '25KG',
  PACK_SPEC: 'Quy cách',
  NO_RESULTS: 'Không tìm thấy sản phẩm nào.',

  // Bags
  BAGS_EMPTY: 'Chưa có dữ liệu bao bì.',

  // Others
  OTHERS_EMPTY: 'Chưa có dữ liệu.',
  OTHERS_NOT_FOUND: 'Chưa có dữ liệu quy cách khác.',

  // Calc
  CALC_EMPTY: '👈 Chọn sản phẩm và các thông số để tính giá.',
  CALC_SETTING_BAG: '(chưa bao bì)',
  CALC_INCLUDED_BAG: '(cả bao bì)',
  CALC_MIN: 'TỐI THIỂU',
  CALC_NONE: 'Không',
  CALC_DEFAULT: 'Mặc định',

  // Manage
  MANAGE_UPLOAD: '📤 Tải lên',
  MANAGE_DRAG_TEXT: 'Kéo thả file vào đây',
  MANAGE_DRAG_SUB: 'hoặc bấm để chọn',
  MANAGE_UPLOAD_BUTTON: '🔄 Tải dữ liệu lên',
  MANAGE_DOWNLOAD_BUTTON: '📥 Tải file Excel',
  MANAGE_SYNC_BUTTON: '🔄 Đồng bộ',
  MANAGE_SYNC_SUB: 'Sao chép dữ liệu sang en/zh',
  MANAGE_SYNC_STATUS: 'Sẵn sàng đồng bộ',
  MANAGE_AUTO_SYNC: 'Tự động đồng bộ',
  MANAGE_AUTO_SUB: 'Lưu đồng bộ sang EN/ZH',

  // Freight
  FREIGHT_SEARCH: '🔍 Tìm kiếm...',
  FREIGHT_SELECT: '🚢 Chọn tuyến',
  FREIGHT_CLOSE: 'Đóng',

  // Market
  MARKET_LABEL: '🌏 Thị trường:',
  MARKET_CN: '🇨🇳 TQ',
  MARKET_OTHER: '🌏 Khác',
};
