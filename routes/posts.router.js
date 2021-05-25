const router = require('express').Router();
const isAuthRoute = require('./auth.Guard');

router.get('/post', isAuthRoute.isAuth, (req, res, next) => {
	res.json({
		posts: { title: 'first post', content: ';nakf;n;efn;mj;fe;nmf;n;ng' },
	});
	// .send(req.user);
});

module.exports = router;
