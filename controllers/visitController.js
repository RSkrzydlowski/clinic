const express = require('express');
const router = express.Router();
const Visit = require('../models/visit');

router.post('/add', (req, res) => {
	const visit = new Visit();
	const { date, patientId, doctorId } = req.body;

	if (!flashcardName || !patientId || !doctorId) {
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

module.exports = router;
