var http = require('http');
const fs = require('fs');
const url = require('url');

http.createServer(function (request, response) {
  let pathName = request.url.substr(1)
  console.log(pathName)
  fs.stat(pathName, (err, status)=> {
    if(err) {
      console.log('读取文件类型时发生错误: '+err);
      return
    }
    if(status.isFile) {
      fs.readFile(pathName, (err, data)=> {
        if(err) {
          response.writeHead(404, {'Content-Type': 'text/html'})
        }else {
          response.writeHead(200, {'Content-Type': 'text/html'});
          response.write(data.toString());
        }
        response.end()
      })
    }
  })

}).listen(8081);

console.log('Server running at http://127.0.0.1:8081/');