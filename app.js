const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Connecting with database
 require('./configs/database');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const indexRoute = require('./routes/index');
const testRoute = require('./routes/test');
const usersRoute = require('./routes/users');

app.use('/', indexRoute);
app.use('/test', testRoute);
app.use('/users', usersRoute);

app.listen(3000);

module.exports = app;