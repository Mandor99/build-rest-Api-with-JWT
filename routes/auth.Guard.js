const jwt = require('jsonwebtoken');

exports.isAuth = (req, res, next) => {
	const token = req.header('authToken');
	if (token) {
		jwt.verify(token, process.env.JWT_SECRET_TOKEN, (err, user) => {
			if (err) return res.status(400).send('invalid token');
			else {
				req.user = user; // the data in jwt.sign(data, secret) ==>> will be userId: user._id
				next();
			}
		});
	} else {
		return res.status(401).send('ACCESS DENIED');
	}
};
