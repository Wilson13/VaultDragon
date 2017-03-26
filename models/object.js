// VaultDragon/models/object.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var ObjectSchema   = new Schema({
    name: String
});

module.exports = mongoose.model('Object', ObjectSchema);