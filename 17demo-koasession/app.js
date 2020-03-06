/**
 * koa session的使用  hhtp://www.npmjs.com/package/koa-session
 */

 const Koa = require('koa');
 const Router = require('koa-router');
 const render = require('koa-art-template');
 const path = require('path')
 const session = require('koa-session');

 let app = new Koa();

 let router = new Router();

 render(app, {
   root: path.join(__dirname, 'views'),
   extname: '.html',
   debug: false
 })

 //配置session
 app.keys = ['some secret hurr'];
 const CONFIG = {
   key: 'koa:sess',
   maxAge: 86400000,
   autoCommit: true,
   overwrite: true,
   httpOnly: true,
   signed: true,
   rolling: false,
   renew: true,
   sameSite: null
 };
 app.use(session(CONFIG, app));

 router
  .get('/', async(ctx)=> {
    ctx.session.userinfo = 'aaa'

    // let n = ctx.session.views || 0;
    // ctx.session.views = ++n;
    // console.log(ctx.session.views);
    
    await ctx.render('index')
  })
  .get('/news', async(ctx)=> {
    let userinfo = ctx.session.userinfo
    await ctx.render('news', {userinfo})
  })
  .get('/cn', async(ctx)=> {
    
    await ctx.render('cn')
  })

 app.use(router.routes()).use(router.allowedMethods()).listen(8081)