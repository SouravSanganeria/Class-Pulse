/* eslint-disable prettier/prettier */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notesSchema = new Schema({
  sid: {
    type: String,
    required: true,
  },
  sessid: {
    type: String,
    required: true,
  },
  slideNo: {
    type: Number,
    required: true,
  },
  notes: [
    {
      type: String,
    },
  ],
});

mongoose.model("Notes", notesSchema);
