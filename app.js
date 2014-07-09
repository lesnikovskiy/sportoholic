var http = require('http');
var express = require('express');
var app = module.exports = express();
var util = require('util');
var path = require('path');
var mongoose = require('mongoose');

var db = require('./data.js');

String.prototype.formatToShortDate = function() {
	return this.replace(/T/, ' ').split(' ')[0]
};

db.connect();

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
		
		if (err.constructor.name === 'UnauthorizedError') {
			return res.send(401, 'Unauthorized');		
		} else {			
			return res.send(500, 'Server error');
		}
	});	
});

app.get('/api/result', function (req, res) {
	db.listResults(function(err, results) {
		if (err)
			res.send(500, err);
			
		return res.send(results);
	});
});

app.get('/api/result/:date', function (req, res) {
	console.log(req.params.date);
	db.findResult({date: req.params.date}, function (err, result) {
		if (err)
			return res.send(400, err);

		return res.send(result);
	});
});

app.post('/api/result', function (req, res) {
	var date = req.body.date 
		? req.body.date.replace(/T/, ' ').split(' ')[0]
		: new Date().toISOString().replace(/T/, ' ').split(' ')[0]
	
	db.createOrUpdate({
		date: date,
		morningWeight: req.body.morningWeight,
		nightWeight: req.body.nightWeight,
		sugar: req.body.sugar,
		lateEating: req.body.lateEating,
		morningFitness: req.body.morningFitness,
		nightFitness: req.body.nightFitness,
		notes: req.body.notes
	}, function (err, results) {
		if (err)
			return res.send(400, err);
			
		return res.send(results);
	});
});

app.get('*', function (req, res) {
    res.sendfile(path.join(__dirname, '/public/index.html'));
});

http.createServer(app).listen(app.get('port'), function() {
	console.log('Express server is listening on port: %d', app.get('port'));
});
