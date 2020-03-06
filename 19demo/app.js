const Koa = require('koa'),
      Router = require('koa-router'),
      Template = require('koa-art-template'),
      path = require('path'),
      Db = require('./moudle/db')
      borderParser = require('koa-bodyparser')

let app = new Koa();

let router = new Router();

Template(app, {
  root: path.join(__dirname, 'views'),
  extname: '.html',
  debug: false
})

app.use(borderParser())

router
  .get('/', async(ctx)=> {
    console.time('t1')
    let data = await Db.find('dic', {})
    console.timeEnd('t1')
    await ctx.render('index', {data})
  })
  .get('/news', async(ctx)=> {
    let data = await Db.find('dic', {})
    await ctx.render('news', {data})
  })

  .get('/addpage', async(ctx)=> {
    await ctx.render('addpage')
  })
  .post('/doadd', async(ctx)=> {
    let obj = ctx.request.body
    let data = await Db.insert('dic', obj)
    if(data.result.ok == 1) {
      ctx.redirect('/news')
    }else {
      ctx.redirect('/addpage')
    }
    
  })


  .get('/delete', async(ctx)=> {
    let id = ctx.query.id

    let data = await Db.delete('dic', {
      "_id": Db.getObjectId(id),
    })
    ctx.redirect('/news')
  })

  .get('/updatepage', async(ctx)=> {
    let id = ctx.query.id
    let data = await Db.find('dic', {"_id": Db.getObjectId(id)})
    
    ctx.render('updatepage', {data: data[0]})   //返回的是一个数组，所以取数组第1项
  })
  .post('/doupdate', async(ctx)=> {
    let obj = ctx.request.body
    
    let data = await Db.update('dic', {
      "_id": Db.getObjectId(obj.id)
    }, obj)
    if(data.result.ok == 1) {
      ctx.redirect('/news')
    }else {
      ctx.redirect('/updatepage')
    }
  })



app
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(8081)