exports.func1 = function(req, res, next) {
  res.end(req.url + req.auth);
}

exports.func2 = function(req, res, next) {
  res.end(req.url);
}