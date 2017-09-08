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
  if (!req.body.adminId)
    return console.error('Failed to create campaign.  No adminId was given...');

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

// create a new invitation
Router.post('/newinvite', function(req, res) {
  console.log('POST /newinvite');
  const newInvite = new Invite({
    inviteCode: req.body.inviteCode,
    campaignId: req.body.campaignId,
    inviterId: req.body.inviterId
  });
  newInvite.save(function(err, newInvite) {
    if (err) return console.error(err);
    res.json(newInvite);
  });
});

// #READ

// read all user info
Router.get('/user/:id', function(req, res) {
  console.log('GET /user/' + req.params.id);
  User.findById(req.params.id, function(err, user) {
    if (err) return console.error(err);
    res.json(user);
  });
});

// read all campaign info
Router.get('/campaign/:id', function(req, res) {
  console.log('GET /campaign/' + req.params.id);
  Campaign.findById(req.params.id, function(err, campaign) {
    if (err) return console.error(err);
    res.json(campaign);
  });
});

// read all users of a campaign
Router.get('/campaign/users/:id', function(req, res) {
  console.log('GET /campaign/users/' + req.params.id);
  Campaign.findById(req.params.id, function(err, campaign) {
    if (err) return console.error(err);
    res.json({
      users: campaign.users
    });
  });
});

// read an invite from the inviteCode
Router.get('/invite/:code', function(req, res) {
  console.log('GET /invite/' + req.params.code);
  Invite.findOne({ inviteCode: req.params.code }, function(err, invite) {
    if (err) return console.error(err);
    res.json(invite);
  });
});

// accept an invitation
Router.get('/invite/accept/:code', function(req, res) {
  console.log('GET /invite/accept/' + req.params.code);
  if (!req.body.userId)
    return console.error(
      'Failed to add user to the campaign.  No userId was given.'
    );
  Invite.findOne({ inviteCode: req.params.code }, function(err, invite) {
    if (err) return console.error(err);
    Campaign.findById(invite.campaignId, function(err, campaign) {
      if (err) return console.error(err);
      campaign.users.push(req.body.userId);
    });
  });
});
module.exports = Router;
