var nodemailer = require("nodemailer");
require("dotenv").config();

export var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.user,
    pass: process.env.pass
  }
});

var mailOptions = {
  from: process.env.user,
  to: "f20170130@hyderabad.bits-pilani.ac.in",
  subject: "Sending Email using Node.js",
  text: "That was easy!"
};

transporter.sendMail(mailOptions, function(error, info) {
  if (error) {
    console.log(error);
  } else {
    console.log("Email sent: " + info.response);
  }
});
