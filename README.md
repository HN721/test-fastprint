Test Programmer Fast Print

Tech Stack : - React - Express - Node Js - Monggo DB

BackEnd
1.Fetch api https://recruitment.fastprint.co.id/tes/api_tes_programmer menggunakan axios
![alt text](image.png)
2 .Simpan data Api Ke Database Menggunakan Monggose
//
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

3. Buat Controller Untuk Create ,Update dan Delete Prduct
   //
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
nama_produk,
harga,
kategori_id,
status_id,
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
module.exports = ProductCtrl; 4. Buatkan Route untuk Masing Masing Controller
![alt text](image-1.png)
5.Buatkan Controller Untuk Category dan Status
![alt text](image-2.png)
![alt text](image-3.png)

5.Buatkan Server Js Yang Berisi Route dan Port Yang akan DI Consum di FrontEnd
![alt text](image-4.png)
