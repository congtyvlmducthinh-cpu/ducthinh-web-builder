const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8081;
const ROOT = path.resolve(__dirname, 'sites');

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js':   'application/javascript; charset=utf-8',
  '.css':  'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif':  'image/gif',
  '.svg':  'image/svg+xml',
  '.ico':  'image/x-icon',
  '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  '.woff2':'font/woff2',
};

const server = http.createServer((req, res) => {
  let url = req.url.split('?')[0];

  // Redirect root to kiem-tra-gia
  if (url === '/') {
    res.writeHead(302, { 'Location': '/kiem-tra-gia/' });
    return res.end();
  }

  const filePath = path.join(ROOT, url);

  // Security: prevent path traversal
  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403);
    return res.end('Forbidden');
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      // Try index.html inside subdir
      const indexPath = path.join(filePath, 'index.html');
      fs.readFile(indexPath, (err2, data2) => {
        if (err2) {
          res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
          return res.end('404 - ' + url + ' not found');
        }
        const ext = path.extname(indexPath);
        res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
        res.end(data2);
      });
    } else {
      const ext = path.extname(filePath);
      res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
      res.end(data);
    }
  });
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`Static file server running at http://127.0.0.1:${PORT}`);
  console.log(`Serving: ${ROOT}`);
  console.log(`Redirecting / → /kiem-tra-gia/`);
});
