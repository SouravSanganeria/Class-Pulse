const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const markSchema = new Schema({
  slideNo: {
    type: Number
  },
  Xcord: {
    type: Number
  },
  Ycord: {
    type: Number
  },
  colour: {
    type: String
  },
  userID: {
    type: String
  },
  comment: {
    type: String
  }
});

mongoose.model("Mark", markSchema);
