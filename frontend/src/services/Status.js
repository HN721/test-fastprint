import axios from "axios";

export async function getSatatusAPI() {
  try {
    const res = await axios.get("http://localhost:3000/status/get-all");
    return res.data;
  } catch (err) {
    console.log(err);
  }
}
