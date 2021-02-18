const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let schema = new Schema(
  {
    identifier: {
      type: String,
      reuired: true,
    },
    creator: {
      //_id
      type: String,
      reuired: true,
    },
    dependsOnCondition: {
      //date, fact, request
      type: String,
      required: true,
    },
    conditionDescription: {
      type: String,
      required: true,
    },
    document: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

let Contract = mongoose.model("Contract", schema);

module.exports = Contract;
