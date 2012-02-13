
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , util = require('util');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.static(__dirname + '/public'));
  app.use(app.router);
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes
app.all(/(.*)/,function(req,res){

  var sub = req.params[0].replace(/^\//,'');

  switch(sub.toLowerCase()){
    case 'uglifyjs':
          routes.uglifyjs(req,res);
          break;
    case 'uglifyjs/use':
          routes.uglifyjs_use(req,res);
          break;
    case '':
    case 'index':
    case 'home':
    case 'default':
    case 'index.html':
    case 'index.htm':
          routes.index(req,res);
          break;
    default:
          routes.notfound(req,res);
          break;
  }
});

app.listen(8080);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
