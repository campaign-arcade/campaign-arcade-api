const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  admin: {
    type: Boolean,
    required: true,
    default: false
  }
});

userSchema.pre('save', function(next) {
  // if the password hasn't been modified then we don't need to (re)hash it
  if (!this.isModified('password')) {
    return next();
  }
  var hash = bcrypt.hashSync(this.password, 8);
  this.password = hash;
  next();
});

userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
  // console.log('comparing given password: ' + this.generateHash(password));
  // console.log('with pulled password: ' + this.password);
  return bcrypt.compareSync(password, this.password);
};

const User = (module.exports = mongoose.model('User', userSchema));
