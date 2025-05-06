

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
  stock: {
    type: Number,
    required: true,
    min: 0, // Ensure stock cannot be negative
    default: 0, // Default stock level
  },
  status: {
    type: String,
    enum: ["available", "out of stock"], // Restrict to specific values
    default: "available",
  },
  date: {
    type: Date,
    required: true,
    default: Date.now, // Automatically set the current date
  },
  time: {
    type: String,
    required: true,
  },
  lastUpdated: {
    type: Date,
    default: Date.now, // Automatically set the last updated timestamp
  },
});
produceSchema.pre("save", function (next) {
  console.log("Stock value before saving:", this.stock); // Log the stock value
  next();
});
module.exports = mongoose.model("Produce", produceSchema);
