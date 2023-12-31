const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();

const userService = require("../services/userService");
const userModel = require("../model/userModel");
const authServices = require("../services/auth");

require("dotenv").config();

const UserService = new userService(userModel);
const AuthService = new authServices(UserService);
const JWT_SECRET = process.env.JWT_SECRET_PS;

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await AuthService.login(email, password);
    console.log(user);
    /* const userRole = {
      ...user,
      role: "users",
      permissions: ["users:me"],
    };*/

    let userRole;

    if (user.role === "admin") {
      userRole = {
        ...user,
        role: "admin",
        permissions: ["admin:yo"],
      };
    } else {
      userRole = {
        role: "users",
        permissions: ["users:me"],
      };
    }

    const token = jwt.sign(
      {
        data: userRole,
        exp: Math.floor(Date.now() / 1000) + 60 * 60,
      },
      JWT_SECRET
    );

    res.send({
      _id: user._id,
      token,
      role: user.role,
    });
  } catch (error) {
    console.error(error);
    res.status(401).send({ message: error.message });
  }
});

module.exports = router;
