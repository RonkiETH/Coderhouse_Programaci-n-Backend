const mongoose = require("mongoose");

const collectionName = "Carts";

const CartsSchema = new mongoose.Schema({
  products: {
    type: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Products",
          quantity: {
            type: Number
          }
        }
      }
    ],
    default: []
  }
});

CartsSchema.pre('find', function(next) {
  console.log("Ejecuto el middleware de Mongoose");
  this.populate("products.product");
  next();
});

const cartsModel = mongoose.model(collectionName, CartsSchema);

module.exports = cartsModel;
