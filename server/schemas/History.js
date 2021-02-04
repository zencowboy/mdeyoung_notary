let History = {
  type: {
    //login,operation (read,write)
    type: String,
    reuired: true,
  },
  person: {
    //_id
    type: String,
    reuired: true,
  },
  cost: {
    //3.4$
    amount: {
      type: Number,
      reuired: true,
    },
    currency: {
      type: String,
      default: "$",
    },
  },
};
