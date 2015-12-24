'use strict';

var fs = require('fs');
var exec = require('child_process').exec;
// 加载编码转换模块
var iconv = require('iconv-lite');

//清空文件夹并删除之
var deleteFolderRecursive = function(path) {
  if (path != ''){
    var files = [];
    if( fs.existsSync(path) ) {
        files = fs.readdirSync(path);
        files.forEach(function(file,index){
            var curPath = path + "/" + file;
            if(fs.statSync(curPath).isDirectory()) { // recurse
                deleteFolderRecursive(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
  }
};

var deleteFolderCMD = function (path) {
  exec('rm -rf ' + path ,function(err,out) {
    console.log(out); err && console.log(err);
  });
};

//创建文件夹
var mkdir = function (path) {
  fs.mkdirSync(path);
};

var deleteFile = function (filePath) {
  if (filePath != ''){
    fs.unlinkSync(filePath);
  }
};

// function deleteFile(filePath) {
//   if (filePath != ''){
//     fs.unlinkSync(filePath);
//   }
// }

//写文件－－append
var writeFile = function (file, str){
  fs.appendFile(file, str, function(err){
    if (err) {
      console.log("fail " + err);
    }
  });
};

function readFile(file){
    fs.readFile(file, function(err, data){
        if(err)
            console.log("读取文件fail " + err);
        else{
            // 读取成功时
            // 输出字节数组
            console.log(data);
            // 把数组转换为gbk中文
            var str = iconv.decode(data, 'gbk');
            console.log(str);
        }
    });
}

module.exports = {deleteFolderRecursive, deleteFolderCMD, mkdir, deleteFile, writeFile}
