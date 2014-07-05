var http = require('http');
var express = require('express');
var app = module.exports = express();
var util = require('util');
var path = require('path');

app.configure(function() {
	app.set('port', process.env.PORT || 3000);

	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.json());
    app.use(express.urlencoded());
	app.use(express.static(path.join(__dirname, '/public')));	
	app.use(app.router);
	app.use(express.errorHandler({
		dumpExceptions: true, 
		showStack: true
	}));
	app.use(function(err, req, res, next) {
		console.error(err.stack);
		res.send(500, 'Server error');
	});	
});

app.get('*', function (req, res) {
    res.sendfile(path.join(__dirname, '/public/index.html'));
});

http.createServer(app).listen(app.get('port'), function() {
	console.log('Express server is listening on port: %d', app.get('port'));
});
