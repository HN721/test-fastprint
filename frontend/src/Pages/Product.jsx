import React, { useEffect, useState } from "react";
import { ProductApi } from "../services/ProductApi";

export default function Product() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Halaman saat ini
  const [productsPerPage] = useState(15); // Jumlah produk per halaman

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await ProductApi(); // Fetch data dari API
        setProducts(data.data); // Simpan data ke state
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    fetchData();
  }, []);

  // Hitung total halaman berdasarkan jumlah produk
  const totalPages = Math.ceil(products.length / productsPerPage);

  // Mengambil produk untuk halaman tertentu
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Fungsi untuk mengubah halaman
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Product List</h1>

      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-3 border-b border-gray-300">#</th>
            <th className="p-3 border-b border-gray-300">Name</th>
            <th className="p-3 border-b border-gray-300">Price</th>
            <th className="p-3 border-b border-gray-300">Category</th>
            <th className="p-3 border-b border-gray-300">Status</th>
          </tr>
        </thead>
        <tbody>
          {currentProducts.map((product, index) => (
            <tr key={product._id}>
              <td className="p-3 border-b border-gray-300">{index + 1}</td>
              <td className="p-3 border-b border-gray-300">
                {product.nama_produk}
              </td>
              <td className="p-3 border-b border-gray-300">{product.harga}</td>
              <td className="p-3 border-b border-gray-300">
                {product.kategori_id.nama_kategori}{" "}
                {/* Assuming kategori is an object */}
              </td>
              <td className="p-3 border-b border-gray-300">
                {product.status_id.nama_status}{" "}
                {/* Assuming status is an object */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-center gap-3 mt-4">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded-l-md"
        >
          Prev
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => paginate(index + 1)}
            className={`px-4 py-2 ${
              currentPage === index + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            } rounded-md`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-blue-500 text-white rounded-r-md"
        >
          Next
        </button>
      </div>
    </div>
  );
}
