// vault_dragon_server.js

// Build a version controlled key-value store with a HTTP API we can query that from. The API needs to be able to:
// 1. Accept a key(string) and value(some json blob/string) and store them. If an existing key is sent, the value should be updated
// 2. Accept a key and return the corresponding latest value
// 3. When given a key AND a timestamp, return whatever the value of the key at the time was.
// Assume only GET and POST requests for simplicity.

const express = require('express');
const app = express();
var bodyParser = require('body-parser');
var validator = require('express-validator');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost'); // connect to our database
var Object = require('./models/object');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(validator());

var port = process.env.PORT || 3000;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests

/*router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});*/

// Test route to make sure everything is working (accessed at GET http://localhost:3000/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

// On routes that end in /object
// ----------------------------------------------------
router.route('/object')

	/* 1. Accept a key(string) and value(some json blob/string) and store them. If an existing key is sent, the value should be updated */
    // Create an object (accessed at POST http://localhost:3000/api/object)
    .post(function(req, res) {

		// Make sure key and value are both not empty
		req.checkBody("key", "Key cannot be empty").notEmpty();
		req.checkBody("value", "Value cannot be empty").notEmpty();
		var errors = req.validationErrors();
		
		// Validation resulted errors
		if (errors) {
			res.send(errors);
			return;
		} else {
			// Originally wanted to use the function below, but decided to just save new Object every time for historical timestamps purpose.
			// Find object and update it's value if it exists.
			/*Object.findOneAndUpdate({key : req.body.key}, {value : req.body.value}, {upsert: true, new: true}, function (err, object) {
				if (err){
					res.send(err);
				} else {
					// If object is not null, object is updated.
					if (object)
						res.json({ message: 'Object updated! ' , 'Key' : object.key, 'Value' : object.value, 'Updated at' : object.updatedAt });
					// If object is null, new object is created.
					else
						res.json({ message: 'Object created! ' , 'Key' : + req.body.key, 'Value' : req.body.value, 'Created at' : new Date().toISOString() });
				}
			});*/
			
			// Create and save new Object every time for historical timestamps purpose.
			var object = new Object();	// create a new instance of the Object model
			object.key = req.body.key;  // set the object key (comes from the request)
			object.value = req.body.value;	// set the object key-paired value (comes from the request)
			object.links.href = "/object/\"" + object.key+"\"";
			object.links.rel = "self";
			object.links.method = "GET";
			
			object.save(function(err, object) {
			   if (err)
				res.send(err);
			   else
				res.json(object);
			});
        }
    })
	
	 // Display all the objects (accessed at GET http://localhost:3000/api/object)
    .get(function(req, res) {
		Object.find(function(err, object) {
            if (err)
                res.send(err);

			var objectMap = {};

			object.forEach(function(object) {
				objectMap[object._id] = object;
			});

			res.send(objectMap);  
			/*var returnJSON = { value: object.value, key: object.key, time: object.updateAt };
            res.json(object);*/
        });
    });
	
// On routes that end in /object/:key
// ----------------------------------------------------
router.route('/object/:key')
	
	// Get object value with that key and with the latest timestamps (accessed at GET http://localhost:3000/api/object/:key)
    .get(function(req, res) {
	
		// Time saved in object model is in mongoDB ISO date format, e.g. "2017-03-29T03:07:11.365Z".
		// Therefore, according to the requirement, when a timestamp is given (without milliseconds), 
		// it need to be convert into milliseconds. 
		
		// Since milliseconds value would be "000", the query would miss the actual data, e.g
		// 		An object with updateAT value of "2017-03-29T03:07:11.365Z" would not be return if 
		//		the query is looking for a value of lesser than "2017-03-29T03:07:11.000Z".
		
		// Therefore, add "999" to cover all datetime from "2017-03-29T03:07:11.000Z" to ""2017-03-29T03:07:11.999Z".
		var timestamp = req.query.timestamp * 1000 + 999;
		req.checkQuery("timestamp", "Timestamp is empty").notEmpty();
		var isEmpty = req.validationErrors();
		var query = { key: req.params.key }; // Query is dependent on whether timestamp is empty
		
		
		if (!isEmpty) {
			/* 3. When given a key AND a timestamp, return whatever the value of the key at the time was. */
			// If timestamp is provided, get the timestamp at or the latest before this time.
			query = { key: req.params.key, updatedAt: { $lt: new Date(timestamp).toISOString() }};
		} else {
			/* 2. Accept a key and return the corresponding latest value */
			// If timestamp is not provided, get the latest value.
			query = { key: req.params.key };
		}
		Object.findOne(query, function(err, object) {
			if (object)
				res.json(object.value);
			else {
				res.json( { message: 'No object with key \'' + req.params.key + '\' was found. Timestamp: ' + 
				timestamp + ' ISO date: ' +  new Date(timestamp).toISOString() });
			}
		}).sort({ updatedAt : -1 });
    });

// On routes that end in /object/delete
// ----------------------------------------------------
router.route('/object/delete')
	
	.delete(function(req, res) {
        Object.remove({}, function(err) {
            if (err)
				res.send(err);

            res.json({ message: 'All objects delete!' });
        });
    });
	
// REGISTER OUR ROUTES -------------------------------
// All of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);

//app.use(express.static('public'))
