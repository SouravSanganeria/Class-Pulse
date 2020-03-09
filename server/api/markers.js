const express = require("express");
const router = express.Router();

const checkToken = require("./authMiddleware");

const mongoose = require("mongoose");
const marks = mongoose.model("Mark");

router.post("/add", async (req, res, next) => {
  let mark = new marks(req.body);
  mark
    .save()
    .then(mark => {
      res.status(200).json({ mark: "mark added successfully" });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ msg: "Request failed" });
    });
});

router.get("/getSlide/:sn", async (req, res, next) => {
  var sn = parseInt(req.params.sn);
  marks.find({ slideNo: sn }, function(err, result) {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});

router.get("/getSlide/:sn/:un", async (req, res, next) => {
  var un = req.params.un;
  var sn = parseInt(req.params.sn);
  marks.find({ slideNo: sn, userID: un }, function(err, result) {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});

module.exports = router;
