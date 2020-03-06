const url = require('url');
const path = require('path');

//封装一个方法，改变返回格式
function changeRes(res) {
  // let pathname = url.parse(req.url).pathname;
  // let type = getFileName(pathname);

  res.send = function(data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data)
    res.end();
  };
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


const Server = function() {
  let G = {};
  G._get = {};
  G._post = {};

  const app = function(req, res) {
    let pathname = url.parse(req.url).pathname

    if(!pathname.endsWith('/')) {  //将路由统一处理成/login/模式
      pathname = pathname + '/'
    }

    changeRes(res);

    //获取请求方式
    let method = req.method.toLowerCase();

    if(G['_'+method][pathname]) {
      if(method == 'post') {
        let postStr = ''
        req.on('data', (chunk)=> {
          postStr += chunk;
        });
        req.on('end', (err, data)=> {
          console.log(postStr);
          req.body = postStr;
          G['_'+method][pathname](req, res)
          
        });
      }else {
        G['_'+method][pathname](req, res)
      }

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
    G._get[string] = callback
  };

  app.post = function(string, callback) {
    if(!string.endsWith('/')) {//将路由统一处理成/login/模式
      string = string + '/'
    }
    if(!string.startsWith('/')) {//将路由统一处理成/login/模式
      string = '/' + string
    }
    G._post[string] = callback
  };

  return app

};


module.exports = Server();