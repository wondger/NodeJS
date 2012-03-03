
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
        url = req.body.source_url,
        ck_url = req.body.ck_source_url;
    var out = {out:'',error:''};
    var data = null;

    if(url && ck_url){
        io.get(url,function(c){
            if(c.type){
                src = c.content;
                doit();
            }else{
                doit({
                    title:'UglifyJS',
                    src:'',
                    out:'',
                    error:{message:c.error.message,code:c.error.code}
                });
                return;
            }
        });
    }else{
        doit();
    }

    function doit(data){
        if(type=='beautify' && !data){
            src && (out = uglifyjs.beautify(src,req.body));
        }else if(!data){
            src && (out = uglifyjs.compress(src,req.body));
        }

        data = !!data && data || {
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
