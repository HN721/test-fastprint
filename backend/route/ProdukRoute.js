const mongoose = require("mongoose");
const axios = require("axios");
const Product = require("../model/Product");
const Kategori = require("../model/Kategory");
const Status = require("../model/Status");
const md5 = require("crypto-js/md5");
const express = require("express");
const ProductCtrl = require("../controller/ProductCtrl");

const router = express.Router();

router.get("/get-data", async (req, res) => {
  try {
    // Ambil waktu server saat ini
    const now = new Date();
    const tanggal = now.getDate(); // Tanggal (1-31)
    const bulan = `0${now.getMonth() + 1}`; // Bulan (1-12), selalu 2 digit
    const tahun = now.getFullYear().toString().slice(-2); // 2 digit terakhir tahun
    const jam = now.getHours() + 1; // Jam (0-23)
    const username = `tesprogrammer${tanggal}${bulan}${tahun}C${jam}`;
    const rawPassword = `bisacoding-${tanggal}-${bulan}-${tahun}`;
    const password = md5(rawPassword).toString();

    // Kirim permintaan POST ke API
    const response = await axios.post(
      "https://recruitment.fastprint.co.id/tes/api_tes_programmer",
      new URLSearchParams({
        username: username,
        password: password,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    // Ambil kategori dan status dari respons API
    const kategori = response.data.data.map((item) => item.kategori);
    const status = response.data.data.map((item) => item.status);

    // Mengambil kategori dan status yang unik
    const uniqueStatus = [...new Set(status)];
    const uniqueKategori = [...new Set(kategori)];

    // Simpan kategori yang unik ke database
    const kategoriPromises = uniqueKategori.map(async (kategoriName) => {
      let kategoriDoc = await Kategori.findOne({ nama_kategori: kategoriName });
      if (!kategoriDoc) {
        kategoriDoc = new Kategori({ nama_kategori: kategoriName });
        await kategoriDoc.save();
      }
      return kategoriDoc; // Return kategori document
    });

    // Simpan status yang unik ke database
    const statusPromises = uniqueStatus.map(async (statusName) => {
      let statusDoc = await Status.findOne({ nama_status: statusName });
      if (!statusDoc) {
        statusDoc = new Status({ nama_status: statusName });
        await statusDoc.save();
      }
      return statusDoc; // Return status document
    });

    // Tunggu sampai semua kategori dan status disimpan
    const kategoriDocs = await Promise.all(kategoriPromises);
    const statusDocs = await Promise.all(statusPromises);

    // Simpan produk ke database
    const productPromises = response.data.data.map(async (productData) => {
      const kategoriDoc = kategoriDocs.find(
        (kategori) => kategori.nama_kategori === productData.kategori
      );
      const statusDoc = statusDocs.find(
        (status) => status.nama_status === productData.status
      );

      const newProduct = new Product({
        nama_produk: productData.nama_produk,
        harga: parseInt(productData.harga),
        kategori_id: kategoriDoc._id, // Use the _id of the existing category
        status_id: statusDoc._id, // Use the _id of the existing status
      });

      await newProduct.save();
    });

    // Tunggu sampai semua produk disimpan
    await Promise.all(productPromises);

    // Kirim data ke klien
    res.status(200).json({
      message: "Data berhasil diambil dan disimpan",
      data: response.data,
    });
  } catch (error) {
    console.error("Terjadi kesalahan:", error.message);
    res.status(500).json({
      message: "Gagal mengambil dan menyimpan data",
      error: error.message,
    });
  }
});

router.get("/get-all", ProductCtrl.getAllProduct);
router.get("/get-one/:id", ProductCtrl.findOneProduct);
router.post("/create", ProductCtrl.createProduct);
router.put("/update/:id", ProductCtrl.updateProduct);
router.delete("/delete/:id", ProductCtrl.deleteProduct);

module.exports = router;
