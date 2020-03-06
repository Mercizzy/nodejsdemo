/**
 * art-template渲染页面
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
    let name = 'merci'
    await ctx.render('index', {name})
  })
  .get('/news', async(ctx)=> {
    let name = 'merci'
    let num = 20
    await ctx.render('news', {name, num})
  })

app.use(router.routes()).use(router.allowedMethods()).listen(8081);