const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const adminSchema = new Schema({
  name: String,
  email: {
    type: String,
    index: true
  },
  courses: [
    {
      name: String,
      pdfs: [
        {
          link: String,
          sessionID: { type: String, unique: true }
        }
      ]
    }
  ]
});

mongoose.model("Admin", adminSchema);
