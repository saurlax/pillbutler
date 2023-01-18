const mongoose = require('mongoose');

const pillSchema = new mongoose.Schema({
  _id: { type: Number, required: true },
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  category: String,
  remark: String,
  price: Number
});

const Pill = mongoose.model('Pill', pillSchema);
module.exports = Pill;