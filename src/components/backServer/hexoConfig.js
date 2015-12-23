'use strict';

var fs = require('fs');
require('require-yaml');
require('./fs.js');

var config = require('../../../config.yml');

// console.log("----" + config.hexoInit_path + "/_config.yml" + "----");

var filePath = config.hexoInit_path + "/_config.yml";

var hexoConfig = eval(require(filePath));

// console.log("----" + typeof(hexoConfig.highlight) + "----");
// console.log("----" + typeof(hexoConfig.title) + "----");
// console.log("----" + typeof(hexoConfig.subtitle) + "----");
var data = {	title:	'hexo config form',
              label: [
                'title',
                'subtitle',
                'description',
                'author',
                'email',
                'language',
                'theme',
                'deploy type',
                'deploy repo',
                'deploy branch'
              ],
              value: [
                hexoConfig.title,
                hexoConfig.subtitle,
                hexoConfig.description,
                hexoConfig.author,
                hexoConfig.email,
                hexoConfig.language,
                hexoConfig.theme,
                hexoConfig.type,
                hexoConfig.repo,
                hexoConfig.branch
              ],
              desc: [
                '标题',
                '子标题',
                '描述',
                '作者',
                '邮箱',
                '语言',
                '主题',
                '部署类型',
                '部署源',
                '分支',
              ]
            };


hexoConfig.title = 'test';


var configHexoYml = function (file, hexoConfig){
    var str;
    for (str in hexoConfig) {
      var value = eval('hexoConfig.' + str);
      if (value == null){
        fs.appendFile(file, str+ ": " + "\r\n", function(err){
            if(err)
                console.log("fail " + err);
        });
      }else if (typeof(value) == 'object'){
        fs.appendFile(file, str +": " + "\r\n", function(err){
            if(err)
                console.log("fail " + err);
        });
        var str1;
        for (str1 in value) {
          var value1 = eval( 'value.' + str1);
          if (value1 == null){
            fs.appendFile(file, "  " + str1+ ": " + "\r\n", function(err){
                if(err)
                    console.log("fail " + err);
            });
          }else {
            fs.appendFile(file, "  " + str1+ ": " + value1 + "\r\n", function(err){
                if(err)
                    console.log("fail " + err);
            });
          }
        }
        // fs.appendFile(file, str+ ": " + value + "\r\n", function(err){
        //     if(err)
        //         console.log("fail " + err);
        // });
      }else {
        fs.appendFile(file, str+ ": " + value + "\r\n", function(err){
            if(err)
                console.log("fail " + err);
        });
      }
    }

};

configHexoYml('test.yml', hexoConfig);

module.exports = data;
