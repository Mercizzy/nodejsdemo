const http = require('http');
const url = require('url');


var G = {};

var app = function(req, res) {
  let pathname = url.parse(req.url).pathname

  if(!pathname.endsWith('/')) {  //将路由统一处理成/login/模式
    pathname = pathname + '/'
  }

  if(G[pathname]) {
    G[pathname](req, res)
  }else {
    res.end('404 not found');
  }
};

app.get = function(string, callback) {
  if(!string.endsWith('/')) {//将路由统一处理成/login/模式
    string = string + '/'
  }
  if(!string.startsWith('/')) {//将路由统一处理成/login/模式
    string = '/' + string
  }
  G[string] = callback
};

http.createServer(app).listen(8081);

app.get('login', (req, res)=> {
  res.end('login');
});
app.get('register', (req, res)=> {
  res.end('register');
});