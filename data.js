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
		date: {type: String, required: true, unique: true},
		morningWeight: {type: Number},
		nightWeight: {type: Number},
		sugar: {type: Boolean},
		lateEating: {type: Boolean},
		morningFitness: {type: Boolean},
		nightFitness: {type: Boolean},
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
		findResult: function (condition, callback) {
			Result.findOne(condition, function (err, result) {
				if (err)
					return callback(err);

				return callback(null, result);
			});
		},
		createOrUpdate: function (result, callback) {
			Result.findOne({date: result.date}, function (err, found) {
				console.log('found: ' + found);
				if (err) 
					return callback(err);
					
				if (found) {
					Result.update({date: found.date}, result, function (err, updated) {
						console.log('updated: ' + updated);
						if (err) {
							console.log(JSON.stringify(err));
							return callback(err);
						}
							
						return callback(null, updated);
					});
				} else {
					Result.create(result, function (err, created) {
						console.log('created: ' + created);
						if (err)
							return callback(err);
							
						return callback(null, created);
					});
				}				
			});
		}
	};	
})();