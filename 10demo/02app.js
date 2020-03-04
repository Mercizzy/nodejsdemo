const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();

const router = new Router();

router
  .get('/', async(ctx)=> {
    ctx.body = '首页';
  })
  .get('/news', async(ctx)=> {
    ctx.body = '新闻页面';
  });

app
  .use(router.routes()) //启动路由
  .use(router.allowedMethods()) //

app.listen(8081);
