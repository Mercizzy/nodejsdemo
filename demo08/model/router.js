const url = require('url');


const Server = function() {
  let G = {};
  G._get = {};
  G._post = {};

  const app = function(req, res) {
    let pathname = url.parse(req.url).pathname

    if(!pathname.endsWith('/')) {  //将路由统一处理成/login/模式
      pathname = pathname + '/'
    }

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