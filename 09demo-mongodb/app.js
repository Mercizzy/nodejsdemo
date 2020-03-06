var http = require('http');
const app = require('./model/router');
const ejs = require('ejs');

http.createServer(app).listen(8081);

app.get('login', (req, res)=> {
  ejs.renderFile('./views/login.ejs', {msg: '登录信息'}, (err, data)=> res.send(data));
});
app.get('register', (req, res)=> {
  res.send('register');
});
app.post('dologin', (req, res)=> {
  console.log(req.body);
  res.send("<script>alert('登陆成功');history.back();</script>");
});

//mongo
const MongoClient = require('mongodb').MongoClient;

const dbUrl = "mongodb://localhost:27017/test";

app.get('add', (req, res)=> {
  MongoClient.connect(dbUrl, (err, db)=> {
    if(err) {
      console.log(err, "数据库连接失败");
      return;
    }
    
    const mydb = db.db('test');
    //增加数据
    mydb.collection('dic').insertOne(
      {
        "dicname":"dic222",
        "dicid": 2
      },
      (err, result)=> {
        if(err) {
          console.log(err, '增加数据失败');
          return;
        }
        res.send(result.toString());

        db.close();
      }
    );

  });
});

app.get('edit', (req, res)=> {
  MongoClient.connect(dbUrl, (err, db)=> {
    if(err) {
      console.log(err, "数据库连接失败");
      return;
    }
    
    const mydb = db.db('test');
    //修改数据
    mydb.collection('dic').updateOne(
      {
        "dicname":"dic222",
      },
      {
        $set: {
          "dicname": "dic2改"
        }
      },
      (err, result)=> {
        if(err) {
          console.log(err, '修改数据失败');
          return;
        }
        res.send(result.toString());

        db.close();
      }
    );

  });
});

app.get('delete', (req, res)=> {
  MongoClient.connect(dbUrl, (err, db)=> {
    if(err) {
      console.log(err, "数据库连接失败");
      return;
    }
    
    const mydb = db.db('test');
    //修改数据
    mydb.collection('dic').deleteMany(
      {
        "dicname":"dic222",
      },
      (err, result)=> {
        if(err) {
          console.log(err, '删除数据失败');
          return;
        }
        res.send(result.toString());

        db.close();
      }
    );

  });
});

app.get('show', (req, res)=> {
  MongoClient.connect(dbUrl, (err, db)=> {
    if(err) {
      console.log(err, "数据库连接失败");
      return;
    }
    
    const mydb = db.db('test');
    //修改数据
    
    let result = mydb.collection('dic').find();
    let list = [];
    // console.log(result)
    //不懂为何是异步
    // result.forEach((item)=> {
    //   console.log('ha:',item)
    //   list.push(item)
    // })
    // console.log('list: ',list)

    // let result2 = [1,2,3,4,5,6,7]
    // let list2 = []
    // result2.forEach((item)=> {
    //   console.log('ha:',item)
    //   list2.push(item)
    // })
    // console.log('list2: ',list2)
    
    result.toArray((err, arr)=> {
      if(err) {
        console.log(err)
        return;
      }
      // console.log(arr)
      ejs.renderFile(
        './views/show.ejs',
        {
          list: arr
        },
        (err2, data)=> {
          if(err2){
            console.log(err2);
            return;
          }
          res.send(data)
        }
      )
    })

  });
});

console.log('Server running at http://127.0.0.1:8081/');