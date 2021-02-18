require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000; // Step 1

const userController = require('./controllers/userController');
const visitController = require('./controllers/visitController');
const commentController = require('./controllers/commentController');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/clinic', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false
});

mongoose.connection.on('connected', () => {
	console.log('Mongoose is connected!!!!');
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));
}

app.use(morgan('tiny'));
app.use('/api/users', userController);
app.use('/api/visits', visitController);
app.use('/api/comments', commentController);

app.listen(PORT, console.log(`Server is starting at ${PORT}`));
