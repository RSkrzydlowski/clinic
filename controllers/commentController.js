const express = require('express');
const router = express.Router();
const Comment = require('../models/comment');
const ObjectId = require('mongoose').Types.ObjectId;

router.post('/add', (req, res) => {
	const commentObject = new Comment();
	const { rate, comment, patientId, doctorId } = req.body;

	if (!patientId || !doctorId) {
		return res.json({
			success: false,
			error: 'Please provide all data'
		});
	}

	commentObject.date = Date.now();
	commentObject.patient = patientId;
	commentObject.doctor = doctorId;
	commentObject.rate = rate;
	commentObject.comment = comment;

	commentObject.save((err) => {
		if (err) return res.json({ success: false, error: err });
		return res.json({ success: true });
	});
});

router.get('/:doctorId', (req, res) => {
	const { doctorId } = req.params;
	Comment.find({ doctor: ObjectId(doctorId) }, (err, data) => {
		console.log(data);
		if (err) return res.json({ success: false, error: err });
		return res.json({ success: true, data: data });
	});
});

module.exports = router;
