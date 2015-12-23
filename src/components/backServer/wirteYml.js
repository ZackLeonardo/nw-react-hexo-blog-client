'use strict';

var fs = require('fs');
require('require-yaml');

var config = require('../../../config.yml');

// console.log("----" + config.hexoInit_path + "/_config.yml" + "----");

var hexoConfig = eval(require(config.hexoInit_path + "/_config.yml"));

console.log("----" + hexoConfig.title + "----");

hexoConfig.title = 'test';

console.log("----" + hexoConfig.title + "----");

var file = 'test.yml';

writeConfigFile(file);

function writeConfigFile(file){
    // 把中文转换成字节数组
    // var arr = iconv.encode(str, 'GBK');
    // var arr = "\r\nhexoInit_path: " + str;

    // appendFile，如果文件不存在，会自动创建新文件
    // 如果用writeFile，那么会删除旧文件，直接写新文件
    var str;
    for (str in hexoConfig) {

      fs.appendFile(file, str+ ": " + eval('hexoConfig.' + str) +"\r\n", function(err){
          if(err)
              console.log("fail " + err);

      });
    }

}
