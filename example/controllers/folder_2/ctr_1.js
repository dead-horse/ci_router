exports.index = function(req, res, next) {
  var result = {
    file: __filename,
    action: 'index',
    method: req.method,
    url: req.url,
    param: req.param
  }
  res.end(JSON.stringify(result));
}

exports.action_1 = function(req, res, next) {
  var result = {
    file: __filename,
    action: 'action_1',
    method: req.method,
    url: req.url,
    param: req.param
  }
  res.end(JSON.stringify(result));
}

exports.ACTION_2 = function(req, res, next) {
  var result = {
    file: __filename,
    action: 'ACTION_2',
    method: req.method,
    url: req.url,
    param: req.param
  }
  res.end(JSON.stringify(result));
} 