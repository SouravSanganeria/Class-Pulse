const express = require("express");
const router = express.Router();
const path = require("path");

const mongoose = require("mongoose");
const Admin = mongoose.model("Admin");
router.get("/", (req, res) => {
  res.json({
    message:
      "file upload route of backend, make a post request to upload a file"
  });
});
router.post("/:email/:id", (req, res) => {
  // console.log("something")
  console.log(req.params.cname);
  if (req.files == null) {
    console.log(file);
    // console.log("something")
    return res.status(400).json({ msg: "no file uploaded" });
  }
  const file = req.files.filepond;
  // console.log(file)
  file.mv(`${__dirname}/../../uploads/${file.name}`, err => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }
    // file.mv(`${__dirname}/client/public/uploads/${file2.name}`)

    Admin.find({ email: req.params.email })
      .then(doc => {
        console.log(doc[0].courses[req.params.id]);
        let newo = {
          name: file.name,
          link: `http://localhost:4000/static/${file.name}`,
          sessionID: file.name.slice(0, 6)
        };
        console.log(newo);
        doc[0].courses[req.params.id].pdfs.push(newo);
        console.log(doc[0].courses[req.params.id].pdfs);
        doc[0].save();
      })
      .catch(err => {
        console.log(err);
      });
    // console.log("something")
    console.log(req.params.email);
    // requ = await Admin.find({ email: req.params.email });
    // console.log(requ)
    res.header(
      "Access-Control-Allow-Headers",
      "x-requested-with, x-requested-by"
    );
    res.json({
      filename: file.name,
      filepath: `localhost:4000/static/${file.name}`
    });
    // requ = await Admin.find({ email: req.params.email });
  });
});
module.exports = router;
