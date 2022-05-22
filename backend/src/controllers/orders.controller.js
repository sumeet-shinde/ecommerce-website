const express = require("express");

const router = express.Router();

const Orders = require("../models/orders.model");

router.post("/addOrder", async (req, res) => {
  try {
    const order = await Orders.create(req.body);
    res.send(order);
  } catch (error) {
    res.send({ message: error.message });
  }
});

router.delete("/deleteOrder/:id", async (req, res) => {
  try {
    const order = await Orders.findByIdAndDelete(req.params.id).lean().exec();
    res.send(order);
  } catch (error) {
    res.send({ message: error.message });
  }
});

router.get("/getOrder/:id", async (req, res) => {
  try {
    const order = await Orders.find({ userID: req.params.id }).lean().exec();
    res.send(order);
  } catch (error) {
    res.send({ message: error.message });
  }
});

module.exports = router;
