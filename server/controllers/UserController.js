const { User } = require("../models");
const { comparePassword, hashPassword } = require("../helpers/bcrypt");

const { OAuth2Client } = require("google-auth-library");
const { where } = require("sequelize");
const client = new OAuth2Client();

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

  static async googleLogin(req, res, next) {
    try {
      const { google_token } = req.headers;
      console.log(google_token);

      const ticket = await client.verifyIdToken({
        idToken: token,
        audience:
          "554479727507-70867vtpo11qqa220uvc2hcn7j99ccch.apps.googleusercontent.com",
      });
      const payload = ticket.getPayload();

      //   cek ke db sendiri apakah user tersebutsudah terdaftar apa belom?
      //    kalau belom kita daftarin dulu, lalu lanjut login
      const [user, created] = await user.findOrCreaete({
        where: { email: payload.email },
        defaults: {
          userName: payload.name,
          email: payload.email,
          password: String(Math.random() * 10000),
        },
      });
      //   kalau udah, lanjut login (generate token jwt biasa)
      const access_token = signToken({ id: user.id });
      console.log(user, created);
      res.status(200).json({ access_token });
      //   const userId = payload["sub"];
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = UserController;
