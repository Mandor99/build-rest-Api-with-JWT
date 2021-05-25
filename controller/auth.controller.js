const User = require('../models/User.model');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.postSignUp = async (req, res, next) => {
	if (validationResult(req).isEmpty()) {
		const checkEmail = await User.findOne({ email: req.body.email });
		if (checkEmail) {
			return res.status(400).send('email is already exist!');
		} else {
			const hashedPassword = await bcrypt.hash(req.body.password, 10);
			const user = new User({
				name: req.body.name,
				email: req.body.email,
				password: hashedPassword,
			});
			try {
				const savedUser = await user.save();
				res.send({ useId: savedUser._id });
			} catch (err) {
				res.status(400).send(err);
			}
		}
	} else {
		res.status(400).send({ errors: validationResult(req).array()[0].msg });
	}
};

exports.postLogIn = async (req, res, next) => {
	if (validationResult(req).isEmpty()) {
		const user = await User.findOne({ email: req.body.email });
		if (!user) {
			return res.status(400).send('email is not found!');
		} else {
			const correctPassword = await bcrypt.compare(
				req.body.password,
				user.password,
			);
			if (correctPassword) {
				const token = jwt.sign(
					{ userId: user._id },
					process.env.JWT_SECRET_TOKEN,
				);
				res.header('authToken', token).send(`logged in with token: ${token}`);
				// res.send('logged in ...');
			} else {
				res.status(400).send('invalid password');
			}
		}
	} else {
		res.status(400).send({ errors: validationResult(req).array()[0].msg });
	}
};
