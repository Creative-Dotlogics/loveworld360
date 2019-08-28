const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:  String,
    email: String,
    phone:   String,
    chapter: String,
    date: { type: Date, default: Date.now },
    completed: Boolean,
    password: String
  });

const User = mongoose.model('User', userSchema);

module.exports = User;
