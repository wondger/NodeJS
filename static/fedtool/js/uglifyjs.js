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
        $.ajax({
            url:'/uglifyjs/use.do',
            data:form.serialize(),
            type:'post',
            dataType:'json',
            success:function(data){
                error.html('');
                output.val('');
                if(data.error){
                    error.html(data.error);
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
