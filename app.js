var http = require('http');
var express = require('express');
var app = module.exports = express();
var util = require('util');
var path = require('path');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var expressjwt = require('express-jwt');
var moment = require('moment');

var db = require('./data.js');
db.connect();

app.configure(function() {
	app.set('port', process.env.PORT || 3000);
	app.set('secret', 'FE6DA63C-03CD-4FE4-8B3A-8EB0651A5B82');

	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.json());
    app.use(express.urlencoded());
	app.use(express.static(path.join(__dirname, '/public')));	
	// remove app.use(express.router) as it should be processed via express-jwt
	app.use('/api', expressjwt({secret: app.get('secret')}));
	app.use(function(err, req, res, next) {
		console.error(err.stack);		
		if (err.constructor.name === 'UnauthorizedError') {
			return res.send(401, 'Unauthorized');		
		} else {			
			return res.send(500, 'Server error');
		}
	});	
	app.use(express.errorHandler({
		dumpExceptions: true, 
		showStack: true
	}));	
});

app.get('/api/result', function (req, res) {
	var token = /^Bearer (.*)$/gi.exec(req.headers.authorization)[1];
	if (!token)
		return res.send(401, 'Unauthorized');		
		
	jwt.verify(token, app.get('secret'), function (err, decoded) {
		if (err)
			res.send(500, err);
			
		db.listResults(decoded._id, function(err, results) {
			if (err)
				res.send(500, err);
				
			return res.send(results);
		});
	});		
});

app.get('/api/result/:id', function (req, res) {
	if (!req.params.id)
		return res.send(500, {message: '_id paramater is required'});
		
	db.findResult({_id: req.params.id}, function (err, result) {
		if (err)
			return res.send(400, err);

		return res.send(result);
	});
});

app.post('/api/result', function (req, res) {
	var token = /^Bearer (.*)$/gi.exec(req.headers.authorization)[1];
	if (!token)
		return res.send(401, 'Unauthorized');		
		
	jwt.verify(token, app.get('secret'), function (err, decoded) {
		if (err)
			return res.send(500, err);
			
		var result = {
			date: req.body.date,
			morningWeight: req.body.morningWeight,
			nightWeight: req.body.nightWeight,
			sugar: req.body.sugar,
			lateEating: req.body.lateEating,
			morningFitness: req.body.morningFitness,
			nightFitness: req.body.nightFitness,
			walking: req.body.walking,
			notes: req.body.notes,
			userId: decoded._id
		};

		if (!req.body._id) {
			db.createResult(result, function (err, newOne) {
				if (err)
					return res.send(400, err);
					
				return res.send(201, {result: newOne});
			});
		} else {
			db.updateResult({_id: req.body._id}, result, function (err, updated) {			
				if (err)
					return res.send(400, err);
					
				return res.send(201, {result: updated});
			});
		}
	});	
});

app.post('/register', function (req, res) {
	db.registerUser({
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		email: req.body.email,
		password: req.body.password,
		date: new Date()
	}, function (err, u) {
		if (err)
			res.send(500, err);
			
		res.send(u);
	});
});

app.post('/signin', function (req, res) {
	if (!req.body.email)
		return res.send(500, {message: 'email is required'});
		
	if (!req.body.password) 
		return res.send(500, {message: 'password is required'});
	
	db.findUser(req.body.email, req.body.password, function (err, user) {
		if (err)
			res.send(500, 'Email or password is incorrect');
			
		if (!user)
			return res.send(401, 'Unauthorized');
		
		var token = jwt.sign(user, app.get('secret'), {expiresInMinutes: 60});
		return res.send(token);
	});
});

app.get('*', function (req, res) {
    res.sendfile(path.join(__dirname, '/public/index.html'));
});

http.createServer(app).listen(app.get('port'), function() {
	console.log('Express server is listening on port: %d', app.get('port'));
});
