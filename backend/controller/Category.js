const Category = require("../model/Kategory");

const CategoryCtrl = {
  getAllCategory: async (req, res) => {
    try {
      const categories = await Category.find();
      res.status(200).json({
        message: "Data berhasil diambil",
        data: categories,
      });
    } catch (error) {
      res.status(500).json({
        message: "Gagal mengambil data",
        error: error.message,
      });
    }
  },
};

module.exports = CategoryCtrl;
