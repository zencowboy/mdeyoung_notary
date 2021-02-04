const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const sign = require("./routes/sign");

let app = express();
app.use(express.json());

app.use(
  session({
    secret: "jerngeHJBGR%566tu3gbf*&%$b5jhbdfb",
    cookie: {},
  })
);

app.use("/user", sign);
