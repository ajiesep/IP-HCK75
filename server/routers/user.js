const express = require("express");
const UserController = require("../controllers/userController");
const user = express.Router();
const GeminiController = require("../controllers/GeminiController");

user.post("/gemini", GeminiController);

user.post("/google-login", UserController.googleLogin);
user.post("/login", UserController.login);
// user.post("/register", UserController.register);

module.exports = user;
