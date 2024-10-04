const { User } = require("../models");
const { comparePassword, hashPassword } = require("../helpers/bcrypt");

const { OAuth2Client } = require("google-auth-library");
const { where } = require("sequelize");
const { signToken, verifyToken } = require("../helpers/jwt");
const { imgbox } = require("imgbox");

const client = new OAuth2Client();

class UserController {
  static async register(req, res, next) {
    console.log("masuk controller");
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
        idToken: google_token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      const payload = ticket.getPayload();

      //   cek ke db sendiri apakah user tersebutsudah terdaftar apa belom?
      //    kalau belom kita daftarin dulu, lalu lanjut login
      const [user, created] = await User.findOrCreate({
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

  static async getProfileByToken(req, res, next) {
    try {
      const { token } = req.params;
      console.log("Token from params:", token);

      const payload = verifyToken(token);
      const user = await User.findByPk(payload.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json({
        userName: user.userName,
        email: user.email,
        profilePicture: user.profilePicture,
      });
    } catch (error) {
      next(error);
    }
  }
  static async updateImage(req, res, next) {
    try {
      const { token } = req.params;
      const { profilePicture } = req.body;
      console.log(profilePicture, "====");

      console.log("profilePicture: ", profilePicture);

      if (!profilePicture) {
        return res
          .status(400)
          .json({ message: "Profile picture URL is required" });
      }

      let decodedToken;
      try {
        decodedToken = verifyToken(token);
      } catch (error) {
        return res.status(401).json({ message: "Invalid or expired token" });
      }

      console.log("userId: ", decodedToken.id);

      // Update the user's profile picture
      const [updatedRows] = await User.update(
        { profilePicture: profilePicture },
        {
          where: {
            id: decodedToken.id,
          },
        }
      );
      console.log("updatedRows: ", updatedRows);

      if (updatedRows === 0) {
        return res
          .status(404)
          .json({ message: "User not found or profile picture not updated" });
      }

      // Fetch the updated user to get the most recent data
      const updatedUser = await User.findByPk(decodedToken.id);

      res.status(200).json({
        message: "Profile picture updated successfully",
        profilePicture: updatedUser.profilePicture,
      });
    } catch (error) {
      console.error("Error updating profile picture:", error);
      next(error);
    }
  }

  static async deleteImage(req, res, next) {
    try {
      const { token } = req.params;

      // Verify the token
      const decodedToken = verifyToken(token);

      // Find the user and update their profile picture
      const updatedUser = await User.findByIdAndUpdate(
        decodedToken.id,
        { $set: { profilePicture: "/default-avatar.png" } },
        { new: true }
      );

      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      res
        .status(200)
        .json({
          message: "Profile picture deleted successfully",
          profilePicture: updatedUser.profilePicture,
        });
    } catch (error) {
      console.error("Error in deleteImage:", error);
      next(error);
    }
  }
}

module.exports = UserController;
