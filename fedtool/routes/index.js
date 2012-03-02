
/*
 * GET home page.
 */
var util = require('util'),
    io = require('../io').io,
    uglifyjs = require('../web/uglifyjs').uglifyjs;

exports.index = function(req,res){
    res.render('index', { title: 'FEDTool' })
};

//uglifyjs
exports.uglifyjs = function(req,res){
    res.render('uglifyjs', { title: 'UglifyJS' })
};
exports.uglifyjs_use = function(req,res,ajax){
    var src = req.body.source || '',
        type = req.body.type,
        url = req.body.source_url;
    var out = {out:'',error:''};
    var data = null;

    if(url && !src){
        io.get(url,function(c){
            src = c.type && c.content;
            doit();
        });
    }else{
        doit();
    }

    function doit(){
        if(type=='beautify'){
            src && (out = uglifyjs.beautify(src,req.body));
        }else{
            src && (out = uglifyjs.compress(src,req.body));
        }

        data = {
            title:'UglifyJS',
            src:src,
            out:out.out,
            error:out.error
        }

        if(!!ajax){
            res.json(data);
        }

        res.render('uglifyjs_use',data);
    }
};

//notfound
exports.notfound = function(req,res){
  res.render('404', { title: '404' })
};
