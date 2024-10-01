const express = require("express");
const UserController = require("../controllers/userController");
const user = express.Router();

user.post("/login", UserController.login);
user.post("/google-login", UserController.loginGoogle);
// user.post("/register", UserController.register);

module.exports = user;
