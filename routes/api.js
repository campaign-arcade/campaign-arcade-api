'use strict';

const express = require('express');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const router = express.Router();

// insert schema

// insert middleware

router.get('/users', function(req, res) {
  console.log('GET /api/users');
  // return all users in an array
  res.json({
    nothing: 'yet'
  });
});

module.exports = router;
