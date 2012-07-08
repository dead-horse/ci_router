var http = require('http');
var router = require('../');

http.createServer(router({
    path: __dirname + '/controllers',
    deepth: 3,
    root: '/ctr_1',
    index: 'index',
    rewrite: {
      '/u/[0-9]+': '/folder_1/ctr_1/action_1'
    }
  })).listen(8082);
