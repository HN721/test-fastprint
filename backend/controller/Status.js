const Status = require("../model/Status");

const statusCtrl = {
  getAllStatus: async (req, res) => {
    try {
      const status = await Status.find();
      res.status(200).json({
        message: "Data berhasil diambil",
        data: status,
      });
    } catch (error) {
      res.status(500).json({
        message: "Gagal mengambil data",
        error: error.message,
      });
    }
  },
};

module.exports = statusCtrl;
