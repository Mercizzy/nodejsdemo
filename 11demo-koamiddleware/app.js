const Koa = require('koa');
var router = require('koa-router')();

const app = new Koa();

//应用级中间件
//匹配任何路由
app.use(async(ctx, next)=> {
  console.log(new Date());  //匹配路由之前的操作
  
  await next(); //当前路由完成以后继续向下匹配
})

//路由级中间件
//匹配相应路由
router.get('', async(ctx)=> {})

//错误处理中间件
app.use(async(ctx, next)=> {
  await next(); //当前路由完成以后继续向下匹配

  if(ctx.status == 404) {
    ctx.body = '404 not found'
  }else {
    console.log(ctx.url);
    
  }
})

router
  .get('/', async(ctx)=> {
    ctx.body = '首页';
  })
  .get('/news', async(ctx)=> {
    ctx.body = '新闻页面';
  })
  .get('/newsDetail', async(ctx)=> {
    //congctx中获取参数
    console.log(ctx.query); //推荐方式
    console.log(ctx.querystring);

    console.log(ctx.request.query);
    console.log(ctx.request.querystring);
    

    ctx.body = '新闻详情';
  })
  .get('/newsDetail2/:nid', async(ctx)=> {  //动态路由
    //获取动态路由的传值

    console.log(ctx.params)

    ctx.body = '新闻详情2' + ctx.params.nid;
  })

app
  .use(router.routes()) //启动路由
  .use(router.allowedMethods()) //

app.listen(8081);
