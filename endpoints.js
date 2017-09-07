'use strict';

const express = require('express');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const Router = express.Router();

const User = require('./models/user');

// All routes to the api need to be authenticated using passport-http
Router.use(passport.authenticate('basic', { session: false }));

// #CREATE
// create a new user account
Router.post('/newuser', function(req, res) {
  console.log('POST /newuser');
  console.log(req.body);
  const newUser = new User({
    username: req.body.username,
    password: req.body.password,
    admin: req.body.admin || false
  });
  newUser.save(function(err, newUser) {
    if (err) return console.error(err);
    res.json(newUser);
  });
});

module.exports = Router;
