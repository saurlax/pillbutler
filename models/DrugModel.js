const mongoose = require('mongoose');

const drugSchema = new mongoose.Schema({
  _id: { type: Number, required: true },
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  category: String,
  remark: String,
  price: Number
});

const Drug = mongoose.model('Drug', drugSchema);
module.exports = Drug;