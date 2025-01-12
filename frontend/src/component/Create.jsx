import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Create() {
  const [category, setCategory] = useState([]);
  const [status, setStatus] = useState([]);
  const [nama_produk, setNamaProduk] = useState("");
  const [harga, setHarga] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    const fetchDataCategory = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/category/get-all"
        );
        setCategory(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDataCategory();
  }, []);

  useEffect(() => {
    const fetchDataStatus = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/status/get-all"
        );
        setStatus(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDataStatus();
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!nama_produk) newErrors.nama_produk = "Product name is required.";
    if (!harga || harga <= 0) newErrors.harga = "Price must be greater than 0.";
    if (!selectedCategory) newErrors.selectedCategory = "Category is required.";
    if (!selectedStatus) newErrors.selectedStatus = "Status is required.";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return; // Prevent submission if form is invalid

    try {
      const response = await axios.post("http://localhost:3000/produk/create", {
        nama_produk,
        harga,
        kategori_id: selectedCategory,
        status_id: selectedStatus,
      });
      console.log(response.data); // Log the response after successful product creation
      navigate("/product"); // Redirect after successful submission
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Product</h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Product Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Product Name
          </label>
          <input
            type="text"
            name="nama"
            value={nama_produk}
            onChange={(e) => setNamaProduk(e.target.value)}
            className={`mt-1 block w-full border rounded-md p-2 ${
              errors.nama_produk ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.nama_produk && (
            <p className="text-xs text-red-500">{errors.nama_produk}</p>
          )}
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Price
          </label>
          <input
            type="number"
            name="harga"
            value={harga}
            onChange={(e) => setHarga(e.target.value)}
            className={`mt-1 block w-full border rounded-md p-2 ${
              errors.harga ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.harga && (
            <p className="text-xs text-red-500">{errors.harga}</p>
          )}
        </div>

        {/* Category */}
        <div>
          <label className="text-sm font-medium text-gray-700">Category</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className={`mt-1 block w-full border rounded-md p-2 ${
              errors.selectedCategory ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Select Category</option>
            {category.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.nama_kategori}
              </option>
            ))}
          </select>
          {errors.selectedCategory && (
            <p className="text-xs text-red-500">{errors.selectedCategory}</p>
          )}
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Status
          </label>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className={`mt-1 block w-full border rounded-md p-2 ${
              errors.selectedStatus ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Select Status</option>
            {status.map((stat) => (
              <option key={stat._id} value={stat._id}>
                {stat.nama_status}
              </option>
            ))}
          </select>
          {errors.selectedStatus && (
            <p className="text-xs text-red-500">{errors.selectedStatus}</p>
          )}
        </div>

        {/* Buttons */}
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
