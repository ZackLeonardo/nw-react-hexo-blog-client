'use strict';

var fs = require('fs');
var exec = require('child_process').exec;

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

var deleteFile = function (filePath) {
  if (filePath != ''){
    fs.unlinkSync(filePath);
  }
}

var deleteFolderCMD = function (path) {
  exec('rm -rf ' + path ,function(err,out) {
    console.log(out); err && console.log(err);
  });
}

//创建文件夹
var mkdir = function (path) {
  fs.mkdirSync(path);
}
