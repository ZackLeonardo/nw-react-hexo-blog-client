'use strict';

require('./src/components/backServer/fs.js');

var file = 'config.yml';
var str = "\r\nhexoInit_path: " + str;

function writeConfigFile(str){
    // 把中文转换成字节数组
    // var arr = iconv.encode(str, 'GBK');
    var arr = "\r\nhexoInit_path: " + str;

    writeFile(file, arr);
}
