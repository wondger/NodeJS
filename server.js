var express = require('express');
var fedtool = require('./fedtool/app.js'),
    wwwfedtool = require('./fedtool/redirect.js'),
    static = require('./static/app.js');

var site_vhosts = [],vhosts;

site_vhosts.push(express.vhost('fedtool.com',fedtool));
site_vhosts.push(express.vhost('www.fedtool.com',wwwfedtool));
site_vhosts.push(express.vhost('static.fedtool.com',static));

vhosts = express.createServer.apply(this,site_vhosts);

vhosts.listen(80);
console.log('Express router Listening on port 80 on server.js');
