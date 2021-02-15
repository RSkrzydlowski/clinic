const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema;

const VisitSchema = new Schema({
	date: Number,
	patient: { type: Schema.Types.ObjectId, ref: 'User' },
	doctor: { type: Schema.Types.ObjectId, ref: 'User' }
});

VisitSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Visit', VisitSchema);
