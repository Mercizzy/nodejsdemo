const path = require('path');

function getFileName(pathName) {
  let extName = path.extname(pathName);
  let fileName = ''

  switch (extName) {
    case '.html': 
      fileName = 'text/html';
      break;
      case '.css': 
        fileName = 'text/css';
        break;
      case '.js': 
        fileName = 'text/javascript';
        break;
      default: 
        fileName = 'text/plain';
  }

  return fileName;
}

module.exports.getFileName = getFileName;