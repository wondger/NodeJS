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
        type = $('#uglify_type');

    $('#btn_beautify').click(function(){
        type.val('beautify');
        io();
    });

    $('#btn_compress').click(function(){
        type.val('compress');
        io();
    });

    function io(){
        if(!source.val()){
            error.html('source code is empty!!!')
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
                if(data.error){
                    error.html('ERROR: line '+data.error.line+' col '+data.error.col+'<br />'+data.error.message);
                }else if(data.out){
                    output.val(data.out);
                }
            },
            error:function(){
                form.submit();
            }
        })
    }
});
