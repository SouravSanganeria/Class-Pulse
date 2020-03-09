const express = require("express");
const router = express.Router();
const courses = require("./courses");
const markers = require("./markers");

const auth = require("./auth");
const checkToken = require("./authMiddleware");
const fileupload = require("./uploadhandler");
router.all("/", (req, res, next) => {
  console.log(`${req.method} for ${req.url}`);
  next();
});

router.use("/auth", auth);
router.use("/courses", courses);
router.use("/fileupload", fileupload);
router.use("/markers", markers);

module.exports = router;
