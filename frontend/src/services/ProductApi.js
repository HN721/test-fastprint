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
//
