var fs = require('fs');
var path = require('path');
var pJoin = path.join;
var urlparse = require('url').parse;

function pageNotFound(req, res) {
  res.statusCode = 404;
  res.end(req.method !== 'HEAD' && req.method + ' ' + req.url + ' Not Found ');
}

module.exports = function router(options) {
  //default options
  options = options || {};
  options.path = options.path || './controllers';
  options.deepth = options.deepth || 1;
  options.index = options.index || 'index';
  options.rewrite = options.rewrite || {};
  options.root = options.root || '/';
  options.pageNotFound = options.pageNotFound || pageNotFound;
  var controllers = {};
  
  //load all the controllers
  var realPath = path.resolve(options.path);

  var innerDirs = [];
  do {
    var inner = innerDirs.shift() || '';
    var dirName = pJoin(realPath, inner);
    fs.readdirSync(dirName).forEach(function(filename) {
      var totalName = pJoin(dirName + '/' + filename);
      var innerName = pJoin(inner, filename);
      if (fs.statSync(totalName).isDirectory() && innerName.split('/').length < options.deepth) {
        innerDirs.push(innerName);
      }
      else if (/\.js$/.test(filename) && !controllers.hasOwnProperty(innerName.slice(0, -3))) {
        var controller = require(totalName);
        for (var key in controller) {
          var temp = controller[key];
          delete controller[key];
          controller[key.toUpperCase()] = temp;
        }
        controllers[innerName.slice(0, -3).toUpperCase()] = controller;
      }
    });
  } while(innerDirs.length);

  return function lookup(req, res, next) {
    var pathname = urlparse(req.url).pathname;
    pathname = !pathname || pathname === '/' ? options.root : pathname;
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
    var ctlName = '';
    var controller;
    var funcNum = 0;
    var deepth = segments.length < options.deepth ? segments.length : options.deepth;
    for (var i = 0; i < deepth; ++i) {
      ctlName = pJoin(ctlName, segments[i]);
      controller = controllers[(ctlName || options.index).toUpperCase()];
      funcNum++;
      if (controller) {
        var func = controller[(segments[funcNum] || options.index).toUpperCase()];
        if (typeof func === 'function') {
          req.param = segments.splice(funcNum + 1);
          return func(req, res, next);
        }
        return pageNotFound(req, res, next);
      }
    }
    pageNotFound(req, res, next);
  }
}
