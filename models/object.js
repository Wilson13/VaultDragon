// VaultDragon/models/object.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var ObjectSchema   = new Schema({
    key: String,
	value: String,
	links: {
		href: { type: String, lowercase: true, trim: true },
		rel:  { type: String, lowercase: true, trim: true },
		method:  { type: String, lowercase: true, trim: true }
	}
},
{ 
	timestamps: {  } 
});

module.exports = mongoose.model('Object', ObjectSchema);
