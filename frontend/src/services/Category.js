import axios from "axios";

export async function getCategoryApi() {
  try {
    const res = await axios.get("http://localhost:3000/category/get-all");
    return res.data;
  } catch (err) {
    console.log(err);
  }
}
