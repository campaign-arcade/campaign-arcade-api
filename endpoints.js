'use strict';

const express = require('express');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const Router = express.Router();

const User = require('./models/user');
const Campaign = require('./models/campaign');
const Call = require('./models/call');
const Invite = require('./models/invite');

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

// create a new campaign
Router.post('/newcampaign', function(req, res) {
  console.log('POST /newcampaign');
  const newCampaign = new Campaign({});
  newCampaign.save(function(err, newCampaign) {
    if (err) return console.error(err);
    res.json(newCampaign);
  });
});

// create a new call
Router.post('/newcall', function(req, res) {
  console.log('POST /newcall');
  const newCall = new Call({
    userId: req.body.userId,
    campaignId: req.body.campaignId
  });
  newCall.save(function(err, newCall) {
    if (err) return console.error(err);
    res.json(newCall);
  });
});
module.exports = Router;
