const mongoose = require("mongoose");

const city = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  code: {
    type: Number,
    require: true,
  },
  country: {
    type: mongoose.Types.ObjectId,
    ref: "countries",
    require: true,
  },
});

const modelColor = mongoose.model("cities", city);

module.exports = modelColor;
