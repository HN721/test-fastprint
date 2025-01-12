import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { DeleteProductApi, ProductApi } from "../services/ProductApi";
import { useNavigate } from "react-router-dom";

export default function Product() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(15);
  const [showModal, setShowModal] = useState(false); // State untuk menampilkan modal
  const [productToDelete, setProductToDelete] = useState(null); // Menyimpan ID produk yang akan dihapus
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await ProductApi();
        const filteredProducts = data.data.filter(
          (product) => product.status_id.nama_status === "bisa dijual"
        );
        setProducts(filteredProducts);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async () => {
    if (productToDelete) {
      try {
        await DeleteProductApi(productToDelete);
        setProducts(
          products.filter((product) => product._id !== productToDelete)
        );
        window.location.reload();
        setShowModal(false); // Close modal setelah berhasil delete
      } catch (err) {
        console.error("Error handling delete:", err);
      }
    }
  };
  function handleEdit(id) {
    navigate(`/product/edit/${id}`);
  }

  const handleCancel = () => {
    setShowModal(false); // Close modal jika cancel
    setProductToDelete(null); // Reset ID produk yang akan dihapus
  };

  const totalPages = Math.ceil(products.length / productsPerPage);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  function handleCreate() {
    navigate("/product/create");
  }
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Product List</h1>
      <button
        onClick={handleCreate}
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mb-2"
      >
        Tambah Data
      </button>

      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-3 border-b border-gray-300">#</th>
            <th className="p-3 border-b border-gray-300">Name</th>
            <th className="p-3 border-b border-gray-300">Price</th>
            <th className="p-3 border-b border-gray-300">Category</th>
            <th className="p-3 border-b border-gray-300">Status</th>
            <th className="p-3 border-b border-gray-300">Action</th>
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
                {product.kategori_id.nama_kategori}
              </td>
              <td className="p-3 border-b border-gray-300">
                {product.status_id.nama_status}
              </td>
              <td className="p-3 border-b border-gray-300">
                <button
                  onClick={() => handleEdit(product._id)}
                  className="text-blue-500 hover:text-blue-600"
                >
                  <FaEdit className="text-xl" />
                </button>
                <button
                  onClick={() => {
                    setShowModal(true);
                    setProductToDelete(product._id);
                  }}
                  className="text-red-500 hover:text-red-600 ml-2"
                >
                  <FaTrash className="text-xl" />
                </button>
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

      {/* Modal Konfirmasi Delete */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-lg font-bold mb-4">
              Are you sure you want to delete this product?
            </h2>
            <div className="flex justify-end">
              <button
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-md"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
