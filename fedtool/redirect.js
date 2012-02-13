
/**
 * Module dependencies.
 */

var express = require('express');

var app = module.exports = express.createServer();

// Routes
app.get(/(.*)/,function(req,res){
	res.redirect('http://fedtool.com'+req.params[0],301);
});

app.listen(8081);
console.log("redirect.js run on "+app.address().port+"!");
