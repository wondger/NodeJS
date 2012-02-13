
/*
 * GET home page.
 */
var util = require('util'),
    uglifyjs = require('../web/uglifyjs').uglifyjs;

exports.index = function(req, res){
    res.render('index', { title: 'FEDTool' })
};

//uglifyjs
exports.uglifyjs = function(req, res){
    res.render('uglifyjs', { title: 'UglifyJS' })
};
exports.uglifyjs_use = function(req, res){
    var src = req.body.source,
        type = req.body.type;
    var out = {out:'',error:''};

    if(type=='beautify'){
        src && (out = uglifyjs.beautify(src));
    }else{
        src && (out = uglifyjs.compress(src));
    }

    var data = {
        title:'UglifyJS',
        src:src,
        out:out.out,
        error:out.error
    }

    res.render('uglifyjs_use',data);
};

//notfound
exports.notfound = function(req, res){
  res.render('404', { title: '404' })
};
