
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'FEDTool' })
};

//uglifyjs
exports.uglifyjs = function(req, res){
  res.render('uglifyjs', { title: 'UglifyJS' })
};
exports.uglifyjs_use = function(req, res){
  res.render('uglifyjs_use', { title: 'UglifyJS' })
};

//notfound
exports.notfound = function(req, res){
  res.render('404', { title: '404' })
};
