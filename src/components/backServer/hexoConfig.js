'use strict';

var fs = require('fs');
require('require-yaml');
var files = require('./files.js');

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
                'deploy_type',
                'deploy_repo',
                'deploy_branch'
              ],
              value: [
                hexoConfig.title,
                hexoConfig.subtitle,
                hexoConfig.description,
                hexoConfig.author,
                hexoConfig.email,
                hexoConfig.language,
                hexoConfig.theme,
                hexoConfig.deploy.type,
                hexoConfig.deploy.repo,
                hexoConfig.deploy.branch
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

var configHexoYml = function (file, hexoConfig){
  files.deleteFile(file);
  var str;
  for (str in hexoConfig) {
    var value = eval('hexoConfig.' + str);
    if (value == null){
      files.writeFile(file, str+ ": " + "\r\n")
    }else if (typeof(value) == 'object'){
      files.writeFile(file, str +": " + "\r\n")
      var str1;
      for (str1 in value) {
        var value1 = eval( 'value.' + str1);
        if (value1 == null){
          files.writeFile(file, "  " + str1+ ": " + "\r\n");
        }else {
          files.writeFile(file, "  " + str1+ ": " + value1 + "\r\n");
        }
      }
    }else {
      files.writeFile(file, str+ ": " + value + "\r\n");
    }
  }

};

module.exports = {data, hexoConfig, configHexoYml, filePath};
