import axios from "axios";

export async function ProductApi() {
  try {
    const res = await axios.get("http://localhost:3000/produk/get-all");
    return res.data;
  } catch (err) {
    console.log(err);
  }
  console.log(res.data);
}

export async function FindOneProductApi(id) {
  try {
    const res = await axios.get(`http://localhost:3000/produk/get-one/${id}`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
  console.log(res.data);
}
//
export async function DeleteProductApi(id) {
  try {
    const res = await axios.delete(`http://localhost:3000/produk/delete/${id}`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
  console.log(res.data);
}
