const mongoose = require("mongoose");

const produceSchema = new mongoose.Schema({
  produce: {
    type: String,
    trim: true,
    required: true,
  },
  type: {
    type: String,
    trim: true,
    required: true,
  },
  tonnage: {
    type: Number,
    required: true,
    min: 0,
  },
  buyingPrice: {
    type: Number,
    required: true,
    min: 0,
  },
  sellingPrice: {
    type: Number,
    required: true,
    min: 0,
  },
  branch: {
    type: String,
    trim: true,
    required: true,
  },
  dealers: {
    type: String,
    trim: true,
    required: true,
  },
  paymentmethod: {
    type: String,
    trim: true,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Produce", produceSchema);
