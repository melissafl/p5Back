const express = require("express");
const router = express.Router();
const userModel = require("../model/userModel");
const UserService = require("../services/userService");

const userService = new UserService(userModel);

router.post("/", async (req, res) => {
  const body = req.body;
  const user = await userService.create(body);
  res.status(201).send(user);
});

module.exports = router;
