const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const callSchema = new Schema({
  userId: {
    type: String,
    required: true
  },
  campaignId: {
    type: String,
    required: true
  }
});

const Call = (module.exports = mongoose.model('Call', callSchema));
