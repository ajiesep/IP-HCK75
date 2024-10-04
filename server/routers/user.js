const express = require("express");
const UserController = require("../controllers/UserController");
const user = express.Router();
const GeminiController = require("../controllers/GeminiController");

user.post("/gemini", GeminiController);

user.post("/google-login", UserController.googleLogin);

user.post("/login", UserController.login);

user.get("/profile/:token", UserController.getProfileByToken);
// user.post("/register", UserController.register);
user.put("/profile/:token", UserController.updateImage);
user.delete("/profile/:token/image", UserController.deleteImage);

module.exports = user;
