const express = require('express');
const router = express.Router();
const Comment = require('../models/comment');
const User = require('../models/user');
const ObjectId = require('mongoose').Types.ObjectId;
const ConvertDate = require('../services/time');

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
	Comment.find({ doctor: ObjectId(doctorId) }, (err, commentData) => {
		if (err) return res.json({ success: false, error: err });
		const patientArray = [];
		for (let i = 0; i < commentData.length; i++) {
			patientArray.push(ObjectId(commentData[i].patient));
		}
		User.find({ _id: { $in: patientArray } }, '-salt -hashedPassword', (err, userData) => {
			const returnData = [];
			for (let i = 0; i < commentData.length; i++) {
				for (let j = 0; j < userData.length; j++) {
					if (commentData[i].patient.equals(userData[j]._id)) {
						const returnItem = {};
						returnItem._id = commentData[i]._id;
						returnItem.patient = userData[j].name;
						returnItem.doctor = commentData[i].doctor;
						returnItem.comment = commentData[i].comment;
						returnItem.date = ConvertDate(commentData[i].date);
						returnItem.rate = commentData[i].rate;
						returnData.push(returnItem);
						break;
					}
				}
			}
			console.log(returnData);
			return res.json({ success: true, data: returnData });
		});
	});
});

module.exports = router;
