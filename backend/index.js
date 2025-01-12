const express = require("express");
const mongoose = require("mongoose");
const productRouter = require("./route/ProdukRoute");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
mongoose
  .connect(
    "mongodb+srv://hoseanainggolan85:EF3puBIHnU6R51Bh@cluster0.zzfai.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
app.use("/produk", productRouter);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
