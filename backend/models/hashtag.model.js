const mongoose = require("mongoose");

const hashtagSchema = new mongoose.Schema(
 {
 name :{
  type: String,
  required: true,
  maxlength: 40,
  unique: true
 }
}
, { timestamps: true });

module.exports = mongoose.model("Hashtag", hashtagSchema);