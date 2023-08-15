const express = require("express");
const router = express.Router();

const userRouter = require("./userApis");
const authRouter = require("./authApis");
const authMiddleware = require("../middlewares/authorization");
const registerRouter = require("./register");

//admin
const adminRouter = require("./admin");

//password
//const passwordRouter = require("./password");

//products
const productRouter = require("./productsApi");
router.use("/products", productRouter);

router.use("/auth", authRouter);
router.use("/register", registerRouter);

//router.use("/change", passwordRouter);

router.use(authMiddleware);
router.use("/users", userRouter);
router.use("/admin", adminRouter);

module.exports = router;
