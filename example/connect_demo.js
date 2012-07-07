var connect = require('connect');
var router = require('../index.js');
var app = connect();
app.use(connect.favicon());
app.use(
  router({
  	path: __dirname + '/controllers',
  	index: 'index',
  	rewrite: {}
  })
);

app.listen(8081);
