// VaultDragon/models/object.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var ObjectSchema   = new Schema({
    key: String,
	value: String,
	timestamps: true
});

module.exports = mongoose.model('Object', ObjectSchema);