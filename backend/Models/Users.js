const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  blogPosts: [{ type: Schema.Types.ObjectId, ref: "Blogs", required: true }],
});

const Users = mongoose.model("Users", userSchema);

module.exports = Users;
