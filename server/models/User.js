const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  id: { type: Number, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  image: {type: String},
  followers: [Number],
  following: [Number],
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);

