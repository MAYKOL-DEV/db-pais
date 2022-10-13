const mongoose = require("mongoose");
// const uniqueValidator = require("mongoose-unique-validator");

const person = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    require: true,
    minlength: 2,
  },
  phone: {
    type: String,
    // require: true,
    minlength: 5,
  },
  street: {
    type: String,
    require: true,
    minlength: 4,
  },
  city: {
    type: String,
    require: true,
    minlength: 4,
  },
  //   address: {
  //     type: Number,
  //     require: true,
  //   },
  //   canDrink: {
  //     type: Boolean,
  //     require: false,
  //     default: true,
  //   },
});

// person.plugin(uniqueValidator);

const modelColor = mongoose.model("persons", person);

module.exports = modelColor;
