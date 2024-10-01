const { User } = require("../models");
const { verifyToken } = require("../helpers/jwt");

async function authentication(req, res, next) {
  try {
    let access_token = req.headers.authorization;
    if (!access_token) throw { name: "InvalidToken" };
    let [bearer, token] = access_token.split(" ");

    const payload = verifyToken(token);
    const user = await User.findByPk(payload.id);
    if (!user) throw { name: "InvalidToken" };
    req.user = {
      id: user.id,
      email: user.email,
    };
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = authentication;
