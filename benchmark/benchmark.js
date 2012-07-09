var connect = require('connect');
var http = require('http');
var ciRouter = require('../');
var app = connect();
var router = ciRouter( {
    path: __dirname + '/controllers',
    root: '/ctr_1'
  }
);
var rewriteRouter = ciRouter({
    path: __dirname + '/controllers',
    root: 'ctr_1',
    rewrite: {
      '/u/(\\w)+': '/ctr_2'
    }
});
http.createServer(router).listen(8084);
http.createServer(rewriteRouter).listen(8085);
app.use(router).listen(8086);
app.use(rewriteRouter).listen(8087);
