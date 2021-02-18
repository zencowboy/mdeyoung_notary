const express = require("express");
const router = express.Router();
const token = require("token");
const User = require("../schemas/User");
var jwt = require("jwt-simple");
const secret = require("../secret.js");

// token.defaults.secret = "jhG&%%RFg67567g*&&fghdgdfg";
// token.defaults.timeStep = 30 * 60;
// router.use((req, res, next) => {
//   //if user is not execute some suspicious activity
//   //if token is not expire
//   next();
//   //if yes access forbidden
//   //res.status(413)
// });

router
  .route("/sign_up") //register
  .post((req, res) => {
    let { login } = req.body;
    User.find({ login }, (err, list) => {
      if (!list.length) {
        User.create(req.body).then((confirmation) => {
          let token = jwt.encode(confirmation, secret);
          res.json({ token });
        });
      } else {
        res.status(409).json("user already exist");
      }
    });
  });
router
  .route("/sign_in") //login
  .post((req, res) => {
    let { login, password } = req.body;
    User.find({ login, password }, (err, list) => {
      if (!list.length) {
        res.status(413).json(null);
      } else {
        User.create(req.body).then((confirmation) => {
          let token = jwt.encode(confirmation, secret);
          res.json({ token });
        });
      }
    });
  });

module.exports = router;
