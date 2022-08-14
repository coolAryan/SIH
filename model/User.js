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
});

const User = mongoose.model("user", UserSchema);

module.exports = User;
