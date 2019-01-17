const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./config/database');
const route = require('./routes/business.route');

const PORT = 4000;

app = express();

//Connect to database
mongoose.connect(config.database);
const db = mongoose.connection;
db.once('open', () => {
    console.log('Connection established');
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/business', route);

app.listen(PORT, () => {
    console.log('Server is listening on Port:', PORT);
});