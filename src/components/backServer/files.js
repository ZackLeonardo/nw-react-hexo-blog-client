'use strict';

var fs = require('fs');
var path = require("path");
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
      if (err) {
        throw err;
      }
      console.log("delete file sucess");
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

// 从路径中获取所在文件夹名 /1/2/ ==> 2   /1/2/3.txt ==> 3.txt
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

// 获取路径
var getDirPath = function (path) {
  if (path != ''){
    return path.substring(0,path.lastIndexOf("/")+1)
  }
};

// 重命名
var rename = function (filepath, newName) {
  fs.stat(filepath,function(err,stats){
    if (err) {
      console.log(err);
      return; // exit here since stats will be undefined
    }
		if(stats.isFile()){
			var filename = path.basename(filepath);
			var parentDir =path.dirname(filepath);

			if(newName != filename){
				var newPath =parentDir+"/"+newName;
				// console.log("going to rename from "+filepath+" to "+newPath);
				fs.rename(filepath,newPath);
			}
		}else{
		  console.log("this is not a file");
		}
	});
};


module.exports = {deleteFolderRecursive, deleteFolderCMD, mkdir, deleteFile, writeFile, treeBeardLoadData, readFile, getFolderNameFromDir, rename, getDirPath}
