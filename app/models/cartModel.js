const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },

  orderTotalPrice: {
    type: Number,
    required: true,
  },
  products: {
    type: Object,
    required: true
  },

  isActive: {
    type: Boolean,
    default: true,
  },
  createdTs: {
    type: Date,
    default: new Date(),
  },
  updatedTs: {
    type: Date,
    default: new Date(),
  },
});

const CartModel = mongoose.model("cart", cartSchema);

module.exports = CartModel;
