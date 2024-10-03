const { sign, verify } = require("jsonwebtoken");

module.exports = {
  signToken: (payload) => sign(payload, process.env.private_key),
  verifyToken: (token) => verify(token, process.env.private_key),
};
