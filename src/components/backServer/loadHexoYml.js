'use strict';

var fs = require('fs');
require('require-yaml');


var config = require('./config.yml');

// console.log("----" + config.hexoInit_path + "/_config.yml" + "----");

var hexoConfig = eval(require(config.hexoInit_path + "/_config.yml"));

// console.log("----" + hexoConfig.title + "----");
