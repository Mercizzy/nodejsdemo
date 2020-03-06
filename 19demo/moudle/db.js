const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const Config = require('./config');

class Db {
  static getInstance() {  //单例模式， 多次实例化，共享实例
    if(!Db.instance) {
      Db.instance = new Db()
    }
    return Db.instance;
  }

  constructor() {
    let dbClient = ''; //定义一个数据库对象，如果已经连接了数据库，则不用多次连接
    this.connect(); 
  }

  //连接数据库
  connect() {
    return new Promise((resolve, reject)=> {
      if(!this.dbClient) {
        console.time('连接数据库')
        MongoClient.connect(Config.dbUrl, { "useUnifiedTopology": true}, (err, client)=> {
          if(err) {
            reject(err);
          }
          const db = client.db('test');
          this.dbClient = db;
          resolve(db)
        })
        console.timeEnd('连接数据库')
      }else {
        resolve(this.dbClient)
      }
    })
  }

  //查询数据库
  find(collectionName, sqlJson) {
    return new Promise((resolve, reject)=> {
      this.connect().then((db)=> {
        let result = db.collection(collectionName).find(sqlJson)
        result.toArray((err, docs)=> {
          if(err) {
            reject(err)
          }
          resolve(docs)
        })
      })
    })
  }

  //添加数据
  insert(collectionName, sqlJson) {
    return new Promise((resolve, reject)=> {
      this.connect().then((db)=> {
        db.collection(collectionName).insertOne(sqlJson, (err, result)=> {
          if(err) {
            reject(err)
          }else {
            resolve(result)
          }
        })
      })
    })
  }

  //删除数据
  delete(collectionName, sqlJson) {
    return new Promise((resolve, reject)=> {
      this.connect().then((db)=> {
        db.collection(collectionName).deleteMany(sqlJson, (err, result)=> {
          if(err) {
            console.log('err',err)
            reject(err)
          }else {
            resolve(result)
          }
        })
      })
    })
  }

  //更新数据
  update(collectionName, sqlJson, dataJson) {
    return new Promise((resolve, reject)=> {
      this.connect().then((db)=> {
        db.collection(collectionName).updateMany(sqlJson, {$set: dataJson}, (err, result)=> {
          if(err) {
            reject(err)
          }else {
            resolve(result)
          }
        })
      })
    })
  }

  //将_id转化成ObjectId
  getObjectId(id) {
    return new ObjectId(id)
  }

}

module.exports = Db.getInstance();