const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  imagePath: {
    type: String,
    required: true
  },
  productName: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    require: true
  },
  info: {
    type: {
      year: Number,
      make: String,
      model: String,
      carType: String
    },
    required: true
  }
});

module.exports = mongoose.model("Product", productSchema);
