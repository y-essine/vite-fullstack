const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const RateLimit = require('express-rate-limit');


const { PORT, mongoUri } = require('./config');

/*

export MONGO_URI='mongodb+srv://ye55ine:1@clusterize.hyupy.mongodb.net/social?retryWrites=true&w=majority'

export SECRET_KEY='SECRET'

*/

const usersRoutes = require('./routes/api/users')

app
    .use(cors())
    .use(morgan('tiny'))
    .use(bodyParser.json())

mongoose
    .connect(mongoUri)
    .then(() => {
        console.log('Connection to MongoDB is successful.');
    })
    .catch((err) => console.log(err));

// app.use('/api/todoListItems', todoListItemRoutes);
app.use('/api/users', usersRoutes);

// set up rate limiter: maximum of five requests per minute
const limiter = new RateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 10
});

// apply rate limiter to all requests
app.use(limiter);

if (process.env.NODE_ENV == 'production') {
    app.use(express.static('client/dist'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'));
    })
}

app.listen(PORT, () => console.log((`App listening at http://localhost:${PORT}`)));

