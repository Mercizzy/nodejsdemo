const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'merci',
  password: 'merci2000',
  database: 'test'
});

connection.connect();

// connection.query('SELECT 1 + 1 AS solution', (err, results, fields)=> {
//   if(err) throw err;
//   console.log('The solution is: '+ results[0].solution);
// });

//查询数据
/* let sql = 'SELECT * FROM websites';
connection.query(sql, (err, result)=> {
  if(err) {
    console.log('SELECT ERR: ' + err.message);
    return;
  }
  console.log('-------------------SELECT-------------------------');
  console.log(result);
  console.log('--------------------------------------------------\n\n');
  
}); */

//插入数据
/* let addSql = 'INSERT INTO websites(Id, name, url, alexa, country) VALUES(0, ?, ?, ?, ?)';
let addParam = ['merciTest', 'https://www.merci.com', '508', 'CN-SH'];
connection.query(addSql, addParam, (err, result)=> {
  if(err) {
    console.log('INSERT ERR: ' + err.message);
    return;
  }
  console.log('---------------------INSERT------------------------');
  console.log('INSERT ID:' + result.insertId);
  console.log('---------------------------------------------------\n\n');
}); */

//更新数据
/* let updateSql = 'UPDATE websites SET name = ?, url = ?, alexa = ? WHERE Id = ?';
let updateParam = ['merciTest2', 'https://www.merci2.com', 20, 7];
connection.query(updateSql, updateParam, (err, result)=> {
  if(err) {
    console.log('UPDATE ERR: ' + err.message);
    return;
  }
  console.log('---------------------UPDATE-------------------------');
  console.log(result);
  console.log('----------------------------------------------------\n\n');
}); */

//删除数据
/* let delSql = 'DELETE FROM websites WHERE Id = ?';
let delParam = ['6'];
connection.query(delSql, delParam, (err, result)=> {
  if(err) {
    console.log('DELETE ERR: ' + err.message);
    return;
  }
  console.log('-----------------------DELETE---------------------------');
  console.log(result);
  console.log('--------------------------------------------------------\n\n');
});
 */