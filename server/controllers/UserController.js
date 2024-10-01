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

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email || !password) throw { name: "emailorpasswordempty" };

      const user = await User.findOne({ where: { email } });
      if (!user || !comparePassword(password, user.password))
        throw { name: "InvalidUser" };

      res.status(200).json({ access_token: signToken({ id: user.id }) });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
