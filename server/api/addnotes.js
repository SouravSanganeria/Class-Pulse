/* eslint-disable prettier/prettier */
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Notes = mongoose.model("Notes");

router.post("", async (req, res) => {
  const { sid, sessid, slideNo, takennote } = req.body;

  Notes.findOne({ sid: sid, sessid: sessid, slideNo: slideNo })
    .then((curr) => {
      if (curr) {
        curr.notes.push(takennote);
        curr
          .save()
          .then((note) => {
            console.log("success");
            res.status(200).json({ msg: " added successfully" });
          })
          .catch((err) => {
            console.log(err);
            res.status(400).send("adding failed");
          });
        console.log(curr);
      } else {
        try {
          const Not = new Notes({
            sid,
            sessid,
            slideNo,
            notes: [takennote],
          });
          Not.save();
          res.status(200).json({ message: "Note added successfully" });
        } catch (err) {
          console.log(err);
          res.status(500).json({ message: "Server Error" });
        }
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Server Error" });
    });
});

router.post("/getnotes", (req, res) => {
  const { sid, sessid, slideNo } = req.body;
  Notes.findOne({ sid: sid, sessid: sessid, slideNo: slideNo })
    .then((note) => {
      res.status(200).send(note);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ message: "Something went wrong" });
    });
});

module.exports = router;
