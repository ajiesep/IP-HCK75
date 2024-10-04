const express = require("express");
const cors = require("cors");
const router = express.Router();
const user = require("./user");

router.use(cors());
router.use(user);
module.exports = router;
