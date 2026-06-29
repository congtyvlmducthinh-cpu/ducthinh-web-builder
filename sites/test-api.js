const http = require('http');

const data = JSON.stringify({
  blocks: {
    DATA_PRODUCTS: 'var DATA_PRODUCTS = [];',
    DATA_BAGS: 'var DATA_BAGS = [];',
    DATA_OTHERS: 'var DATA_OTHERS = [];',
    DATA_MAX_LOADING: 'var DATA_MAX_LOADING = {};',
    DATA_COST_FOB: 'var DATA_COST_FOB = {};'
  }
});

const options = {
  hostname: 'localhost',
  port: 8080,
  path: '/api/ktg-data',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(data)
  }
};

const req = http.request(options, (res) => {
  let body = '';
  res.on('data', (chunk) => body += chunk);
  res.on('end', () => {
    console.log('Status:', res.statusCode);
    console.log('Response:', body);
  });
});

req.on('error', (e) => console.error('Error:', e.message));
req.write(data);
req.end();
