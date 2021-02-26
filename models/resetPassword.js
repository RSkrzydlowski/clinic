const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema;

const ResetPasswordSchema = new Schema({
	user: { type: Schema.Types.ObjectId, ref: 'User' },
	date: Number
});

ResetPasswordSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('ResetPassword', ResetPasswordSchema);
