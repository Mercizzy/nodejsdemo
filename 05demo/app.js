var http = require('http');
const fs = require('fs');
const url = require('url');

const getFileType = require('./static/model/getFileType.js')

http.createServer(function (request, response) {
  let pathName = url.parse(request.url, true).pathname;
  if(pathName == 'favicon.ico') return;
  if(pathName == '/') {
    pathName = '/index.html';
  }

  fs.readFile('./static/'+pathName, (err, data)=> {
    if(err) {
      console.log('404');
      
    }else {
      let type = getFileType.getFileName(pathName)
      response.writeHead(200, {'Content-Type': type});
      response.write(data)
      response.end();
    }
  })
}).listen(8081);

console.log('Server running at http://127.0.0.1:8081/');