const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const inviteSchema = new Schema({
  inviteCode: {
    type: String,
    required: true
  },
  campaignId: {
    type: String,
    required: true
  },
  inviterId: {
    type: String,
    required: true
  }
});

const Invite = (module.exports = mongoose.model('Invite', inviteSchema));
