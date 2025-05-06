const mongoose = require("mongoose");
const creditSchema = new mongoose.Schema({
  buyersname: {
    type: String,
    trim: true,
    required: true
  },
  nationalid: {
    type: String,
    trim: true,
    required: true
  },
  address: {
    type: String,
    trim: true,
    required: true
  },
  contact: {
    type: String,
    trim: true,
    required: true
  },
  amountD: { // amount due
    type: Number,
    required: true
  },
  tonnage: {
    type: Number,
    required: true
  },
  salesagent: {
    type: String,
    trim: true,
    required: true
  },
  producename: {
    type: String,
    trim: true,
    required: true
  },
  producetype: {
    type: String,
    trim: true,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  duedate: {
    type: Date,
    required: false
  }
});

module.exports = mongoose.model("Credit", creditSchema);
