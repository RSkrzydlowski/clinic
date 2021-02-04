const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	name: String,
	email: String,
	salt: String,
	hashedPassword: String,
	role: String
});

UserSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('User', UserSchema);
