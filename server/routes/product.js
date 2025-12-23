import express from "express";
import { isAuth } from "../middlewares/isAuth.js";
import {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  updateProductImage,
} from "../controller/product.js";
import uploadsFiles from "../middlewares/multer.js";

const router = express.Router();

router.post("/products/new", isAuth, uploadsFiles, createProduct);
router.get("/products/all", getAllProducts);
router.get("/products/:id", getSingleProduct);
router.put("/products/:id", isAuth, updateProduct);
router.post("/products/:id", isAuth, uploadsFiles, updateProductImage);
export default router;
