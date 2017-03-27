// vault_dragon_server.js

const express = require('express');
const app = express();
var bodyParser = require('body-parser');
var validator = require('express-validator');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost'); // connect to our database
var Object = require('./models/object');

/*app.get('/', (req, res) => {
  res.send('Hello World!')
})*/
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

// test route to make sure everything is working (accessed at GET http://localhost:3000/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

// Routes for our API

// on routes that end in /object
// ----------------------------------------------------
router.route('/object')

    // create a bear (accessed at POST http://localhost:3000/api/object)
    .post(function(req, res) {

		req.checkBody("key", "Key value cannot be empty").notEmpty();
	
        var object = new Object();	// create a new instance of the Object model
        object.key = req.body.key;  // set the object key (comes from the request)
		object.value = req.body.value;	// set the object key-paired value (comes from the request)
		
		/*req.getValidationResult().then( result => {
			errors = result.useFirstErrorOnly().mapped(); // enjoy an array with no duplicated errors for any given parameter!
			if (errors) {
				res.send(errors);
				return;
			} 
		})*/
		//var errors = result;
		var errors = req.validationErrors();
		
		// Validation errors
		if (errors) {
			res.send(errors);
			return;
		} else {
			// save the object and check for errors
			object.save(function(err) {
				if (err)
					res.send(err);
				else
					res.json({ message: 'Object created! ' + req.body.value });
			});
        }
    })

	 // get all the object (accessed at GET http://localhost:3000/api/object)
    .get(function(req, res) {
		Object.find(function(err, object) {
            if (err)
                res.send(err);

            res.json(object);
        });
    });

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);

//app.use(express.static('public'))
//app.listen(3000, () => console.log('Server running on port 3000'))
