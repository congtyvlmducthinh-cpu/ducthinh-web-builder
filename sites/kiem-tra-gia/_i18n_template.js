var fs = require('fs');
var tpl = fs.readFileSync('src/template.html', 'utf-8');

var repls = [
  // Title & header
  ['<title>Kiểm Tra Giá - Vật Liệu Mới Đức Thịnh</title>', '<title>{{HTML_TITLE}}</title>'],
  ['<h1>Kiểm Tra Giá', '<h1>{{TITLE}}'],
  ['Vật Liệu Mới Đức Thịnh - Bảng giá tháng 06/2026', '{{SUBTITLE}}'],
  ['VL MỚI ĐỨC THỊNH', '{{BADGE_COMPANY}}'],

  // Tab buttons
  ['📋 Giá bán</span><br><small', '{{TAB_PRICE}}</span><br><small'],
  ['Bảng giá sản phẩm</small>', '{{TAB_PRICE_SUB}}</small>'],
  ['📦 Bao bì</span><br><small', '{{TAB_BAGS}}</span><br><small'],
  ['Giá bao bì</small>', '{{TAB_BAGS_SUB}}</small>'],
  ['📐 Quy cách khác</span><br><small', '{{TAB_OTHERS}}</span><br><small'],
  ['Các quy cách khác</small>', '{{TAB_OTHERS_SUB}}</small>'],
  ['📝 Tính giá</span><br><small', '{{TAB_CALC}}</span><br><small'],
  ['Tính giá bán</small>', '{{TAB_CALC_SUB}}</small>'],
  ['⚙️ Quản lý</span><br><small', '{{TAB_MANAGE}}</span><br><small'],
  ['Dữ liệu & upload</small>', '{{TAB_MANAGE_SUB}}</small>'],

  // Search & filters
  ['🔍 Tìm sản phẩm...', '{{SEARCH_PLACEHOLDER}}'],
  ['Tất cả tiêu chuẩn', '{{FILTER_ALL_STANDARDS}}'],
  ['Tất cả kích thước', '{{FILTER_ALL_SIZES}}'],
  ['Tất cả máy', '{{FILTER_ALL_MACHINES}}'],

  // Price mode bar
  ['Loại LCC:', '{{LCC_LABEL}}'],
  ['🚂 Cước biển:', '{{FREIGHT_LABEL}}'],

  // Manage section
  ['⚙️ Quản lý dữ liệu', '{{MANAGE_TITLE}}'],
  ['🔒 Nhập mật khẩu để tải / upload / cập nhật dữ liệu', '{{MANAGE_DESC}}'],
  ['🔑 Nhập mật khẩu...', '{{MANAGE_PASS_PLACEHOLDER}}'],
  ['🔑 Đăng nhập', '{{MANAGE_LOGIN_BTN}}'],
  ['Sản phẩm</div>', '{{MANAGE_CARD_PRODUCTS}}</div>'],
  ['Bao bì</div>', '{{MANAGE_CARD_BAGS}}</div>'],
  ['Quy cách khác</div>', '{{MANAGE_CARD_OTHERS}}</div>'],
  ['Cập nhật</div>', '{{MANAGE_CARD_UPDATED}}</div>'],
  ['⬇ Tải dữ liệu', '{{MANAGE_DOWNLOAD_TITLE}}'],
  ['📋 Giá bán</button>', '{{MANAGE_DOWNLOAD_PRICE}}</button>'],
  ['📦 Bao bì</button>', '{{MANAGE_DOWNLOAD_BAGS}}</button>'],
  ['📐 Quy cách khác</button>', '{{MANAGE_DOWNLOAD_OTHERS}}</button>'],
  ['📤 Upload dữ liệu mới', '{{MANAGE_UPLOAD_TITLE}}'],
  ['💾 Lưu lên server', '{{MANAGE_SAVE_SERVER}}'],

  // Password modal
  ['🔐 Nhập mật khẩu', '{{PW_MODAL_TITLE}}'],
  ['🔒 Chức năng quản lý yêu cầu mật khẩu', '{{PW_MODAL_DESC}}'],
  ['🔑 Nhập mật khẩu', '{{PW_MODAL_PLACEHOLDER}}'],
  ['❌ Sai mật khẩu!', '{{PW_MODAL_ERROR}}'],
  ['Hủy</button>', '{{PW_MODAL_CANCEL}}</button>'],
  ['Xác nhận</button>', '{{PW_MODAL_CONFIRM}}</button>'],

  // Quotation popup
  ['📝 Lên báo giá', '{{QUOTATION_TITLE}}'],
  ['🏢 Khách hàng</label>', '{{Q_CUSTOMER}}</label>'],
  ['Tên khách hàng...', '{{Q_CUSTOMER_PLACEHOLDER}}'],
  ['📞 Liên hệ</label>', '{{Q_CONTACT}}</label>'],
  ['Người liên hệ...', '{{Q_CONTACT_PLACEHOLDER}}'],
  ['👤 Người phụ trách</label>', '{{Q_ASSIGNED}}</label>'],
  ['Nhân viên phụ trách...', '{{Q_ASSIGNED_PLACEHOLDER}}'],
  ['📧 Email KH</label>', '{{Q_CUST_EMAIL}}</label>'],
  ['Email khách hàng...', '{{Q_CUST_EMAIL_PLACEHOLDER}}'],
  ['📦 Số lượng (tấn)</label>', '{{Q_QTY}}</label>'],
  ['⏱ Hiệu lực</label>', '{{Q_VALIDITY}}</label>'],
  ['💰 Điều kiện thanh toán</label>', '{{Q_PAYMENT}}</label>'],
  ['🚢 Cảng đi</label>', '{{Q_PORT}}</label>'],
  ['Cảng đi (nếu có)...', '{{Q_PORT_PLACEHOLDER}}'],
  ['📬 Giao hàng</label>', '{{Q_DELIVERY}}</label>'],
  ['Điều kiện giao hàng...', '{{Q_DELIVERY_PLACEHOLDER}}'],
  ['📝 Ghi chú</label>', '{{Q_NOTE}}</label>'],
  ['Ghi chú thêm...', '{{Q_NOTE_PLACEHOLDER}}'],
  ['15 ngày</option>', '{{Q_VALID_15}}</option>'],
  ['30 ngày</option>', '{{Q_VALID_30}}</option>'],
  ['T/T 30 ngày</option>', '{{Q_PAY_TT}}</option>'],
  ['L/C 60 ngày</option>', '{{Q_PAY_LC}}</option>'],

  // Quotation title
  ['CONG TY TNHH CONG NGHỆ VẬT LIỆU MỚI ĐỨC THỊNH', '{{COMPANY_NAME}}'],

  // Freight popup
  ['🚢 Chọn cước biển', '{{FREIGHT_TITLE}}'],
  ['🔍 Tìm cảng hoặc nước...', '{{FREIGHT_SEARCH}}'],
  ['Tất cả nước</option>', '{{FREIGHT_FILTER_COUNTRY}}</option>'],
  ['Tất cả hãng</option>', '{{FREIGHT_FILTER_FORWARDER}}</option>'],
  ['Tất cả loại</option>', '{{FREIGHT_FILTER_VIA}}</option>'],
  ['Cảng đi</th>', '{{FREIGHT_TABLE_FROM}}</th>'],
  ['Nước đến</th>', '{{FREIGHT_TABLE_TO}}</th>'],
  ['Cước (USD)</th>', '{{FREIGHT_TABLE_RATE}}</th>'],
  ['Hãng</th>', '{{FREIGHT_TABLE_FORWARDER}}</th>'],
  ['Loại</th>', '{{FREIGHT_TABLE_VIA}}</th>'],
  ['Đóng</button>', '{{FREIGHT_CLOSE}}</button>'],
  ['🚢 Chọn tuyến</button>', '{{FREIGHT_SELECT}}</button>'],
];

var count = 0;
repls.forEach(function(r) {
  if (tpl.indexOf(r[0]) >= 0) {
    tpl = tpl.replace(r[0], r[1]);
    count++;
  } else {
    console.log('NOT FOUND: ' + r[0].substring(0, 50));
  }
});

fs.writeFileSync('src/template.html', tpl, 'utf-8');
console.log('Replaced ' + count + '/' + repls.length + ' strings in template');
