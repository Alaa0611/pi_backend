const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define roles enumeration
const Roles = Object.freeze({
  USER: 'user',
  ADMIN: 'admin',
});

const UserSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: Object.values(Roles), default: Roles.USER },
  isBanned: { type: Boolean, default: false },
  isBlocked: { type: Boolean, default: false },
});

Object.assign(UserSchema.statics, { Roles });

module.exports = mongoose.model('User', UserSchema);