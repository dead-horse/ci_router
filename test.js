var connect = require('connect');
var router = require('./lib/router');
var app = connect();
app.use('/main', function(req, res,next) {
  req.auth = 1;
  next();
})
app.use(
  router({
  rewrite: {
    '/[a-zA-Z0-9]+': '/main'
    }
  })
);

app.listen(8081);
