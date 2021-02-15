const express = require('express');
const router = express.Router();
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
		return res.json({ success: true, data: data });
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

	Visit.find({ date: { $gt: date, $lt: date + 86400000 } }, (err, data) => {
		if (err) return res.json({ success: false, error: err });
		const returnData = [];
		data.forEach((item, index) => {
			const returnItem = {};
			returnItem._id = item._id;
			returnItem.doctor = item.doctor;
			returnItem.time = convertHour(item.date);
			returnData.push(returnItem);
		});
		return res.json({ success: true, data: returnData });
	});
});

module.exports = router;
