const http = require('http');
const fs = require("fs");
const path = require('path');

// read the index.html file and store it in a variable
const indexFile = fs.readFileSync('./index.html', 'utf-8')

const server = http.createServer((req, res) => {
  // phase 2: handle /static requests first
  if (req.url.startsWith('/static')) {
    // extract file path and file extension
    const filePath = path.join(__dirname, 'assets', req.url.replace('/static', ''));
    const fileExt = path.extname(filePath).substring(1);

    // determine the correct MIME type
    let contentType;
    switch (fileExt) {
      case 'css':
        contentType = 'text/css'
        break;
      case 'jpg':
      case 'jpeg':
        contentType = 'image/jpg';
        break;
      default:
        contentType = 'text/plain'; // default for unsupported types
    }

    // read the file and send it
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.statusCode = 404;
        res.end('File not found');
      } else {
        res.statusCode = 200;
        res.setHeader('Content-Type', contentType);
        res.end(data);
      }
    })
  } else {
    // phase 1: serve the index.html file for all other requests
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end(indexFile);
  }
});

const port = 4000;

server.listen(port, () => console.log('Server is listening on port', port));
