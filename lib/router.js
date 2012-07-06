var fs = require('fs');
var path = require('path');
var urlparse = require('url').parse;

function pageNotFound(req, res) {
  res.statusCode = 404;
  res.end(req.method !== 'HEAD' && req.method + ' ' + req.url + ' Not Found ');
}

module.exports = function router(options) {
  //default options
  options = options || {};
  options.path = options.path || './controllers';
  options.index = options.index || 'index';
  options.rewrite = options.rewrite || {};
  
  var controllers = {};
  
  //load all the controllers
  var realPath = path.resolve(options.path);
  var innerDirs = [];
  do {
    var inner = innerDirs.shift() || '';
    var dirName = realPath + (inner ? '/' + inner : '');
    fs.readdirSync(dirName).forEach(function(filename) {
      var totalName = dirName + '/' + filename;
      var innerName = inner ? inner + '/' + filename : filename;
      if (fs.statSync(totalName).isDirectory()) {
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

  console.log(controllers);
  function getActionParam() {
    var ctlName = '';
    var controller;
    var funcNum;
    for (var i = 0, len = arguments.length; i != len; ++i) {
      ctlName += arguments[i];
      controller = controllers[(ctlName || options.index).toUpperCase()];
      funcNum = i+1;
      if (controller) {
        break;
      }
      ctlName += '/';
    }
    if (controller) {
      var func = controller[(arguments[funcNum] || options.index).toUpperCase()];
      if (typeof func === 'function') {
        return {
          action: func,
          params: Array.prototype.splice.call(arguments, funcNum + 1)
        }
      }
    }
    return {
      action: pageNotFound
    };
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
    var actionInfo = getActionParam.apply(null, segments);
    req.param = actionInfo.param;
    actionInfo.action.apply(null, arguments);
  }
}
