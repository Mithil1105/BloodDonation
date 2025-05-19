const mongoose = require("mongoose");

const interestedDonorSchema = mongoose.Schema({
    request_id: {
      type: String,
      required: true
    },
    donor_id: {
      type: String,
      required: true
    },
  });
  
  interestedDonorSchema.index({ request_id: 1, donor_id: 1 }, { unique: true });

  module.exports = mongoose.model("InterestedDonor", interestedDonorSchema);

  