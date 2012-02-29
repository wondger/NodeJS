/*
 * @name:index.js
 * @description:io
 * @author:wondger@gmail.com
 * @date:2012-02-29
 * @param:
 * @todo:
 * @changelog:
 */
var http = require('http'),
    url = require('url');
var io = {
    io:function(_url,method,fn){
        var u = url.parse(_url);
        var opt = {
            method:method.toLowerCase() === 'post' ? 'post' : 'get',
            host:url.host || '',
            hostname:url.hostname || '',
            port:url.port || 80,
            path:url.path || ''
        }

        var req = http.request({
            host:opt.host,
            hostname:opt.hostname,
            port:opt.port,
            path:opt.path,
            method:opt.method
        },function(res){
            if(!fn || fn.constructor != Function) return;
            //res.setEncoding('utf8');
            var c = '';

            res.on('data',function(chunk){
                c += chunk;
            });

            res.on('end',function(){
                console.log(c);
                //fn.call(null,c);
            });
        }).on('error',function(e){
            console.log(typeof e);
        });

        req.end();
    },
    get:function(url,fn){
        io.io(url,'get',fn);
    },
    post:function(url,fn){
        io.io(url,'post',fn);
    }
};
exports.io = io;
