require("dotenv").config();

const Users = require("../models/users.model");

const Admin = require("../models/admin.model");

const jwt = require("jsonwebtoken");

const newToken = (user) => {
  return jwt.sign({ user }, process.env.JWT_SECRET_KEY);
};

const register = async (req, res) => {
  try {
    let user = await Users.findOne({ email: req.body.email }).lean().exec();

    if (user) {
      return res.status(400).send({ message: "Please try another email" });
    }

    user = await Users.create(req.body);

    const token = newToken(user);

    res.send({ user, token });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const login = async (req, res) => {
  try {
    const user = await Users.findOne({ email: req.body.email });

    if (!user) {
      return res
        .status(400)
        .send({ message: "Please check your email or password" });
    }

    const match = user.checkPassword(req.body.password);

    if (!match) {
      return res
        .status(400)
        .send({ message: "Please check your email or password" });
    }

    const token = newToken(user);

    res.send({ user, token });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const adminlogin = async (req, res) => {
  try {
    const admin = await Admin.findOne({ email: req.body.email });

    if (!admin) {
      return res
        .status(400)
        .send({ message: "Please check your email or password" });
    }

    const match = admin.checkPassword(req.body.password);

    if (!match) {
      return res
        .status(400)
        .send({ message: "Please check your email or password" });
    }

    const token = newToken(admin);

    res.send({ admin, token });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = { register, login, adminlogin };
