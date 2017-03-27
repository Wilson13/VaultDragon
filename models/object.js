// VaultDragon/models/object.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var ObjectSchema   = new Schema({
    key: String,
	value: String,
	created_at: { type: Date },
	updated_at: { type: Date }
});

module.exports = mongoose.model('Object', ObjectSchema);