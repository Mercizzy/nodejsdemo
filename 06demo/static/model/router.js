const url = require('url');
const fs = require('fs');
const path = require('path');

exports.router = function(request, response, staticPath) {
  let pathName = url.parse(request.url, true).pathname;
  if(pathName == '/favicon.ico') return;
  if(pathName == '/') {
    pathName = '/index.html';
  }

  fs.readFile(staticPath+pathName, (err, data)=> {
    if(err) {
      console.log('404: '+ pathName);
      
    }else {
      let type = getFileName(pathName)
      response.writeHead(200, {'Content-Type': type});
      response.write(data)
      response.end();
    }
  })
};

function getFileName(pathName) {
  let extName = path.extname(pathName);
  let fileName = ''

  switch (extName) {
    case '.html': 
      fileName = 'text/html';
      break;
      case '.css': 
        fileName = 'text/css';
        break;
      case '.js': 
        fileName = 'text/javascript';
        break;
      default: 
        fileName = 'text/plain';
  }

  return fileName;
}