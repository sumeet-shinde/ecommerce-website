const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    cardType: { type: String, required: true },
    cardNumber: { type: String, required: true },
    cardExpiryDate: { type: String, required: true },
    cardCvv: { type: String, required: true },
    payment: { type: Boolean, required: true },
    cart: [{ type: String, required: true }],
    datetime: { type: String, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("orders", OrderSchema);
