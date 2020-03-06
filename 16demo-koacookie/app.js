/**
 * koa cookie的使用
 */

 const Koa = require('koa');
 const Router = require('koa-router');
 const render = require('koa-art-template');
 const path = require('path')

 let app = new Koa();

 let router = new Router();

 render(app, {
   root: path.join(__dirname, 'views'),
   extname: '.html',
   debug: false
 })

 router
  .get('/', async(ctx)=> {
    ctx.cookies.set('userinfo', 'merci', {
      maxAge: 60*1000
    })

    //设置中文cookie
    let data = new Buffer('谢厚文').toString('base64')
    ctx.cookies.set('cnuser', data, {
      maxAge: 60*1000
    })
    await ctx.render('index')
  })
  .get('/news', async(ctx)=> {
    let userinfo = ctx.cookies.get('userinfo')
    await ctx.render('news', {userinfo})
  })
  .get('/cn', async(ctx)=> {
    let data = ctx.cookies.get('cnuser')
    let cnuser = new Buffer(data, 'base64').toString()
    
    await ctx.render('cn', {cnuser})
  })

 app.use(router.routes()).use(router.allowedMethods()).listen(8081)