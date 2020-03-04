/**
 * 以流的方式读取，写入文件
 * 管道流复制文件 pipe
 */

const fs = require('fs');

/* var readStream = fs.createReadStream('./data/input.txt');

var count = 0;
var str = '';

readStream.on('data', (data)=> {
  str += data;
  count ++;
});

readStream.on('end', ()=> {
  console.log(str);
  console.log(count);
  
}); */

/* let writeStream = fs.createWriteStream('./data/output.txt');

let str2 = '';

for(let i=0; i<500; i++) {
  str2 += '你好我是循环第'+i+'遍的数据\n';
}

writeStream.write(str2);

writeStream.end();

writeStream.on('finish', ()=> {
  console.log('写入完成');
}); */

let rs = fs.createReadStream('./temp.jpg');
let ws = fs.createWriteStream('./data/my2.png');

rs.pipe(ws);