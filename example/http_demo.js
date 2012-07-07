var http = require('http');
var router = require('../');

http.createServer(router({
	path: __dirname + '/controllers',
	index: 'index',
	root: '/ctr_1',
	rewrite: {}
})).listen(8082);