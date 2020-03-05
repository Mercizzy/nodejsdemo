/**
 * koa中使用ejs模板引擎
 */

const Koa = require('koa');
var router = require('koa-router')();
const views = require('koa-views');

const app = new Koa();

//配置模板引擎 app.use(views('views', {map: {html: 'ejs'}}))  两种方法都可以
app.use(views('views', {
  extension: 'ejs'
}))

router
  .get('/', async(ctx)=> {
    await ctx.render('index')
  })
  .get('/news', async(ctx)=> {
    ctx.body = '新闻页面';
  })


app
  .use(router.routes()) //启动路由
  .use(router.allowedMethods()) //

app.listen(8081);
