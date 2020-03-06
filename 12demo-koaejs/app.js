/**
 * koa中使用ejs模板引擎
 */

const Koa = require('koa');
var router = require('koa-router')();
const views = require('koa-views');

const app = new Koa();

//配置模板引擎 app.use(views('views', {map: {html: 'ejs'}}))  两种方法都可以,此方法模板后缀名为html
app.use(views('views', {  //此方法模板后缀名为ejs
  extension: 'ejs'  
}))

//配置一个中间件，需要在每一个页面中都渲染一条公共的数据
app.use(async(ctx, next)=> {
  ctx.state = {
    username: 'merci'
  }
  await next();
})

router
  .get('/', async(ctx)=> {
    let title = 'hello ejs';
    await ctx.render('index', {
      title: title
    })
  })
  .get('/news', async(ctx)=> {
    let list = [1,2,3,4,5,6,7];
    await ctx.render('news', {
      list: list
    })
  })


app
  .use(router.routes()) //启动路由
  .use(router.allowedMethods()) //

app.listen(8081);
