const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const { PORT, mongoUri } = require('./config');

const todoListItemRoutes = require('./routes/api/todoListItems');

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

app.use('/api/todoListItems', todoListItemRoutes);
app.get('/', (req, res) => res.send('Hello World!'));

app.listen(PORT, () => console.log((`App listening at http://localhost:${PORT}`)));

