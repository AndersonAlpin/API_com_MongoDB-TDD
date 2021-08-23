const mongoose = require('../database/connection');

const User = mongoose.Schema({
  name: String,
  email: String,
  password: String
});

module.exports = mongoose.model('User', User);