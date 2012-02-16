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
        return this.uglify(src,'beautify',opt);
    },
    compress:function(src,opt){
        return this.uglify(src,'compress',opt);
    },
    uglify:function(src,type,opt){
        if(src.constructor != String) return;

        var opt = opt || {};
        var type = type == 'compress' ? 'compress' : 'beautify',
            strict_semicolons = !!opt.strict_semicolons,
            lift_variables = !!opt.lift_variables,
            mangle = !!opt.mangle,
            except = opt.except || [],
            defines = opt.defines || {},
            squeeze = !!opt.squeeze,
            make_seqs = !!opt.make_seqs
            dead_code = !!opt.dead_code,
            ascii_only = !!opt.ascii_only,
            quote_keys = !!opt.quote_keys,
            inline_scripts = !!opt.inline_scripts,
            beautify = !!opt.beautify,
            indent_start = opt.indent_start || 0,
            indent_level = opt.indent_level || 4,
            space_colon = !!opt.space_colon;

        var ast;
        try{
            //parse code and get the initial AST
            ast = jsp.parse(src,strict_semicolons);
        }catch(e){
            return {error:e.message,out:''};
        }

        //merge and move var declarations to the scop of the scope
        ast = lift_variables && pro.ast_lift_variables(ast) || ast;

        //get a new AST with mangled names
        ast = mangle && pro.ast_mangle(ast) || ast;
        
        //get an AST with compression optimizations
        ast = pro.ast_squeeze(ast);

        //compressed code here
        var final_code = pro.gen_code(ast,{
            //encode non-ASCII characters as \uXXXX
            ascii_only:ascii_only,
            //quote all keys in literal objects
            quote_keys:quote_keys,
            //escape occurrences of </script in strings
            inline_scripts:inline_scripts,
            //pass true if you want indented output
            beautify:type=='beautify',
            //initial indentation in spaces
            indent_start:0,
            //indentation level, in spaces (pass an even number)
            indent_level:4,
            //wether to put a space before the colon in object literals
            space_colon:space_colon
        });
        
        return {out:final_code,error:''};
    }
};
