const express = require("express");
const router = express.Router();
const token = require("token");
const User = require("../schemas/User");

token.defaults.secret = "jhG&%%RFg67567g*&&fghdgdfg";
token.defaults.timeStep = 30 * 60;
router.use((req, res, next) => {
  //if user is not execute some suspicious activity
  //if token is not expire
  next();
  //if yes access forbidden
  //res.status(413)
});

router
  .route("/sign_up") //register
  .post((req, res) => {
    let { login } = req.body;
    User.find({ login }, (err, list) => {
      if (!list.length) {
        User.create(req.body).then((confirmation) => {
          let { login, password, _id } = confirmation;
          console.log(login, password);
          let tokenUrl = token.generate(`${login}|${password}`);
          req.session.user = confirmation;
          console.log(req.session);
          res.json({ token: tokenUrl });
        });
      } else {
        res.status(409).json("user already exist");
      }
    });
  });

module.exports = router;
