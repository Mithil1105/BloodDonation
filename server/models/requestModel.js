const mongoose = require("mongoose");

const RequestSchema = mongoose.Schema({
    request_id: {
        type: String,
        unique: true,
        required: true
    },
    bldGrpRequired: {
        type: String,
        required: true,
    },
    amount_Required: {
        type: Number,
        required: true,
    },
    amount_Remaining: {
        type: Number,
        required: true,
    },
    isDone: {
        type: Boolean,
        default: false,
        required: true
    },
});


module.exports = mongoose.model("Request", RequestSchema);
