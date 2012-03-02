/*
 * @name:uglifyjs.js
 * @description:uglifyjs
 * @author:wondger@gmail.com
 * @date:2012-02-14
 * @param:
 * @todo:
 * @changelog:
 */
$(function(){

    var form = $('#uglify_form'),
        source = $('#source'),
        output = $('#output'),
        error = $('#error'),
        type = $('#uglify_type'),
        ck_url = $('#J_src_url'),
        url = $('#J_source_url');

    var btn_beautify = $('#btn_beautify'),
        btn_compress = $('#btn_compress');

    btn_beautify.click(function(){
        type.val('beautify');
        toggleBtn(false);
        io();
    });

    btn_compress.click(function(){
        type.val('compress');
        toggleBtn(false);
        io();
    });

    function toggleBtn(f){
        var f = !!f;
        btn_beautify.prop('disabled',!f);
        btn_compress.prop('disabled',!f);
    }

    function io(){
        if((!ck_url.attr('checked') && !source.val()) || (!!ck_url.attr('checked') && !url.val())){
            error.html('source code is empty!!!')
            toggleBtn(true);
            return;
        }
        $.ajax({
            url:'/uglifyjs/use.do',
            data:form.serialize(),
            type:'post',
            dataType:'json',
            success:function(data){
                error.html('');
                output.val('');
                source.val(data.src);
                if(data.error){
                    if(data.error.line && data.error.col){
                        error.html('ERROR: line '+data.error.line+' col '+data.error.col+'<br />'+data.error.message);
                    }else if(data.error.code){
                        error.html('ERROR: '+data.error.code+'<br />'+data.error.message);
                    }else{
                        error.html('ERROR!')
                    }
                }else if(data.out){
                    output.val(data.out);
                }
                toggleBtn(true);
            },
            error:function(){
                form.submit();
                toggleBtn(true);
            }
        })
    }
});
