const express = require('express');
const router = express.Router();
const argon2 = require('argon2');
const crypto = require('crypto');
const User = require('../models/user');

router.get('/user-number', (req, res) => {
	User.countDocuments((err, data) => {
		if (err) return res.json({ success: false, error: err });
		return res.json({ success: true, data: data });
	});
});

router.get('/doctors', (req, res) => {
	User.find({ role: 'doctor' }, '-salt -hashedPassword', (err, data) => {
		if (err) return res.json({ success: false, error: err });
		return res.json({ success: true, data: data });
	});
});

router.post('/register', async (req, res) => {
	const { name, email, password } = req.body;
	if (!name || !email || !password) {
		return res.json({
			success: false,
			error: 'Please provide email and password'
		});
	}

	User.findOne({ email: email }, async (err, u) => {
		if (err) return res.json({ success: false, error: err });
		if (u) {
			return res.json({ success: false, error: 'Email taken' });
		} else {
			const user = new User();
			const salt = crypto.randomBytes(32);
			const hashedPassword = await argon2.hash(password, { salt });

			user.name = name;
			user.email = email;
			user.hashedPassword = hashedPassword;
			user.salt = salt.toString('hex');
			if (!(user.role === 'admin' || user.role === 'doctor')) {
				user.role = 'user';
			}
			user.save((err) => {
				if (err) return res.json({ success: false, error: err });
				return res.json({ success: true });
			});
		}
	});
});

router.post('/login', async (req, res) => {
	const { email, password } = req.body;
	User.findOne({ email: email }, async (err, user) => {
		if (err) return res.json({ success: false, error: err });
		if (user) {
			const correctPassword = await argon2.verify(user.hashedPassword, password);
			if (correctPassword) {
				return res.json({
					success: true,
					id: user._id,
					name: user.name,
					role: user.role,
					email: user.email
					// token: jwt.sign(
					// 	{
					// 		_id: user._id,
					// 		email: user.email,
					// 		role: user.role
					// 	},
					// 	signature,
					// 	{
					// 		expiresIn: expiration
					// 	}
					// )
				});
			} else {
				return res.json({
					success: false,
					error: 'Incorrect email or password'
				});
			}
		} else {
			return res.json({ success: false, error: 'Incorrect email or password' });
		}
	});
});

router.post('/adminLogin', async (req, res) => {
	const { email, password } = req.body;
	User.findOne({ email: email }, async (err, user) => {
		if (err) return res.json({ success: false, error: err });
		if (user) {
			const correctPassword = await argon2.verify(user.hashedPassword, password);
			if (correctPassword) {
				return res.json({
					success: true,
					id: user._id,
					name: user.name,
					role: user.role,
					email: user.email
					// token: jwt.sign(
					// 	{
					// 		_id: user._id,
					// 		email: user.email,
					// 		role: user.role
					// 	},
					// 	signature,
					// 	{
					// 		expiresIn: expiration
					// 	}
					// )
				});
			} else {
				return res.json({
					success: false,
					error: 'Incorrect email or password'
				});
			}
		} else {
			return res.json({ success: false, error: 'Incorrect email or password' });
		}
	});
});

router.get('/:id', (req, res) => {
	const { id } = req.params;
	User.findOne({ _id: id }, (err, data) => {
		if (err) return res.json({ success: false, error: err });
		return res.json({ success: true, data: data });
	});
});

router.get('/profile/:userName', (req, res) => {
	const { userName } = req.params;
	User.findOne({ name: userName }, (err, data) => {
		if (err) return res.json({ success: false, error: err });
		return res.json({ success: true, data: data });
	});
});

router.get('/', (req, res) => {
	const { page, limit, search } = req.query;
	User.paginate(
		{
			$and: [
				{
					email: { $regex: search || '', $options: 'i' },
					role: { $ne: 'admin' }
				}
			]
		},
		{
			select: 'email',
			limit: limit ? Number(limit) : 30,
			page: page || 1,
			sort: { email: 'asc' }
		},
		(err, data) => {
			if (err) return res.json({ success: false, error: err });
			return res.json({ success: true, data: data });
		}
	);
});

module.exports = router;
