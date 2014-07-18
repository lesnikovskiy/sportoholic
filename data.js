var mongoose = require('mongoose');
var util = require('util');
var utils = require('./utilities');

module.exports = (function () {	
	//var connection_string = 'mongodb://localhost:8000/sportoholic';
	var connection_string = 'mongodb://nodejitsu:89af3de90d9d2564412b04ae75baf36d@troup.mongohq.com:10041/nodejitsudb222227843';
	
	var connection = mongoose.connection;
	connection.on('error', console.error.bind(console, 'connection error: '));
	connection.once('open', function callback() {
		console.log('Successfully connected to mongo server at location: %s', connection_string);
	});
	
	var Schema = mongoose.Schema, ObjectId = Schema.ObjectId;
	
	/************** Schema ********************/
	var ResultSchema = new Schema({
		date: {type: Date, required: true},
		morningWeight: {type: Number},
		nightWeight: {type: Number},
		sugar: {type: Boolean},
		lateEating: {type: Boolean},
		morningFitness: {type: Boolean},
		nightFitness: {type: Boolean},
		walking: {type: Boolean},
		notes: {type: String}
	});
	
	/************** Models ********************/
	var Result = mongoose.model('Result', ResultSchema);
	
	return {
		connect: function () {
			if (connection.readyState !== 1) 
				mongoose.connect(connection_string);
		},
		disconnect: function () {
			if (connection.readyState !== 2)
				mongoose.disconnect();
		},
		listResults: function (callback) {
			var startDate = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString();
			var endDate = new Date(new Date().getFullYear(), new Date().getMonth(), utils.getMonthDays(new Date().getMonth())).toISOString();
						
			Result.find({'date': {'$gte': startDate, '$lte': endDate}})
				.sort({date: -1})
				.exec(function(err, results) {
					if (err)
						return callback(err);
					
					return callback(null, results);
				});
		},
		findResult: function (condition, callback) {
			Result.findOne(condition, function (err, result) {
				if (err)
					return callback(err);

				return callback(null, result);
			});
		},
		createResult: function (result, callback) {
			Result.create(result, function (err, created) {
				if (err)
					return callback(err);
					
				return callback(null, created);
			});
		},
		updateResult: function (condition, result, callback) {
			Result.update(condition, result, function (err, updated) {
				if (err) {
					return callback(err);
				}
					
				return callback(null, updated);
			});
		}
	};	
})();