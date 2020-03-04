var http = require('http');
const url = require('url');
const router = require('./static/model/router')
const ejs = require('ejs');

http.createServer(function (request, response) {
  let pathName = url.parse(request.url).pathname;

  if(pathName == '/favicon.ico') return

  if(pathName == '/login') {
    let data = '你好，我是后台数据';
    let isMain = false;
    let list = [111, 222, 333];
    //使用ejs模板引擎渲染数据
    ejs.renderFile(
      './static/views/login.ejs', 
      {
        msg: data,
        isMain: isMain,
        list: list
      }, 
      (err, data)=> {
        response.end(data);
    });
  }else if(pathName == '/register') {
    response.end('register');
  }else if(pathName == '/dologin') {
    //get传参，url.parse(request.url, true).query

    //post传参
    let postStr = '';
    request.on('data', (chunk)=> {
      postStr += chunk;
    });
    request.on('end', (err, data)=> {
      console.log(postStr);
    });

    response.end('dologin');
  }else {
    response.end('index');
  }
  

  // router.router(request, response, 'static')
}).listen(8081);

console.log('Server running at http://127.0.0.1:8081/');