
var fs = require('fs');
var path = require('path');
var urlparse = require('url').parse;

function pageNotFound(req, res) {
  res.statusCode = 404;
  res.end(req.method !== 'HEAD' && req.method + ' ' + req.url + ' Not Found ');
}

module.exports = function router(options) {
  options = options || {};
  options.path = options.path || './controllers';
  options.index = options.index || 'index';
  options.rewrite = options.rewrite || {};
  var controllers = {};
  var realPath = path.resolve(options.path);
  fs.readdirSync(realPath).forEach(function (filename){
    if (!/\.js$/.test(filename)) {
      return ;
    }
    var controller = require(realPath + '/' + filename);
    Object.keys(controller).forEach(function(funcName){
      controller[funcName.toUpperCase()] = controller[funcName];
    });
    controllers[path.basename(filename, '.js').toUpperCase()] = controller;
  });

  function getFunc(controller, func) {
    controller = controllers[(controller || options.index).toUpperCase()];
    if (controller) {
      func = controller[(func || options.index).toUpperCase()];
      if (typeof func === 'function') {
        return func;
      }
    }
    return pageNotFound;
  }
  return function lookup(req, res, next) {
    var pathname = urlparse(req.url).pathname;
    var rewrite = options.rewrite;
    var rewritePath = '';
    for(var key in rewrite) {
      var reg = new RegExp('^' + key);
      rewritePath = pathname.replace(reg, rewrite[key]);
      if (rewritePath !== pathname) {
        pathname = rewritePath;
        break;
      }
    }
    var segments = pathname.slice(1).split('/');
    req.param = segments.splice(2);
    getFunc.apply(null, segments).apply(null, arguments);
  }
}
