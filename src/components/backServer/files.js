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
        if (path[path.length - 1 ] == '/'){
          var curPath = path + file;
        }else {
          var curPath = path + "/" + file;
        }
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

// 删除文件
var deleteFile = function (filePath) {
  if (filePath != ''){
    fs.unlink(filePath, function (err) {
      if (err) throw err;
      console.log('successfully deleted /tmp/hello');
    });
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

// var readFile = function (file){
//   var contents;
//   fs.readFile(file, 'utf8', function (err,data) {
//     if (err) {
//       return console.log(err);
//     }
//     return console.log(data);
//   });
//
//   // return data;
//     // fs.readFile(file, function(err, data){
//     //     if(err)
//     //         console.log("读取文件fail " + err);
//     //     else{
//     //         // 读取成功时
//     //         // 输出字节数组
//     //         // console.log(data);
//     //         // 把数组转换为gbk中文
//     //         var str = iconv.decode(data, 'gbk');
//     //         // console.log(str);
//     //         return str;
//     //     }
//     // });
// };
var readFile = function (file) {
  return fs.readFileSync(file,'utf-8');
}

// 加载treeBeard数据
var treeBeardLoadData = function(path) {
  var data = JSON.parse('{}');
  if (path != ''){
    var files = [];
    if( fs.existsSync(path) ) {
      data.name = getFolderNameFromDir(path);
      files = fs.readdirSync(path);
      var children = [];
      var folderChild = JSON.parse('{}');
      files.forEach(function(file,index){
        if (path[path.length - 1 ] == '/'){
          var curPath = path + file;
        }else {
          var curPath = path + "/" + file;
        }
        if(fs.statSync(curPath).isDirectory()) {
          folderChild = treeBeardLoadData(curPath);
        } else {
          var child = JSON.parse('{}');
          child.name = file;
          child.terminal = true;
          child.filePath = curPath;

          children[children.length] = child;
        }
      });

      if (folderChild.name == null){
        data.children = children;
      }else{
        var totalChildren = [folderChild];
        for (var i = 0 ; i < children.length ; i++){
          totalChildren[i+1] = children[i];
        }
        data.children = totalChildren;
      }
    }
  }
  return data;
};

// 从路径中获取所在文件夹名
var getFolderNameFromDir = function (path) {
  if (path != ''){
    var paths = path.split('/');
    if (paths[paths.length - 1 ] != ''){
      return paths[ paths.length - 1 ];
    }else {
      return paths[ paths.length - 2 ];
    }
  }
};

module.exports = {deleteFolderRecursive, deleteFolderCMD, mkdir, deleteFile, writeFile, treeBeardLoadData, readFile}
