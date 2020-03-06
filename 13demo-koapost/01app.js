/**
 * koa中使用ejs模板引擎
 */

const Koa = require('koa');
var router = require('koa-router')();
const views = require('koa-views');
const common = require('./moudle/common')

const app = new Koa();

//配置模板引擎 app.use(views('views', {map: {html: 'ejs'}}))  两种方法都可以,此方法模板后缀名为html
app.use(views('views', {  //此方法模板后缀名为ejs
  extension: 'ejs'  
}))

router
  .get('/', async(ctx)=> {
    let title = 'hello ejs';
    await ctx.render('index', {
      title: title
    })
  })

//node方法获取post传参
router
  .post('/dologin', async(ctx)=> {
    let data = await common.getPostData(ctx)
    console.log(data);
  })


app
  .use(router.routes()) //启动路由
  .use(router.allowedMethods()) //

app.listen(8081);
