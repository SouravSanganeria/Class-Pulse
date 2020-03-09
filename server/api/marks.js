const express = require("express");
const router = express.Router();

const checkToken = require("./authMiddleware");

const mongoose = require("mongoose");
const Mark = mongoose.model("Mark");

router.post("/add", (req, res, next) => {
  let mark = new Mark(req.body);
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
  console.log(sn);
  try {
    let marks = [];
    marks = await Mark.find({ slideNo: sn });
    console.log(marks);
    return res.status(200).json(marks);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ msg: "Request failed" });
  }
});

module.exports = router;
