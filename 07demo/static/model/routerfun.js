const ejs = require('ejs');

const app = {
  login: (request, response) => {
    let data = '你好，我是后台数据';
    let isMain = false;
    let list = [111, 222, 333];
    //使用ejs模板引擎渲染数据
    ejs.renderFile(
      './static/views/form.ejs', 
      {
        // msg: data,
        // isMain: isMain,
        // list: list
      }, 
      (err, data)=> {
        response.end(data);
    });
  },
  '404': (request, response)=> {
    ejs.renderFile(
      './static/views/404.ejs', 
      {
        
      }, 
      (err, data)=> {
        response.end(data);
    });
  }
};
module.exports.app = app