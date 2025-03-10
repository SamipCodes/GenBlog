const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  name: { type: String, required: true },
  text: { type: String, required: true },
  // author: { type: String, default: "Anonymous" },
  // createdAt: { type: Date, default: Date.now },
},
{ collection: "blogs" });

module.exports = mongoose.model("Blog", blogSchema);
