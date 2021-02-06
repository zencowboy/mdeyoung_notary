const express = require("express");
const router = express.Router();
const token = require("token");
const Contracts = require("../schemas/Contracts");

token.defaults.secret = "jhG&%%RFg67567g*&&fghdgdfg";
token.defaults.timeStep = 30 * 60;
router.use((req, res, next) => {
  console.log(req.session);
  let { login, password } = req.session.user;

  let tokenUrl = req.query.token;
  let verified = token.verify(login + "|" + password, tokenUrl);
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
    res.status(200).send("ok");
  });

module.exports = router;
