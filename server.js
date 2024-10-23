const http = require('http');
const fs = require("fs");

// read the index.html file and store it in a variable
const indexFile = fs.readFileSync('./index.html', 'utf-8')

const server = http.createServer((req, res) => {
  // send the index.html file as the response to any request
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.write(indexFile);
  res.end();
});

const port = 4000;

server.listen(port, () => console.log('Server is listening on port', port));
