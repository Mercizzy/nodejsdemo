/**
 * koa中使用koa-bodyparser获取post传值
 */

const Koa = require('koa');
var router = require('koa-router')();
const views = require('koa-views');
const bodyParser = require('koa-bodyparser')

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

//配置post的中间件
app.use(bodyParser())

router
  .post('/dologin', async(ctx)=> {
    console.log(ctx.request.body);
    
  })


app
  .use(router.routes()) //启动路由
  .use(router.allowedMethods()) //

app.listen(8081);
