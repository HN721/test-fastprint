const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  nama_produk: {
    type: String,
    required: true,
  },
  harga: {
    type: Number,
    required: true,
  },
  kategori_id: {
    type: mongoose.Types.ObjectId,
    ref: "Kategori",
    required: true,
  },
  status_id: {
    type: mongoose.Types.ObjectId,
    ref: "Status",
    required: true,
  },
});

module.exports = mongoose.model("Product", productSchema);
