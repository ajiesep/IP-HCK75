const { User } = require("../models");
const { comparePassword, hashPassword } = require("../helpers/bcrypt");

class UserController {
  static async register(req, res, next) {
    const { userName, email, password } = req.body;
    try {
      const user = await User.create({
        userName,
        email,
        password: hashPassword(password),
      });
      res.status(201).json({
        userName: user.userName,
        email: user.email,
        password: user.password,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
