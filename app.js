'use strict';

const express = require('express');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const BasicStrategy = require('passport-http').BasicStrategy;
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
mongoose.Promise - require('bluebird');
const bodyParser = require('body-parser');
const parseurl = require('parseurl');
const session = require('express-session');
const expressValidator = require('express-validator');
const mustacheExpress = require('mustache-express');

const secret = require('./secret');

const app = express();

app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');

app.use(
  session({
    secret: secret.session,
    resave: false,
    saveUninitialized: true
  })
);

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(expressValidator());

// insert passport strategies here

app.use('/', require('./routes/index'));
app.use('/api/', require('./routes/api'));

app.listen(process.env.PORT || 3000, function() {
  console.log('app.js is up and runnning via http://localhost:3000');
});

module.exports = app;
