'use strict';

const express = require('express');
const router = express.Router();
const session = require('express-session');
const bcrypt = require('bcryptjs');
const passport = require('passport');

// insert collection model schema here

router.get('/', function(req, res) {
  console.log('GET /');
  res.render('index');
});

module.exports = router;
