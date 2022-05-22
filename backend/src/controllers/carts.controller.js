const express = require("express");

const router = express.Router();

const Carts = require("../models/carts.model");

router.post("/addProductCart", async (req, res) => {
  try {
    const cart = await Carts.create(req.body);
    res.send(cart);
  } catch (error) {
    res.send({ message: error.message });
  }
});

router.patch("/updateProductCartQuantity/:id", async (req, res) => {
  try {
    const cart = await Carts.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .lean()
      .exec();
    res.send(cart);
  } catch (error) {
    res.send({ message: error.message });
  }
});

router.patch("/updateProductCartPayment/:id", async (req, res) => {
  try {
    const cart = await Carts.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .lean()
      .exec();
    res.send(cart);
  } catch (error) {
    res.send({ message: error.message });
  }
});

router.delete("/deleteCartProduct/:id", async (req, res) => {
  try {
    const cart = await Carts.findByIdAndDelete(req.params.id).lean().exec();
    res.send(cart);
  } catch (error) {
    res.send({ message: error.message });
  }
});

router.delete("/deleteUserCartProduct/:id", async (req, res) => {
  try {
    const cart = await Carts.findByIdAndDelete(req.params.id).lean().exec();
    res.send(cart);
  } catch (error) {
    res.send({ message: error.message });
  }
});

router.get("/getCart/:id", async (req, res) => {
  try {
    const cart = await Carts.find({ userID: req.params.id, payment: false })
      .lean()
      .exec();
    res.send(cart);
  } catch (error) {
    res.send({ message: error.message });
  }
});

router.get("/getOrderCart/:id", async (req, res) => {
  try {
    const cart = await Carts.find({ userID: req.params.id, payment: true })
      .lean()
      .exec();
    res.send(cart);
  } catch (error) {
    res.send({ message: error.message });
  }
});

router.patch("/ProductCartCancelRequest/:id", async (req, res) => {
  try {
    const cart = await Carts.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .lean()
      .exec();
    res.send(cart);
  } catch (error) {
    res.send({ message: error.message });
  }
});

router.patch("/ProductCartCancel/:id", async (req, res) => {
  try {
    const cart = await Carts.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .lean()
      .exec();
    res.send(cart);
  } catch (error) {
    res.send({ message: error.message });
  }
});

module.exports = router;
