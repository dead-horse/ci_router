var connect = require('connect');
var router = require('./lib/router');
var app = connect();
app.use(connect.favicon());
app.use('/main', function(req, res,next) {
  req.auth = 1;
  next();
})
app.use(
  router({
  })
);

app.listen(8081);
