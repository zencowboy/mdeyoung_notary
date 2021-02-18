const express = require("express");
const router = express.Router();
const token = require("token");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const upload = multer({ dest: "uploads/" });
const Contract = require("../schemas/Contract");

// const Contracts = require("../schemas/Contracts");
var jwt = require("jwt-simple");
const secret = require("../secret.js");

// token.defaults.secret = "jhG&%%RFg67567g*&&fghdgdfg";
// token.defaults.timeStep = 30 * 60;
router.use((req, res, next) => {
  let token = req.query.token;
  let verified = jwt.decode(token, secret);
  //if user is not execute some suspicious activity
  //if token is not expire
  if (verified) {
    next();
  } else {
    res.statusCode(413);
  }
  //if yes access forbidden
  //
});

router
  .route("/") //register
  .get((req, res) => {
    // let token = req.query.token;
    // let verified = jwt.decode(token, secret);
    //if user is not execute some suspicious activity
    //if token is not expire
    res.status(200).json(["donut", "bicycle"]);
  })
  .post(upload.single("file"), (req, res) => {
    let buffer = Buffer.from(fs.readFileSync(req.file.path));
    Contract.create({
      identifier: "3453tegg",
      creator: "_id",
      dependsOnCondition: "date",
      conditionDescription: "when moon is full",
      document: buffer.toString("base64"),
    })
      .then((respond) => {
        res.json(respond);
      })
      .catch((err) => {
        console.log(err);
        res.statusCode(500);
      });
  });
module.exports = router;
