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
  if (!req.body.adminId) {
    return console.error('Failed to create campaign.  No adminId was given...');
  } else {
    const newCampaign = new Campaign({});
    newCampaign.admins.push(req.body.adminId);
    newCampaign.save(function(err, newCampaign) {
      if (err) return console.error(err);
      res.json(newCampaign);
    });
  }
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
Router.get('/campaign/:id/users', function(req, res) {
  console.log('GET /campaign/' + req.params.id + '/users');
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
Router.post('/invite/:code/accept', function(req, res) {
  console.log('GET /invite/' + req.params.code + '/accept');
  if (!req.body.userId)
    return console.error(
      'Failed to add user to the campaign.  No userId was given.'
    );
  res.json({ success: false });
  Invite.findOne({ inviteCode: req.params.code }, function(err, invite) {
    if (err) return console.error(err);
    Campaign.findById(invite.campaignId, function(err, campaign) {
      if (err) return console.error(err);
      campaign.users.push(req.body.userId);
      res.json({ success: true });
    });
  });
});

// read calls for a user
Router.get('/calls/user/:id', function(req, res) {
  console.log('GET /calls/user/' + req.params.id);
  Call.find({ userId: req.params.id }, function(err, calls) {
    if (err) return console.error(err);
    res.json(calls);
  });
});

// read calls for a campaign
Router.get('/calls/campaign/:id', function(req, res) {
  console.log('GET /calls/campaign/' + req.params.id);
  Call.find({ campaignId: req.params.id }, function(err, calls) {
    if (err) return console.error(err);
    res.json(calls);
  });
});

// #UPDATE
// update a user account by id
Router.put('/user/:id', function(req, res) {
  console.log('PUT /user/' + req.params.id);
  User.findById(req.params.id, function(err, user) {
    if (err) return console.error(err);
    user.username = req.body.username || user.username;
    user.password = req.body.password || user.password;
    user.admin = req.body.admin || user.admin;
    user.save(function(err, user) {
      if (err) return console.error(err);
      res.json(user);
    });
  });
});

// update a campaign by id
Router.put('/campaign/:id', function(req, res) {
  console.log('PUT /campaign/' + req.params.id);
  Campaign.findById(req.params.id, function(err, campaign) {
    if (err) return console.error(err);
    campaign.users = req.body.users || campaign.users;
    campaign.admins = req.body.admins || campaign.admins;
    campaign.dailyCallGoal = req.body.dailyCallGoal || campaign.dailyCallGoal;
    campaign.totalCallGoal = req.body.totalCallGoal || campaign.totalCallGoal;
    campaign.save(function(err, campaign) {
      if (err) return console.error(err);
      res.json(campaign);
    });
  });
});

// update a call by id
Router.put('/call/:id', function(req, res) {
  console.log('PUT /call/' + req.params.id);
  Call.findById(req.params.id, function(err, call) {
    if (err) return console.error(err);
    call.userId = req.body.userId || call.userId;
    call.campaignId = req.body.campaignId || call.campaignId;
    call.number = req.body.number || call.number;
    call.save(function(err, call) {
      if (err) return console.error(err);
      res.json(call);
    });
  });
});

// update an invitation by id
Router.put('/invite/:id', function(req, res) {
  console.log('PUT /invite/' + req.params.id);
  Invite.findById(req.params.id, function(err, invite) {
    if (err) return console.error(err);
    invite.inviteCode = req.body.inviteCode || invite.inviteCode;
    invite.campaignId = req.body.campaignId || invite.campaignId;
    invite.inviterId = req.body.inviterId || invite.inviterId;
    invite.save(function(err, invite) {
      if (err) return console.error(err);
      res.json(invite);
    });
  });
});

// # DELETE
// delete a user
Router.delete('/user/:id', function(req, res) {
  console.log('DELETE /user/' + req.params.id);
  User.findByIdAndRemove(req.params.id, function(err, user) {
    if (err) return console.error(err);
    let msg = {
      message: 'delete successful!',
      user: user
    };
    res.json(msg);
  });
});

// delete a campaign
Router.delete('/campaign/:id', function(req, res) {
  console.log('DELETE /campaign/' + req.params.id);
  Campaign.findByIdAndRemove(req.params.id, function(err, campaign) {
    if (err) return console.error(err);
    let msg = {
      message: 'delete successful!',
      campaign: campaign
    };
    res.json(msg);
  });
});

// delete a call
Router.delete('/call/:id', function(req, res) {
  console.log('DELETE /call/' + req.params.id);
  Call.findByIdAndRemove(req.params.id, function(err, call) {
    if (err) return console.error(err);
    let msg = {
      message: 'delete successful!',
      call: call
    };
    res.json(msg);
  });
});
module.exports = Router;
