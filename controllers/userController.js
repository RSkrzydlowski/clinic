const express = require('express');
const router = express.Router();
const argon2 = require('argon2');
const crypto = require('crypto');
const User = require('../models/user');
const ObjectId = require('mongoose').Types.ObjectId;
const Comment = require('../models/comment');
const nodemailer = require('nodemailer');
const address = process.env.APP_URL || 'http://localhost:3000';
const emailModule = require('../data/emailMessages');
const sendEmail = require('../services/email');

router.get('/user-number', (req, res) => {
	User.countDocuments((err, data) => {
		if (err) return res.json({ success: false, error: err });
		return res.json({ success: true, data: data });
	});
});

router.get('/doctors', (req, res) => {
	User.find({ role: 'doctor' }, '-salt -hashedPassword', (err, doctorData) => {
		if (err) return res.json({ success: false, error: err });
		const doctorArray = [];
		for (let i = 0; i < doctorData.length; i++) {
			doctorArray.push(ObjectId(doctorData[i]._id));
		}
		console.log(doctorArray);
		Comment.aggregate(
			[
				{
					$match: {
						doctor: { $in: doctorArray },
						rate: { $gt: 0 }
					}
				},
				{ $group: { _id: '$doctor', rate: { $sum: '$rate' }, rateNumber: { $sum: 1 } } }
			],
			(err, commentData) => {
				if (err) return res.json({ success: false, error: err });
				console.table(commentData);
				const returnData = [];
				for (let i = 0; i < doctorData.length; i++) {
					let flag = false;
					for (let j = 0; j < commentData.length; j++) {
						if (commentData[j]._id.equals(doctorData[i]._id)) {
							flag = true;
							const returnItem = {};
							returnItem._id = doctorData[i]._id;
							returnItem.name = doctorData[i].name;
							returnItem.rate = commentData[j].rate / commentData[j].rateNumber;
							returnData.push(returnItem);
							break;
						}
					}
					if (!flag) {
						const returnItem = {};
						returnItem._id = doctorData[i]._id;
						returnItem.name = doctorData[i].name;
						returnItem.rate = 'brak oceny';
						returnData.push(returnItem);
					}
				}
				return res.json({ success: true, data: returnData });
			}
		);
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
			user.activate = false;
			user.hashedPassword = hashedPassword;
			user.salt = salt.toString('hex');
			if (!(user.role === 'admin' || user.role === 'doctor')) {
				user.role = 'user';
			}

			user.save((err) => {
				if (err) return res.json({ success: false, error: err });
				User.findOne({ email: email }, '-salt -hashedPassword', async (err, u) => {
					const emailData = {
						email,
						userName: u.name,
						address,
						userId: u._id
					};
					const mailOptions = emailModule.activateAccountEmail(emailData);
					sendEmail(mailOptions);
					return res.json({ success: true });
				});
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
				if (user.activate) {
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
						error: 'Account is not activate'
					});
				}
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

router.get('/activate/:id', async (req, res) => {
	const { id } = req.params;
	const item = {};
	item.activate = true;
	User.findOne({ _id: id }, (err, user) => {
		if (user.activate) {
			return res.json({ success: false, message: 'To konto jest już aktywne' });
		}
		User.findByIdAndUpdate(id, item, (err) => {
			if (err) return res.json({ success: false, error: err });
			return res.json({ success: true, message: 'Konto zostało aktywowane' });
		});
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
	User.findOne({ _id: id }, '-salt -hashedPassword', (err, data) => {
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

router.post('/set-password', async (req, res) => {
	const { _id, oldPassword, newPassword } = req.body;
	if (!oldPassword || !newPassword) {
		return res.json({
			success: false,
			error: 'Fill all fields'
		});
	}
	if (!_id) {
		return res.json({
			success: false,
			error: 'Something went wrong'
		});
	}
	User.findOne({ _id }, async (err, user) => {
		if (err) return res.json({ success: false, error: err });
		if (user) {
			const correctPassword = await argon2.verify(user.hashedPassword, oldPassword);
			if (correctPassword) {
				const salt = crypto.randomBytes(32);
				const hashedPassword = await argon2.hash(newPassword, { salt });
				const newUser = new User();
				newUser._id = _id;
				newUser.hashedPassword = hashedPassword;
				newUser.salt = salt.toString('hex');
				User.findByIdAndUpdate(_id, newUser, (err) => {
					if (err) return res.json({ success: false, error: err });
					return res.json({ success: true });
				});
			} else {
				return res.json({
					success: false,
					error: 'Incorrect password'
				});
			}
		} else {
			return res.json({ success: false, error: 'Incorrect email or password' });
		}
	});
});

module.exports = router;
