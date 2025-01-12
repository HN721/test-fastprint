const mongoose = require("mongoose");

const statusSchema = new mongoose.Schema({
  nama_status: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Status", statusSchema);
