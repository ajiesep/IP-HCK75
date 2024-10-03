const express = require("express");
const UserController = require("../controllers/userController");
const user = express.Router();
const GeminiController = require("../controllers/GeminiController");

router.post("/gemini", GeminiController);

user.post("/login", UserController.login);
user.post("/google-login", UserController.loginGoogle);
// user.post("/register", UserController.register);

module.exports = user;
