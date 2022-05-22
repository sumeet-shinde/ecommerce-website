const express = require("express");

const connect = require("./configs/db");

const {
  login,
  register,
  adminlogin,
} = require("./controllers/auth.controller");

const ProductController = require("./controllers/products.controller");
const OrderController = require("./controllers/orders.controller");
const CartController = require("./controllers/carts.controller");
const UserController = require("./controllers/users.controller");
const AdminController = require("./controllers/admin.controller");

const app = express();

app.use(express.json());

const cors = require("cors");

app.use(cors());

app.use(function (req, res, next) {
  res.header("Access-Control-Allor-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.post("/register", register);

app.post("/login", login);

app.post("/adlogin", adminlogin);

app.use("/admin", AdminController);

app.use("/products", ProductController);

app.use("/orders", OrderController);

app.use("/carts", CartController);

app.use("/users", UserController);

app.listen(process.env.PORT || 8080, async (req, res) => {
  try {
    await connect();
    console.table("listening on 8080...");
  } catch (error) {
    console.log(error);
  }
});
