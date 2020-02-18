const express = require('express');
const router = express.Router();
const path = require("path");
router.get('/',(req,res)=>{
    res.json({
        message:"file upload route of backend, make a post request to upload a file"
    })
})
router.post("/",(req,res)=>{
    // console.log("something")
    if(req.files==null){console.log(file)
        // console.log("something")
        return res.status(400).json({msg:"no file uploaded"})
    }
    const file = req.files.filepond
    // console.log(file)
    file.mv(`${__dirname}/../../uploads/${file.name}`, err => {
    if (err) {
      console.error(err)
      return res.status(500).send(err)
    }
    // file.mv(`${__dirname}/client/public/uploads/${file2.name}`)
    res.header("Access-Control-Allow-Headers", "x-requested-with, x-requested-by");
    res.json({ filename: file.name, filepath: `localhost:4000/static/${file.name}` })
})
})
module.exports = router