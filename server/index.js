/* eslint-disable prettier/prettier */
/* eslint no-undefined: "off" */

require("dotenv").config();

const fileupload = require("express-fileupload");
const path = require("path");
const util = require("util");
const express = require("express");
const app = express();
const chalk = require("chalk");
const compression = require("compression");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const passport = require("passport");
const cors = require("cors");
const http = require("http");
const socketio = require("socket.io");
const PORT = process.env.PORT || 4000;
app.use(fileupload());
// app.use(express.static('uploads'));
// app.use('/static', express.static(__dirname + '/uploads'));
/****************** Server Options ******************/
const cacheTime = 172800000; // 2 Days in ms - Tells clients to cache static files
const server = http.createServer(app);
const io = socketio(server);
app.use(cors());
app.use(passport.initialize()); // Initialize passport for authentication
app.use(helmet()); // Sets some good default headers
app.use(compression()); // Enables gzip compression
app.use(bodyParser.json()); // Lets express handle JSON encoded data sent on the body of requests
app.use(bodyParser.urlencoded({ extended: true }));

/****************** Serve Static Files --> JS, CSS, IMAGES ETC ******************/
app.use(
  "/static",
  express.static(path.join(__dirname, "../uploads"), { maxAge: cacheTime })
);

/****************** Log Requests ******************/
app.use("*", (req, res, next) => {
  console.log(
    "--------------------------------------------------------------------------"
  );
  console.log(
    util.format(chalk.red("%s: %s %s"), "REQUEST ", req.method, req.path)
  );
  console.log(
    util.format(chalk.yellow("%s: %s"), "QUERY   ", util.inspect(req.query))
  );
  console.log(
    util.format(chalk.cyan("%s: %s"), "BODY    ", util.inspect(req.body))
  );

  next();
});

/****************** Start the Server and DB (if DB_URI env var is set) ******************/
if (process.env.DB_URI && process.env.DB_URI !== "") {
  require("./db");
  app.use("/api", require("./api"));

  server.listen(PORT, () => {
    console.log(chalk.green(`Listening on port ${PORT}`));
  });
} else {
  console.log(
    chalk.red(
      "process.env.DB_URI is undefined (this should be set in your .env file).\nSkipping opening connection to DB.\nSessions are being stored in memory\n/api will not be accessible\n"
    )
  );

  server.listen(PORT, () => {
    console.log(chalk.green(`Listening on port ${PORT}`));
  });
}

/****************** Route Handling ******************/
app.use("/fileupload", require("./api/uploadhandler"));
app.use("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build/index.html"));
});

// Return a 404 page for all other requests - This should be the last get/put/post/delete/all/use call for app
app.use("*", (req, res) => {
  res.status(404).send(`<h1>404 Page Not Found</h1>`);
});

io.on("connection", (socket) => {
  console.log("connected");
  socket.on("nextPage", (msg) => {
    console.log(msg);
    socket.broadcast.emit("turnPage", msg);
  });
});
