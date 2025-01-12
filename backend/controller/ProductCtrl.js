const Product = require("../model/Product");

const ProductCtrl = {
  getAllProduct: async (req, res) => {
    try {
      const products = await Product.find()
        .populate("kategori_id", "nama_kategori")
        .populate("status_id", "nama_status");
      res.status(200).json({
        message: "Data berhasil diambil",
        data: products,
      });
    } catch (error) {
      res.status(500).json({
        message: "Gagal mengambil data",
        error: error.message,
      });
    }
  },
  createProduct: async (req, res) => {
    try {
      const { nama_produk, harga, kategori_id, status_id } = req.body;
      if (!nama_produk || !harga || !kategori_id || !status_id) {
        return res.status(400).json({
          message: "Data produk harus lengkap",
        });
      }
      const create = await Product.create({
        nama_produk: nama_produk,
        harga: harga,
        kategori_id: kategori_id,
        status_id: status_id,
      });
      res.status(200).json({
        message: "Data berhasil ditambahkan",
        data: create,
      });
    } catch (error) {
      res.status(500).json({
        message: "Gagal menambahkan data",
        error: error.message,
      });
    }
  },
  findOneProduct: async (req, res) => {
    try {
      const product = await Product.findById(req.params.id)
        .populate("kategori_id", "nama_kategori")
        .populate("status_id", "nama_status");
      res.status(200).json({
        message: "Data berhasil diambil",
        data: product,
      });
    } catch (error) {
      res.status(500).json({
        message: "Gagal mengambil data",
        error: error.message,
      });
    }
  },
  updateProduct: async (req, res) => {
    try {
      const { nama_produk, harga, kategori_id, status_id } = req.body;
      const { id } = req.params;
      const product = await Product.findByIdAndUpdate(
        id,
        {
          nama_produk: nama_produk,
          harga: harga,
          kategori_id: kategori_id,
          status_id: status_id,
        },
        { new: true }
      );
      res.status(200).json({
        message: "Data berhasil diupdate",
        data: product,
      });
    } catch (error) {}
  },
  deleteProduct: async (req, res) => {
    try {
      const product = await Product.findByIdAndDelete(req.params.id);
      res.status(200).json({
        message: "Data berhasil dihapus",
        data: product,
      });
    } catch (error) {
      res.status(500).json({
        message: "Gagal menghapus data",
        error: error.message,
      });
    }
  },
};
module.exports = ProductCtrl;
