const express = require('express');
const mongoose = require('mongoose');
const users = require('./routes/api/users');
const tweets = require('./routes/api/tweets');
const bodyParser = require('body-parser');
const passport = require('passport');
require('./config/passport')(passport);

const server = express();
//**! Returns middleware that only parses json and only looks at requests where the Content-Type header matches the type option*/
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

const db = require('./config/keys').mongoURI;
mongoose
	.connect(db, { useNewUrlParser: true })
	.then(() => console.log('Connected to MongoDB successfully'))
	.catch((err) => console.log(err));

server.use(passport.initialize());

server.use('/api/users', users);
server.use('/api/tweets', tweets);

const port = process.env.PORT || 5000;

server.listen(port, () => console.log(`Server is running on port ${port}`));
