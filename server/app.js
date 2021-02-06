const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const sign = require("./routes/sign");
const contract = require("./routes/contract");
const cors = require("cors");

let app = express();
app.use(express.json());
app.use(cors());

app.use(
  session({
    secret: "jerngeHJBGR%566tu3gbf*&%$b5jhbdfb",
    cookie: {},
  })
);

app.use("/user", sign);
app.use("/contract", contract);

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
