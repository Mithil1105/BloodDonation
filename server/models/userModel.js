const mongoose = require("mongoose");
const nanoid = require("nanoid");
const UserSchema = mongoose.Schema({
  donor_id: {
    type: String,
    default: nanoid(6),
    required: true,
    unique: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  phonenum: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  role: {
    type: Number,
    default: 2001
  },
  refreshToken: {
    type: String,
    default: ""
  }
});


module.exports = mongoose.model("User", UserSchema);