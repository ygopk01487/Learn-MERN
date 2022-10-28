const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//tạo thuộc tính và bảng
const UserShema = new Schema({
  username: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  createdAt: { type: Date, default: Date.now },
});
module.exports = mongoose.model("users", UserShema);
