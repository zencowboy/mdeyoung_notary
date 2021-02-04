let Contracts = {
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
};
