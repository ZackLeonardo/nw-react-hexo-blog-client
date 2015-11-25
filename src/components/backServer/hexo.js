'use strict';

// var hexo = require('hexo');
var exec = require('child_process').exec;

var hexoInit = function (path) {
  exec('hexo init ' + path ,function (error, stdout, stderr) {
    // console.log('stdout: ' + stdout);
    // console.log('stderr: ' + stderr);
    document.getElementById("hexo_logs").innerHTML = stdout;
    // hexoNpmInstall(path);
    if (error !== null) {
      // console.log('exec error: ' + error);
      document.getElementById("hexo_logs").innerHTML = error;
    }
  });
}

var hexoNpmInstall = function (path) {
  console.log(path);
  exec('npm install ' + path,{cwd: path} ,function (error, stdout, stderr) {
    document.getElementById("npm_logs").innerHTML = stdout;
    if (error !== null) {
      // console.log('exec error: ' + error);
      document.getElementById("npm_logs").innerHTML = error;
    }
  });
}
