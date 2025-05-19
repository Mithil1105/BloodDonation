const mongoose = require("mongoose");
const nanoid = require("nanoid");


const RequestInfoSchema = mongoose.Schema({
    request_id: {
        type: String,
        default: nanoid(6),
        required: true,
        unique: true,
    },
    startDate_Of_Request: {
        type: Date,
        default: Date.now(),
        required: true
    },
    endDate_of_Request: {
        type: Date,
        required: true
    },
    donationType: {
        type: String,
        enum: ['Whole_blood', 'Single_donor_plasma', 'Granulocytes'],
        required: true
    },
    emergencyLevel: {
        type: String,
        enum: ['Mass_Casualty','Immediate','Normal_Drive'],
        required: true
    },
    noOfInterestedDonors: {
        type: Number,
        default: 0,
        required: true,
    },
    location: {
         type: String,
         required: true,
    },
    locUrl: {
        type: String,
    }
});


module.exports = mongoose.model("RequestInfo", RequestInfoSchema);