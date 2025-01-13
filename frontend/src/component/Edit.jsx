import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FindOneProductApi } from "../services/ProductApi";
import { getCategoryApi } from "../services/Category";
import { getSatatusAPI } from "../services/Status";
import axios from "axios";

export default function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  const [statuses, setStatuses] = useState([]);
  const [nama, setNama] = useState("");
  const [harga, setHarga] = useState("");

  const [errors, setErrors] = useState({});

  // Fetch categories and statuses
  useEffect(() => {
    const fetchCategoriesAndStatuses = async () => {
      try {
        const categoryRes = await getCategoryApi();
        const statusRes = await getSatatusAPI();
        setCategories(categoryRes.data);
        setStatuses(statusRes.data);
      } catch (err) {
        console.error("Error fetching categories or statuses:", err);
      }
    };

    fetchCategoriesAndStatuses();
  }, []);

  // Fetch product data
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await FindOneProductApi(id);
        setNama(res.data.nama_produk);
        setHarga(res.data.harga);
        setSelectedCategory(res.data.kategori_id);
        setSelectedStatus(res.data.status_id);
      } catch (err) {
        console.error("Error fetching product:", err);
      }
    };

    fetchProduct();
  }, [id]);

  // Validasi input
  const validate = () => {
    const validationErrors = {};
    if (!nama.trim()) validationErrors.nama = "Nama produk tidak boleh kosong.";
    if (!harga) validationErrors.harga = "Harga produk tidak boleh kosong.";
    if (!selectedCategory)
      validationErrors.category = "Kategori harus dipilih.";
    if (!selectedStatus) validationErrors.status = "Status harus dipilih.";

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await axios.put(`http://localhost:3000/produk/update/${id}`, {
        nama_produk: nama,
        harga: harga,
        kategori_id: selectedCategory,
        status_id: selectedStatus,
      });
      navigate("/product");
    } catch (err) {
      console.error("Error updating product:", err);
    }
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
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            className={`mt-1 block w-full border ${
              errors.nama ? "border-red-500" : "border-gray-300"
            } rounded-md p-2`}
          />
          {errors.nama && <p className="text-red-500 text-sm">{errors.nama}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Price
          </label>
          <input
            type="number"
            name="harga"
            value={harga}
            onChange={(e) => setHarga(e.target.value)}
            className={`mt-1 block w-full border ${
              errors.harga ? "border-red-500" : "border-gray-300"
            } rounded-md p-2`}
          />
          {errors.harga && (
            <p className="text-red-500 text-sm">{errors.harga}</p>
          )}
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">Category</label>
          <select
            name="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className={`mt-1 block w-full border ${
              errors.category ? "border-red-500" : "border-gray-300"
            } rounded-md p-2`}
          >
            <option value="">Select a Category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.nama_kategori}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="text-red-500 text-sm">{errors.category}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Status
          </label>
          <select
            name="status"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className={`mt-1 block w-full border ${
              errors.status ? "border-red-500" : "border-gray-300"
            } rounded-md p-2`}
          >
            <option value="">Select a Status</option>
            {statuses.map((status) => (
              <option key={status._id} value={status._id}>
                {status.nama_status}
              </option>
            ))}
          </select>
          {errors.status && (
            <p className="text-red-500 text-sm">{errors.status}</p>
          )}
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
