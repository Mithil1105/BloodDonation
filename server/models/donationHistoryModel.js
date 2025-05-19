const mongoose = require("mongoose");
const nanoid = require("nanoid");

const DonationHistorySchema = mongoose.Schema({
    donation_id: {
        type: String,
        default: nanoid(6),
        required: true,
        unique: true
    },
    donor_id: {
        type: String,
        required: true,
    },
    request_id: {
        type: String,
        required: true,
    },
    bldGrpDonated: {
        type: String,
        required: true,
    },
    amount_Donated: {
        type: Number,
        required: true,
    },
    dateOfDonation: {
        type: Date,
        default: Date.now(),
        required: true
    },
    
});


module.exports = mongoose.model("DonationHistory", DonationHistorySchema);

