const express = require("express");
//const session = require("express-session");
const mongoose = require("mongoose");
const sign = require("./routes/sign");
const contract = require("./routes/contract");
const cors = require("cors");
//const token = require("token");
const User = require("./schemas/User");
var jwt = require("jwt-simple");

let secret = "jhG&%%RFg67567g*&&fghdgdfg";

let app = express();
app.use(express.json());
app.use(cors());

// app.use("/user", sign);
// app.use("/contract", contract);

// app.use((req, res, next) => {
//   console.log(req.session);
//   let { login, password } = req.session.user;

//   let tokenUrl = req.query.token;
//   let verified = token.verify(login + "|" + password, tokenUrl);
//   //if user is not execute some suspicious activity
//   //if token is not expire
//   if (verified) {
//     next();
//   } else {
//     res.statusCode(413);
//   }
//   //if yes access forbidden
//   //
// });

app.get("/contract", (req, res) => {
  let token = req.query.token;
  let verified = jwt.decode(token, secret);
  //if user is not execute some suspicious activity
  //if token is not expire
  if (verified) {
    res.status(200).send("ok");
  } else {
    res.status(413).send("token is wrong");
  }
});
app.post("/user/sign_up", (req, res) => {
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
app.post("/user/sign_in", (req, res) => {
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

mongoose
  .connect("mongodb://localhost:27017/mdeyoung", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((ok) =>
    console.log(`Connected succesfully to ${ok.connections[0].name}`)
  )
  .catch((err) => console.error("Error while conecting to Mongo", err));

app.listen(4000, () => console.log("server is running"));
