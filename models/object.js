// VaultDragon/models/object.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var ObjectSchema   = new Schema({
    key: String,
	value: String,
	links: {
		href: { type: String },
		rel:  { type: String },
		method:  { type: String }
	}
},
{ 
	timestamps: {  } 
});

module.exports = mongoose.model('Object', ObjectSchema);
