// Parse the domestic freight data from user's message
// and update DATA_DOMESTIC_FREIGHT in vi.html
var fs = require('fs');
var path = require('path');
var filePath = path.join(__dirname, 'vi.html');

var raw = `Cảng Bến Nghé, HCM (OTI) 13,520,000
Cảng Bến Nghé, HCM (CY) 12,224,000
KCN VSIP 2, HCM 16,760,000
KCN Vĩnh Lộc A, HCM 15,896,000
KCN Biên Hòa 2, Đồng Nai 16,436,000
Số 215/15, Đường An Phú 19, Khu Phố Bình Phước B, Phường Thuận Giao, HCM 16,436,000
Ấp 5 xã Mỹ Hạnh, Tỉnh Tây Ninh 16,760,000
KCN Hải Sơn/KCN Tân Đức, xã Đức Hòa, Tây Ninh + Số 138, Ấp 9, Xã Lương Hòa, Tây Ninh 16,760,000
Cụm công nghiệp Tân Hội 2 ấp Hội An, Xã Tân Hội, Tây Ninh 20,540,000
172/156 An Dương Vương, Phường Bình Phú, HCM 16,436,000
Khu TTCN Lê Minh Xuân, Xã Tân Nhựt, HCM + KCN Tân Tạo, Phường Tân Tạo, HCM 16,220,000
Phường Tân Đông Hiệp, HCM / Phường Đông Hòa, HCM 16,436,000
11A Đ. TL 43, Phường An Phú Đông, HCM / Xã Đông Thạnh, HCM / Xã Bà Điểm, HCM 16,760,000
Khu Phố Bình Chánh, Phường Tân Hiệp, HCM 17,300,000
Lô E5-1 (khu B4), đường D9, KCN Rạch Bắp, Phường Tây Nam, HCM 17,800,000
742/11, đường DH 410, khu phố 6, Phường Vĩnh Tân, HCM 17,840,000
KCN Mỹ Phước 3, Phường Thới Hòa, HCM 17,840,000
Số 36 QL51, Phường Phước Tân, Đồng Nai 16,760,000
Thửa đất số 686, tờ bản đồ số 40, ấp 7, xã An Long, HCM 19,580,000
27/8A Tây Lân, phường Bình Tân, tp HCM + 800 QL1A, phường Bình Hưng Hòa, TP HCM 16,760,000
KCN Linh Trung 3, phường An Tịnh, Tây Ninh 17,960,000
Phường Bình Cơ/Phường Tân Uyên/Phường Tân Khánh, HCM 17,840,000
Số 46,Đường DT748, Ấp Kiến Điền, Phường Long Nguyên, HCM 18,800,000
Cảng Bến Nghé/VICT (Rút ruột hàng từ Cont sang Xe tải) 15,500,000
Cảng Bến Nghé, HCM (Rút ruột bao jumbo xuống ghe tại cảng) 15,500,000`;

// Parse function
function parseLine(line) {
  line = line.trim();
  if (!line) return null;
  
  // Try to extract freight number at the end
  // Format: "... NUMBER,NUMBER" or "... NUMBER"
  var match = line.match(/^(.+?)\s+(\d{1,3}(?:,\d{3})*)\s*$/);
  if (!match) return null;
  
  var address = match[1].trim();
  var freight = parseInt(match[2].replace(/,/g, ''));
  
  // Extract province from address
  var province = '';
  var knownProvinces = ['HCM', 'TP HCM', 'Tp HCM', 'Đồng Nai', 'Tây Ninh'];
  for (var p = 0; p < knownProvinces.length; p++) {
    if (address.indexOf(knownProvinces[p]) >= 0) {
      province = knownProvinces[p];
      if (province === 'TP HCM' || province === 'Tp HCM') province = 'HCM';
      break;
    }
  }
  
  // Handle multi-address lines (with + or /)
  // Use first part after comma as ward if possible
  var ward = address;
  var parts = address.split(',');
  if (parts.length > 1) {
    var firstPart = parts[0].trim();
    // If first part has a specific ward/area name, use it
    if (firstPart.length < 50 && !firstPart.match(/^(Số|Lô|Thửa|27|172|742|11A)/)) {
      ward = firstPart;
    } else if (parts.length > 2) {
      // Try second part
      var secondPart = parts[1].trim();
      if (secondPart.length < 40 && !secondPart.match(/^(Đường|đường|Khu|khu)/i)) {
        ward = secondPart;
      }
    }
  }
  
  return { province: province, ward: ward, address: address, freight: freight };
}

// Parse all lines
var lines = raw.split('\n');
var data = [];
lines.forEach(function(line) {
  var item = parseLine(line);
  if (item) data.push(item);
});

console.log('Parsed ' + data.length + ' items');
console.log('First:', JSON.stringify(data[0], null, 2));
console.log('Last:', JSON.stringify(data[data.length-1], null, 2));

// Generate JS array string
function escapeStr(s) {
  return s.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, ' ').replace(/\r/g, '');
}

var jsArr = 'var DATA_DOMESTIC_FREIGHT = [\n';
data.forEach(function(d) {
  jsArr += '  { province: "' + escapeStr(d.province) + '", ward: "' + escapeStr(d.ward) + '", address: "' + escapeStr(d.address) + '", freight: ' + d.freight + ' },\n';
});
jsArr += '];';

console.log('\nJS Array:');
console.log(jsArr);

// Now update vi.html - find existing DATA_DOMESTIC_FREIGHT declaration and replace
var h = fs.readFileSync(filePath, 'utf8').replace(/\r\n/g, '\n');

// Find the old declaration
var start = h.indexOf('var DATA_DOMESTIC_FREIGHT = [');
var end = h.indexOf('];', start);
if (start >= 0 && end > start) {
  var oldDecl = h.substring(start, end + 2);
  h = h.replace(oldDecl, jsArr);
  console.log('\nReplaced DATA_DOMESTIC_FREIGHT declaration');
  
  fs.writeFileSync(filePath, h, 'utf8');
  console.log('Written to file.');
  
  // Verify
  var h2 = fs.readFileSync(filePath, 'utf8').replace(/\r\n/g, '\n');
  var ns = h2.indexOf('var DATA_DOMESTIC_FREIGHT = [');
  var ne = h2.indexOf('];', ns);
  console.log('\nNew declaration (first 500 chars):');
  console.log(h2.substring(ns, Math.min(ns+500, ne+2)));
} else {
  console.log('Could not find DATA_DOMESTIC_FREIGHT declaration');
}
