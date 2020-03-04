var http = require('http');
const url = require('url');
const router = require('./static/model/router')
const ejs = require('ejs');
const routerFun = require('./static/model/routerfun');

http.createServer(function (request, response) {
  let pathName = url.parse(request.url).pathname.replace('/', '');
  if(pathName == 'favicon.ico') return;

  try {
    routerFun.app[pathName](request, response)
  } catch (error) {
    routerFun.app['404'](request, response)
  }
  
  
  // response.end();
  // router.router(request, response, 'static')
}).listen(8081);

console.log('Server running at http://127.0.0.1:8081/');