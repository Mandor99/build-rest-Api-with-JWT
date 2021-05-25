const express = require('express');
const app = express();
const authRouter = require('./routes/auth.router');
const mongoose = require('mongoose');
const env = require('dotenv');

//config env file
env.config();

//connect DB
mongoose.connect(
	process.env.DB_URL,
	{ useNewUrlParser: true, useUnifiedTopology: true },
	(err) => console.log('DB is connected'),
);

// 1. alternative to body parser
app.use(express.json());

//use middleware
app.use('/api/user', authRouter);

app.listen(3000, (err) => {
	console.log('server is on bort 3000 ...');
});
