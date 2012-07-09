var connect = require('connect');
var http = require('http');
var ciRouter = require('../');
var app = connect();
var router = ciRouter( {
    path: __dirname + '/controllers',
    root: '/ctr_1'
  }
);
app.use(router).listen(8086);
http.createServer(router).listen(8085);
