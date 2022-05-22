const mongoose = require("mongoose");

const shortId = require("shortid");

const CartSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    cartID: {
      type: String,
      required: true,
      default: shortId.generate,
      index: true,
    },
    productName: { type: String, required: true },
    price: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    size: { type: String, required: true },
    color: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    gender: { type: String, required: true, default: "men" },
    quantity: { type: Number, required: true, default: 1 },
    payment: { type: Boolean, required: true, default: false },
    purchaseDate: { type: String },
    requestCancel: { type: Boolean, default: false },
    cancelStatus: { type: String, default: "Not Cancelled" },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("carts", CartSchema);
