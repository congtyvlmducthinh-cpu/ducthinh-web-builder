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

