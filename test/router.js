var http = require('http');
var connect = require('connect');
var ciRouter = require('../');

var router = ciRouter({
  'path': 'example/controllers',
  'root': '/ctr_2',
  'rewrite': {
    '/u/(\d)+': '/folder_2/ctr_1/action_1',
    '/a/[0-9]+': '/folder_1/ctr_1/action_1'
  }
});

[http, connect].forEach( function(m, index) {
  var moduleName = index === 0 ? 'http' : 'connect';
  describe(moduleName + '.createServer()', function() {
    var app;
    before(function (done) {
      app = m.createServer(router).listen(0, done);
    });
    after(function () {
      app.close();
    });

    describe('common url support', function() {
      it('should /ctr_1/action_1 200', function(done) {
        app.request().get('/ctr_1/action_1').end(function(res) {
          res.should.status(200);
          var result = JSON.parse(res.body);
          result.method.should.equal('GET');
          result.action.should.equal('action_1');
          result.url.should.equal('/ctr_1/action_1');
          (!result.param).should.be.ok;
          result.file.should.include('example/controllers/ctr_1.js');
          done();
        });
      });

      it('should /ctr_2/Action_2 200', function(done) {
        app.request().get('/ctr_2/Action_2').end(function(res) {
          res.should.status(200);
          var result = JSON.parse(res.body);
          result.method.should.equal('GET');
          result.action.should.equal('ACTION_2');
          result.url.should.equal('/ctr_2/Action_2');
          (!result.param).should.be.ok;
          result.file.should.include('example/controllers/ctr_2.js');
          done();
        });
      });

      it('shoud post /ctr_1/ACTION_2 200', function(done) {
        app.request().post('/ctr_1/ACTION_2').end(function(res) {
          res.should.status(200);
          var result = JSON.parse(res.body);
          result.method.should.equal('POST');
          result.action.should.equal('ACTION_2');
          result.url.should.equal('/ctr_1/ACTION_2');
          (!result.param).should.be.ok;
          result.file.should.include('example/controllers/ctr_1.js');
          done();
        });
      });
    });

    describe('support defualt action', function() {
      it('should /ctr_1 200', function(done) {
        app.request().get('/ctr_1').end(function(res) {
          res.should.status(200);
          var result = JSON.parse(res.body);
          result.method.should.equal('GET');
          result.action.should.equal('index');
          result.url.should.equal('/ctr_1');
          (!result.param).should.be.ok;
          result.file.should.include('example/controllers/ctr_1.js');
          done();
        });
      });

      it('should /ctr_1/ 200', function(done) {
        app.request().get('/ctr_1/').end(function(res) {
          res.should.status(200);
          var result = JSON.parse(res.body);
          result.method.should.equal('GET');
          result.action.should.equal('index');
          result.url.should.equal('/ctr_1/');
          (!result.param).should.be.ok;
          result.file.should.include('example/controllers/ctr_1.js');
          done();
        });
      });        
    });

    describe('support inner folder', function() {
      it('should /folder_1/ctr_1 200', function(done) {
        app.request().get('/folder_1/ctr_1').end(function(res) {
          res.should.status(200);
          var result = JSON.parse(res.body);
          result.method.should.equal('GET');
          result.action.should.equal('index');
          result.url.should.equal('/folder_1/ctr_1');
          (!result.param).should.be.ok;
          result.file.should.include('example/controllers/folder_1/ctr_1.js');
          done();
        });
      });

      it('should /folder_1/inner_folder/ctr_1/action_2 200', function(done) {
        app.request().get('/folder_1/inner_folder/ctr_1/action_2').end(function(res) {
          res.should.status(200);
          var result = JSON.parse(res.body);
          result.method.should.equal('GET');
          result.action.should.equal('ACTION_2');
          (!result.param).should.be.ok;
          result.file.should.include('example/controllers/folder_1/inner_folder/ctr_1.js');
          done();
        });
      });      
    });
    
    describe('support root url rewrite', function() {
      it('should / 200', function(done) {
        app.request().get('/').end(function(res) {
          res.should.status(200);
          var result = JSON.parse(res.body);
          result.method.should.equal('GET');
          result.action.should.equal('index');
          (!result.param).should.be.ok;
          result.file.should.include('example/controllers/ctr_2.js');
          done();
        });
      })
    })
  });
});