const { sign, verify } = require("jsonwebtoken");

module.exports = {
  signToken: (payload) => sign(payload, process.env.SECRET_KEY),
  verifyToken: (token) => verify(token, process.env.SECRET_KEY),
};
