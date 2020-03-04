var http = require('http');
var app = require('./model/router');
const ejs = require('ejs');
// console.log(app.toString())
http.createServer(app).listen(8081);

console.log('Server running at http://127.0.0.1:8081/');

app.get('login', (req, res)=> {
  ejs.renderFile('./views/login.ejs', {msg: '登录信息'}, (err, data)=> res.end(data));
});
app.get('register', (req, res)=> {
  res.end('register');
});
app.post('dologin', (req, res)=> {
  console.log(req.body);
  res.end("<script>alert('登陆成功');history.back();</script>");
});