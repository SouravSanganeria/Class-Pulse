const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const markSchema = new Schema({
  name: String,
  link: String,
  sessionID: { type: String, unique: true },
  slides: [
    {
      slideNo: Number,
      marks: [
        {
          Xcord: Number,
          Ycord: Number,
          colour: String,
          comment: String
        }
      ]
    }
  ]
});

mongoose.model("Mark", markSchema);
