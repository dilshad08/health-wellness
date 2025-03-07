const mongoose = require('mongoose');

const TokenSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  token: String,
});

module.exports = mongoose.model('Token', TokenSchema);
