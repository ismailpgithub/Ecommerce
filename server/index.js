import express from "express";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoutes from "./routes/user.js";
import productRoutes from "./routes/product.js";
import cartRoutes from "./routes/cart.js";
import addressRoutes from "./routes/address.js";
import orderRoutes from "./routes/order.js";
import cloudinary from "cloudinary";
import cors from "cors";

dotenv.config();
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api", userRoutes);
app.use("/api", productRoutes);
app.use("/api", cartRoutes);
app.use("/api", addressRoutes);
console.log("inside the index js");
app.use("/api", orderRoutes);

const port = process.env.port || 3000;

app.listen(port, () => {
  console.log(`server is running on the http://localhost:${port}`);
  connectDB();
});
