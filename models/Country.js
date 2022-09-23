const mongoose = require("mongoose");

const country = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    require: true,
  },
  language: {
    type: String,
    require: true,
  },
  extension: {
    type: Number,
    require: true,
  },
  currency: {
    type: String,
    require: true,
  },
  code: {
    type: Number,
    require: true,
  }, 
});

const modelColor = mongoose.model("countries", country);

module.exports = modelColor;
