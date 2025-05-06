
const mongoose = require("mongoose");

const saleSchema = new mongoose.Schema({
    produceName: {
    type: String,
    trim: true,
  },
  tonnage: {
    type: Number,
    trim: true,
  },
  pricePerkg: {
    type: Number,
    trim: true,
  },
  amountPaid: {
    type: Number,
    trim: true,
  },
  qsold: {
    type: Number,
    trim: true,
  },
  buyerName: {
    type: String,
    trim: true,
  },
  salesAgentName: {
    type: String,
    trim: true,
  },
  dateTime: {
    type: Date,
    trim: true,
  },
  storeBranch: {
    type: String,
    trim: true,
  },
  totalAmount: {
    type: Number,
    trim: true,
  },
  seller: {
    type: String,
    trim: true,
  }
}, { timestamps: true });

module.exports = mongoose.model("Sale", saleSchema);
