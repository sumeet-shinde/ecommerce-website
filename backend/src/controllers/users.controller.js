const express = require("express");

const router = express.Router();

const Users = require("../models/users.model");

router.post("/addUser", async (req, res) => {
  try {
    const user = await Users.create(req.body);
    res.send(user);
  } catch (error) {
    res.send({ message: error.message });
  }
});

router.patch("/addAddress/:id", async (req, res) => {
  try {
    const user = await Users.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .lean()
      .exec();
    res.send(user);
  } catch (error) {
    res.send({ message: error.message });
  }
});

router.get("/getUser/:id", async (req, res) => {
  try {
    const user = await Users.findById(req.params.id).lean().exec();
    res.send(user);
  } catch (error) {
    res.send({ message: error.message });
  }
});

router.patch("/updateUser/:id", async (req, res) => {
  try {
    const user = await Users.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .lean()
      .exec();
    res.send(user);
  } catch (error) {
    res.send({ message: error.message });
  }
});

router.delete("/deleteUser/:id", async (req, res) => {
  try {
    const user = await Users.findByIdAndDelete(req.params.id).lean().exec();
    res.send(user);
  } catch (error) {
    res.send({ message: error.message });
  }
});

module.exports = router;
