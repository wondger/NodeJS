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
        type = $('#uglify_type');

    $('#btn_beautify').click(function(){
        type.val('beautify');
        form.submit();
    });

    $('#btn_compress').click(function(){
        type.val('compress');
        form.submit();
    });
});
