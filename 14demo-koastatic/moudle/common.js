const common = {
  getPostData(ctx) {
    return new Promise((resolve, reject)=> {
      try {
        let str = '';
        ctx.req.on('data', (chunk)=> {
          str += chunk;
        })
        ctx.req.on('end', (err, data)=> {
          resolve(str)
        })
      } catch (error) {
        reject(error)
      }
    });
  }
};

module.exports = common