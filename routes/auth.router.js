const router = require('express').Router();
const authController = require('../controller/auth.controller');
const { check } = require('express-validator');

router.post(
	'/signup',
	check('name').not().isEmpty().withMessage('name is required'),
	check('email')
		.not()
		.isEmpty()
		.withMessage('email is required')
		.isEmail()
		.withMessage('email is invalid'),
	check('password')
		.not()
		.isEmpty()
		.withMessage('password is required')
		.isLength({ min: 6 })
		.withMessage('password must be at least 6 characters'),
	authController.postSignUp,
);

router.post(
	'/login',
	check('email')
		.not()
		.isEmpty()
		.withMessage('email is required')
		.isEmail()
		.withMessage('email is invalid'),
	check('password')
		.not()
		.isEmpty()
		.withMessage('password is required')
		.isLength({ min: 6 })
		.withMessage('password must be at least 6 characters'),
	authController.postLogIn,
);

module.exports = router;
