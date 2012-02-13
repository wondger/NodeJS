/*
 * @name:uglifyjs.js
 * @description:uglifyjs
 * @author:wondger@gmail.com
 * @date:2012-02-13
 * @param:
 * @todo:
 * @changelog:
 */
var uglifyjs = require('uglify-js'),
    jsp = uglifyjs.parser,
    pro = uglifyjs.uglify;

exports.uglifyjs = {
    beautify:function(src,opt){
        return this.uglify(src,'beautify');
    },
    compress:function(src,opt){
        return this.uglify(src,'compress');
    },
    uglify:function(src,type,opt){
        if(src.constructor != String) return;

        var opt = opt || {};
        var type = type == 'compress' ? 'compress' : 'beautify',
            mangle = opt.mangle || false,
            squeeze = opt.squeeze || false,
            ascii_only = opt.ascii_only || false,
            quote_keys = opt.quote_keys || false,
            inline_scripts = opt.inline_scripts || false,
            beautify = opt.beautify || false,
            indent_start = opt.indent_start || 0,
            indent_level = opt.indent_level || 4,
            space_colon = opt.space_colon || false;

        var ast;
        try{
            //parse code and get the initial AST
            ast = jsp.parse(src);
        }catch(e){
            return {error:e.message,out:''};
        }

        //get a new AST with mangled names
        //ast = pro.ast_mangle(ast);
        
        //get an AST with compression optimizations
        ast = pro.ast_squeeze(ast);

        //compressed code here
        var final_code = pro.gen_code(ast,{
            //encode non-ASCII characters as \uXXXX
            ascii_only:true,
            //quote all keys in literal objects
            quote_keys:true,
            //escape occurrences of </script in strings
            inline_scripts:false,
            //pass true if you want indented output
            beautify:type=='beautify',
            //initial indentation in spaces
            indent_start:0,
            //indentation level, in spaces (pass an even number)
            indent_level:4,
            //wether to put a space before the colon in object literals
            space_colon:true
        });
        
        return {out:final_code,error:''};
    }
};
