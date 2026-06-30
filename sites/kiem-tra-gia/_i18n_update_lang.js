var fs = require('fs');

var langs = [
  { file: 'src/lang/vi.js', 
    data: { Q_VALID_7: '7 ngày', Q_VALID_FROM_SIGN: 'Kể từ ngày ký', COMPANY_NAME: 'CÔNG TY TNHH CÔNG NGHỆ VẬT LIỆU MỚI ĐỨC THỊNH', COMPANY_ADDR: 'ĐC: KCN NGHIA DAN, XA NGHIA THU, TINH NGHE AN, VIET NAM', MANAGE_SAVE_SERVER: '💾 Lưu lên server', MANAGE_DRAG_TEXT: 'Kéo thả file vào đây', MANAGE_DRAG_SUB: 'hoặc bấm để chọn', Q_PAY_TT: 'T/T 30 ngày', Q_PAY_LC: 'L/C 60 ngày', Q_VALID_15: '15 ngày', Q_VALID_30: '30 ngày' }
  },
  { file: 'src/lang/en.js',
    data: { Q_VALID_7: '7 days', Q_VALID_FROM_SIGN: 'From date of signing', COMPANY_NAME: 'DUC THINH NEW MATERIALS TECHNOLOGY COMPANY LIMITED', COMPANY_ADDR: 'Add: NGHIA DAN IZ, NGHIA THU COMMUNE, NGHE AN, VIET NAM', MANAGE_SAVE_SERVER: '💾 Save to server', MANAGE_DRAG_TEXT: 'Drop Excel file here', MANAGE_DRAG_SUB: 'or click to select', Q_PAY_TT: 'T/T 30 days', Q_PAY_LC: 'L/C 60 days', Q_VALID_15: '15 days', Q_VALID_30: '30 days' }
  },
  { file: 'src/lang/zh.js',
    data: { Q_VALID_7: '7天', Q_VALID_FROM_SIGN: '自签署之日起', COMPANY_NAME: '德盛新材料科技有限公司', COMPANY_ADDR: '地址：NGHE AN省NGHIA DAN工业区, VIET NAM', MANAGE_SAVE_SERVER: '💾 保存到服务器', MANAGE_DRAG_TEXT: '将Excel文件拖放到此处', MANAGE_DRAG_SUB: '或点击选择', Q_PAY_TT: 'T/T 30天', Q_PAY_LC: 'L/C 60天', Q_VALID_15: '15天', Q_VALID_30: '30天' }
  }
];

langs.forEach(function(lang) {
  var content = fs.readFileSync(lang.file, 'utf-8');
  Object.keys(lang.data).forEach(function(key) {
    var val = lang.data[key].replace(/'/g, "\\'");
    // Check if key already exists
    if (content.indexOf(key + ':') < 0) {
      // Add it inside the object - add before the last }
      var lastIdx = content.lastIndexOf('};');
      content = content.substring(0, lastIdx) + '  ' + key + ": '" + val + "',\n};";
      console.log('Added ' + key + ' to ' + lang.file);
    }
  });
  fs.writeFileSync(lang.file, content, 'utf-8');
});
