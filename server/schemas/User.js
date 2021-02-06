const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let schema = new Schema(
  {
    login: {
      type: String,
      reuired: true,
    },
    password: {
      type: String,
      reuired: true,
    },
    name: {
      type: String,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const User = mongoose.model("User", schema);

module.exports = User;
