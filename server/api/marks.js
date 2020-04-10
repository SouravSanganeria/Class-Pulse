const express = require("express");
const router = express.Router();

const checkToken = require("./authMiddleware");

const mongoose = require("mongoose");
const Mark = mongoose.model("Mark");

router.post("/add/:sid/:pgno", (req, res, next) => {
  console.log("file", req.params.sid);
  console.log("pgno", req.params.pgno);
  Mark.find(
    { sessionID: req.params.sid },
    { slides: { $elemMatch: { slideNo: req.params.pgno } } }
  )
    .then(doc => {
      console.log("doc", doc[0]);
      console.log("req", req.body.Xcord);
      if (doc[0].slides.length === 0) {
        console.log("Hello");
        Mark.find({ sessionID: req.params.sid }).then(doc1 => {
          let mark = {
            slideNo: req.params.pgno,
            marks: [
              {
                Xcord: req.body.Xcord,
                Ycord: req.body.Ycord,
                colour: req.body.colour,
                comment: req.body.comment
              }
            ]
          };
          doc1[0].slides.push(mark);
          doc1[0].save();
        });
      } else {
        let mark = {
          Xcord: req.body.Xcord,
          Ycord: req.body.Ycord,
          colour: req.body.colour,
          comment: req.body.comment
        };
        //console.log("mark", mark);
        doc[0].slides[0].marks.push(mark);
        doc[0]
          .save()
          .then(mark => {
            res.status(200).json({ mark: "mark added successfully" });
          })
          .catch(err => {
            res.status(400).send("adding new mark failed");
          });
      }
    })
    .catch(err => {
      console.log(err);
    });
});

router.post("/add", (req, res, next) => {
  console.log("Hello from add");
});

router.get("/getSlide/:sid/:pgno", async (req, res, next) => {
  //var sn = parseInt(req.params.sn);
  Mark.find(
    { sessionID: req.params.sid },
    { slides: { $elemMatch: { slideNo: req.params.pgno } } }
  ).then(doc => {
    if (doc[0].slides.length !== 0)
      return res.status(200).json(doc[0].slides[0].marks);
    else return res.status(200).json([]);
  });
});

router.get("/getLink/:sid", async (req, res, next) => {
  try {
    console.log("params sid", req.params.sid);
    let pdf = [];
    pdf = await Mark.find({ sessionID: req.params.sid });
    console.log(pdf);
    return res.status(200).json(pdf);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ msg: "Request failed" });
  }
});

module.exports = router;
