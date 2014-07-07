var mongoose = require('mongoose');
var util = require('util');

module.exports = (function () {	
	var connection_string = 'mongodb://localhost:8000/sportoholic';

	var connection = mongoose.connection;
	connection.on('error', console.error.bind(console, 'connection error: '));
	connection.once('open', function callback() {
		console.log('Successfully connected to mongo server at location: %s', connection_string);
	});
	
	var Schema = mongoose.Schema, ObjectId = Schema.ObjectId;
	
	/************** Schema ********************/
	var ResultSchema = new Schema({
		date: {type: Date, required: true, unique: true},
		morningWeight: {type: Number},
		nightWeight: {type: Number},
		sugar: {type: Boolean},
		lateEating: {type: Boolean},
		morningFittness: {type: Boolean},
		nightFittness: {type: Boolean},
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
			Result.find({}, function(err, results) {
				if (err)
					return callback(err);
				
				return callback(null, results);
			});
		},
		getResultByDate: function (date, callback) {
			Result.findOne({date: date}, function (err, result) {
				if (err)
					return callback(err);
					
				return callback(null, result);
			});
		},
		createResult: function (result, callback) {
			Result.create(result, function (err, result) {
				if (err)
					return callback(err);
					
				return callback(null, result);
			});
		},
		updateResult: function (condition, result, callback) {
			Result.update(condition, result, function (err, result) {
				if (err)
					return callback(err);
					
				return callback(null, result);
			});
		},
		deleteResult: function (condition, callback) {
			Result.remove(condition, function (err, result) {
				if (err)
					return callback (err);
					
				return callback(null, result);
			});
		}
	};	
})();