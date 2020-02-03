const express = require("express");
const router = express.Router();

const auth = require("./auth");
const checkToken = require("./authMiddleware");
router.all("/", (req, res, next) => {
  console.log(`${req.method} for ${req.url}`);
  next();
});

router.use("/auth", auth);

module.exports = router;
