'use strict';

const express = require('express');
const expressValidator = require('express-validator');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const BasicStrategy = require('passport-http').BasicStrategy;
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const secret = require('./secret');
const db =
  'mongodb://' + secret.loginDB + ':' + secret.pswdDB + '@' + secret.urlDB;
mongoose.connect(db, { useMongoClient: true });

const bodyParser = require('body-parser');
const parseurl = require('parseurl');

const endpoints = require('./endpoints');

//models..
const User = require('./models/user');

const app = express();

// middleware..
app.use(passport.initialize());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(expressValidator());

// authentication middleware...
passport.use(
  new BasicStrategy(function(username, password, done) {
    User.findOne(
      {
        username: username
      },
      function(err, user) {
        if (err) return done(err, false);
        if (user && user.validPassword(password)) {
          return done(null, user);
        }
        return done(null, false);
      }
    );
  })
);

app.use(endpoints);

app.listen(process.env.PORT || 3000, function() {
  console.log('app.js is up and runnning via http://localhost:3000');
});

module.exports = app;
