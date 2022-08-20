const mongoose = require("mongoose");
//User Schema
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: false,
  },
  isAuthenticated: {
    type: Boolean,
    required: false,
  },
});

const User = mongoose.model("user", UserSchema);

module.exports = User;
