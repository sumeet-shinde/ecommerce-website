const express = require("express");

const router = express.Router();

const Admin = require("../models/admin.model");

router.post("", async (req, res) => {
  try {
    const admin = await Admin.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    res.status(400).send(admin);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;
