const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const campaignSchema = new Schema({
  users: [String],
  dailyCallGoal: {
    type: Number,
    required: false
  },
  totalCallGoal: {
    type: Number,
    required: false
  }
});

const Campaign = (module.exports = mongoose.model('Campaign', campaignSchema));
