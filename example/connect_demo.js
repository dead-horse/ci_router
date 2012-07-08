var connect = require('connect');
var router = require('../');
var app = connect();
app.use(connect.favicon());
app.use(
  router({
    path: __dirname + '/controllers',
    deepth: 3,
    root: '/ctr_1',
    index: 'index',
    rewrite: {
      '/u/[0-9]+': '/folder_1/ctr_1/action_1'
    }
  })
);

app.listen(8081);
