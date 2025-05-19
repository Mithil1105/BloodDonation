const mongoose = require("mongoose");

const MedInfoSchema = mongoose.Schema({
  donor_id: {
    type: String,
    required: true,
    unique: true
  },
  bldgrp: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
    // required: true
  },
  age: {
    type: Number,
    min: 18, max: 65,
    required: true
  },
  sex: {
    type: String,
    enum: ['Male','Female','Other'],
    required: true
  },
  lastDonationDate: {
    type: Date,
    default: null, // Initialize to null
  },
  totalAmountDonated: {
    type: Number,
    default: 0, // Initialize to 0
  },
});


module.exports = mongoose.model("medinfo", MedInfoSchema);

