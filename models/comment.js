const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
	patient: { type: Schema.Types.ObjectId, ref: 'User' },
	doctor: { type: Schema.Types.ObjectId, ref: 'User' },
	comment: String,
	rate: Number,
	date: Number
});

CommentSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Comment', CommentSchema);
