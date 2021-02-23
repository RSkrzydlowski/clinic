const express = require('express');
const visitHour = require('../constant/visitHour');
const router = express.Router();
const User = require('../models/user');
const Visit = require('../models/visit');
const convertHour = require('../services/hour');

router.post('/add', (req, res) => {
	const visit = new Visit();
	const { date, patientId, doctorId } = req.body;
	if (!patientId || !doctorId) {
		return res.json({
			success: false,
			error: 'Please provide all data'
		});
	}

	visit.date = date;
	visit.patient = patientId;
	visit.doctor = doctorId;

	visit.save((err) => {
		if (err) return res.json({ success: false, error: err });
		return res.json({ success: true });
	});
});

router.get('/:id', (req, res) => {
	const { id } = req.params;

	if (!id) {
		return res.json({
			success: false,
			error: 'Please provide all data'
		});
	}

	Visit.find({ patient: id }, (err, data) => {
		if (err) return res.json({ success: false, error: err });
		const doctorArray = [];
		data.forEach((item) => {
			doctorArray.push(item.doctor);
		});
		User.find({ role: 'doctor', _id: { $in: doctorArray } }, '-salt -hashedPassword', (err, doctorData) => {
			console.log('doctor', doctorData);
			return res.json({ success: true, data: data });
		});
	});
});

router.get('/available-visit/:date', (req, res) => {
	const { date } = req.params;
	if (!date) {
		return res.json({
			success: false,
			error: 'Please provide all data'
		});
	}
	if (date < new Date(new Date().setHours(0, 0, 0, 0)).getTime()) {
		return res.json({
			success: false,
			error: 'You cannot enter a date earlier than today.'
		});
	}
	User.find({ role: 'doctor' }, '-salt -hashedPassword', (err, doctorData) => {
		const returnData = [];
		doctorData.forEach((item, index) => {
			const returnItem = {};
			returnItem._id = item._id;
			returnItem.name = item.name;
			returnItem.visit = [ ...visitHour ];
			returnData.push(returnItem);
		});
		Visit.find({ date: { $gt: date, $lt: date + 86400000 } }, (err, visitData) => {
			if (err) return res.json({ success: false, error: err });

			visitData.forEach((item, index) => {
				const doctorItem = returnData.filter((data) => data._id.equals(item.doctor));
				doctorItem[0].visit = doctorItem[0].visit.filter(
					(data) => convertHour(item.date) !== data.split(' - ')[0]
				);
			});
			return res.json({ success: true, data: returnData });
		});
	});
});

module.exports = router;
