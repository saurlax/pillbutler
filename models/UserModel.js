const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  boxes: [mongoose.SchemaTypes.ObjectId]
});

const User = mongoose.model('User', userSchema);
module.exports = User;