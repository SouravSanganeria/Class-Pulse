const express = require("express");
const router = express.Router();

const checkToken = require("./authMiddleware");

const mongoose = require("mongoose");
const Admin = mongoose.model("Admin");

router.get("/:email", async (req, res, next) => {
  try {
    let requests = [];
    requests = await Admin.find({ email: req.params.email });
    return res.status(200).json(requests);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ msg: "Request failed" });
  }
});

module.exports = router;
