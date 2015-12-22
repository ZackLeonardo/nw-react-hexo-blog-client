'use strict';

var fs = require('fs');
require('require-yaml');
// var EJS = require('ejs');


var config = require('../../../config.yml');

// console.log("----" + config.hexoInit_path + "/_config.yml" + "----");

var hexoConfig = eval(require(config.hexoInit_path + "/_config.yml"));

// console.log("----" + hexoConfig.title + "----");
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
console.log(data);
module.exports = data;
