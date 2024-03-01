const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

const collectionName = "Products";

const productsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
    unique: true,
  },
  price: {
    type: Number,
    required: true,
  },
  status: {
    type: Boolean,
    default: true,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
    validate: {
      validator: Number.isInteger,
      message: '{VALUE} no es un número entero para el campo stock.'
  }
  },
  category: {
    type: String,
    required: true,
  },
  thumbnails: {
    type: [String],
    default: [],
  }
    
});

productsSchema.plugin(mongoosePaginate);

const productModel = mongoose.model(collectionName, productsSchema);
module.exports = productModel;