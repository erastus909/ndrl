const mongoose = require("mongoose");

const recordSchema = new mongoose.Schema({
  title: { type: [String], required: true },
  creators: [String],
  subject: [String],
  description: [String],
  date: Number,
  identifier: { type: [String], unique: true },
  language: String,
  publisher: String,
  source: String
});

module.exports = mongoose.model("record", recordSchema);
