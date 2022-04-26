const mongoose = require('mongoose');
require('dotenv').config();

const urlConnection = process.env.MONGODB_URL;
const connection =  mongoose.connect(urlConnection, {
    useNewUrlParser: true,
});

mongoose.connection.on('error', (err) => {
    console.log('Fail to connect on Database: ' + err);
})

mongoose.connection.on('disconnected', () => {
    console.log('Disconnected of Database!');
})

mongoose.connection.on('connected', () => {
    console.log('Application connected to Database!');
})

module.exports = connection;