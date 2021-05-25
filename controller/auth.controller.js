const User = require('../models/User.model');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

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
