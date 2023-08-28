const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    username: String,
    numTime: Number,
    time: String,
  },
);

const User = mongoose.model('User', userSchema);

module.exports = User;
