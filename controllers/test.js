exports.func1 = function(req, res, next) {
  res.end(req.url+'______'+req.param);
}
exports.func2 = function(req, res, next) {
  res.end(req.url);
}
exports.index = function(req, res, next) {
  res.end(req.url);
}