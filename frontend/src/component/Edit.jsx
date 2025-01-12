import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FindOneProductApi } from "../services/ProductApi"; // Pastikan API update sudah ada
import axios from "axios";

export default function Edit() {
  const { id } = useParams();
  const navigate = useNavigate(); // Untuk navigasi setelah submit

  // State untuk form input (menggunakan satu objek state)
  const [product, setProduct] = useState({
    nama: "",
    harga: "",
    category: "",
    status: "",
  });

  // Mengambil data produk berdasarkan ID dari URL
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await FindOneProductApi(id);
        setProduct({
          nama: res.data.nama_produk,
          harga: res.data.harga,
          status: res.data.status_id.nama_status,
          category: res.data.kategori_id.nama_kategori,
        });
      } catch (err) {
        console.error("Error fetching product:", err);
      }
    };

    fetchData();
  }, []);

  // Menangani submit form untuk update produk
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(
      id,
      product.nama,
      product.harga,
      product.category,
      product.status
    );
    try {
      // Mengirim data yang sudah diubah ke API
      const res = await axios.put(`http://localhost:3000/produk/update/${id}`, {
        nama_produk: product.nama,
        harga: product.harga,
      });

      console.log(res); // Kirim data produk yang sudah diperbarui
      navigate("/product"); // Redirect ke halaman produk setelah berhasil update
    } catch (err) {
      console.log("Error updating product:", err);
    }
  };

  // Mengubah state produk secara dinamis
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Product Name
          </label>
          <input
            type="text"
            name="nama"
            value={product.nama}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Price
          </label>
          <input
            type="number"
            name="harga"
            value={product.harga}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">Category</label>
          <input
            type="text"
            name="category"
            value={product.category}
            onChange={handleInputChange}
            className="mt-1 w-full border border-gray-300 rounded-md p-2"
            disabled
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Status
          </label>
          <input
            name="status"
            type="text"
            value={product.status}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            disabled
          ></input>
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
            onClick={() => navigate("/product")}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
