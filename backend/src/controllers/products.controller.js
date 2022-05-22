const express = require("express");

const router = express.Router();

const Products = require("../models/products.model");

function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

router.post("/addProduct", async (req, res) => {
  try {
    const product = await Products.create(req.body);
    res.send(product);
  } catch (error) {
    res.send({ message: error.message });
  }
});

router.patch("/updateProduct/:id", async (req, res) => {
  try {
    const cart = await Products.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .lean()
      .exec();
    res.send(cart);
  } catch (error) {
    res.send({ message: error.message });
  }
});

router.delete("/deleteProduct/:id", async (req, res) => {
  try {
    const cart = await Products.findByIdAndDelete(req.params.id).lean().exec();
    res.send(cart);
  } catch (error) {
    res.send({ message: error.message });
  }
});

router.get("/getProducts", async (req, res) => {
  try {
    const product = await Products.find().lean().exec();
    res.send(product);
  } catch (error) {
    res.send({ message: error.message });
  }
});

router.get(`/getProductsSearch/:name`, async (req, res) => {
  try {
    const regex = new RegExp(escapeRegex(req.params.name), "gi");
    const product = await Products.find({
      name: regex,
    })
      .lean()
      .exec();
    res.send(product);
  } catch (error) {
    res.send({ message: error.message });
  }
});

router.get("/getProductsCategory/:category", async (req, res) => {
  try {
    const product = await Products.find({ category: req.params.category })
      .lean()
      .exec();
    res.send(product);
  } catch (error) {
    res.send({ message: error.message });
  }
});

router.get("/getProductsSize/:category/:size", async (req, res) => {
  try {
    const product = await Products.find({
      category: req.params.category,
      size: req.params.size,
    })
      .lean()
      .exec();
    res.send(product);
  } catch (error) {
    res.send({ message: error.message });
  }
});

router.get("/getProductsColor/:category/:color", async (req, res) => {
  try {
    const product = await Products.find({
      category: req.params.category,
      color: req.params.color,
    })
      .lean()
      .exec();
    res.send(product);
  } catch (error) {
    res.send({ message: error.message });
  }
});

router.get("/getProductsGender/:category/:gender", async (req, res) => {
  try {
    const product = await Products.find({
      category: req.params.category,
      gender: req.params.gender,
    })
      .lean()
      .exec();
    res.send(product);
  } catch (error) {
    res.send({ message: error.message });
  }
});

router.get("/getProductsPriceRange/:category/:gt/:lt", async (req, res) => {
  try {
    const product = await Products.find({
      category: req.params.category,
      price: { $gte: req.params.gt, $lte: req.params.lt },
    })
      .lean()
      .exec();
    res.send(product);
  } catch (error) {
    res.send({ message: error.message });
  }
});

router.get("/getProductsSorting/:category/asc", async (req, res) => {
  try {
    const product = await Products.find({ category: req.params.category })
      .sort({ price: 1 })
      .lean()
      .exec();
    res.send(product);
  } catch (error) {
    res.send({ message: error.message });
  }
});

router.get("/getProductsSorting/:category/desc", async (req, res) => {
  try {
    const product = await Products.find({ category: req.params.category })
      .sort({ price: -1 })
      .lean()
      .exec();
    res.send(product);
  } catch (error) {
    res.send({ message: error.message });
  }
});

router.get("/getSingleProduct/:id", async (req, res) => {
  try {
    const product = await Products.findById(req.params.id).lean().exec();
    res.send(product);
  } catch (error) {
    res.send({ message: error.message });
  }
});

module.exports = router;
