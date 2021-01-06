const mongoose = require("mongoose");

const mainadSchema = new mongoose.Schema({
 name: {
  type: String,
  required: true,
  maxlength: 100
 },
 image:{
  type: String,
  required: true,
 },
 link:{
  type: String,
  required: true
 }
}, { timestamps: true })

module.exports = mongoose.model("Mainad", mainadSchema);