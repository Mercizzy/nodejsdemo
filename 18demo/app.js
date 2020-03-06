const Koa = require('koa'),
      Router = require('koa-router'),
      Template = require('koa-art-template'),
      MongoClient = require('mongodb').MongoClient
      path = require('path')

let app = new Koa();

let router = new Router();

let dbPath = "mongodb://localhost:27017"

Template(app, {
  root: path.join(__dirname, 'views'),
  extname: '.html',
  debug: false
})

router
  .get('/', async(ctx)=> {
    await ctx.render('index')
  })
  .get('/news', async(ctx)=> {
    let data = await new Promise((resolve, reject)=> {
      MongoClient.connect(dbPath, { "useUnifiedTopology": true}, (err, client)=> {
        const db = client.db('test');
        const dic = db.collection('dic');
        dic.insertMany(
          [
            {
              dicname: 'aaa',
              dicid: 'aaa'
            },
            {
              dicname: 'bbb',
              dicid: 'bbb'
            },
            {
              dicname: 'ccc',
              dicid: 'ccc'
            },
          ],
          (err, result)=> {
            if(err) { throw err }
            resolve(JSON.stringify(result))
          }
        )
      })
    })
    await ctx.render('news', {data: data})
  })

app
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(8081)