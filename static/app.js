
/**
 * Module dependencies.
 */

var express = require('express');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
    //no cache
    //app.use(express.static(__dirname + '/public'),{maxAge:Date.now()});
    app.use(gzippo.staticGzip(__dirname + '/public'),{maxAge:Date.now()});
    //app.use(app.router);
    app.use(function(req,res){
        res.send('not found.',404);
    });
});

app.configure('development', function(){
    app.use(express.errorHandler({dumpExceptions:true,showStack:true}));
});

app.configure('production', function(){
    app.use(express.errorHandler());
});

app.listen(8082);
console.log("static/app.js run on port:%d",app.address().port);
