const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    size: { type: String },
    color: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    gender: { type: String },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("products", ProductSchema);
