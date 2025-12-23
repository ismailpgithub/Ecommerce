import { Product } from "../models/Product.js";
import bufferGenerator from "../utils/bufferGenerator.js";
import TryCatch from "../utils/TryCatch.js";
import cloudinary from "cloudinary";

export const createProduct = TryCatch(async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({
      message: "You are not admin",
    });
  }
  const { title, description, category, price, stock } = req.body;

  const files = req.files;

  if (!files || files.length == 0) {
    return res.status(400).json({
      message: "no files to upload",
    });
  }

  const imageUploadPromises = files.map(async (file) => {
    const fileBuffer = bufferGenerator(file);
    const result = await cloudinary.v2.uploader.upload(fileBuffer.content);

    return {
      id: result.public_id,
      url: result.secure_url,
    };
  });

  const uploadedImage = await Promise.all(imageUploadPromises);

  const product = await Product.create({
    title,
    description,
    category,
    price,
    stock,
    images: uploadedImage,
  });

  res.status(201).json({
    message: "Product Created",
    product,
  });
});

export const getAllProducts = TryCatch(async (req, res) => {
  const { search, category, page, sortByPrice } = req.query;
  const filter = {};

  if (search) {
    filter.title = {
      $regex: search,
      $options: "i", //converts small and will compare
    };
  }

  if (category) {
    filter.category = category;
  }

  const limit = 8;
  const skip = (page - 1) * limit;

  let sortOptions = { createdAt: -1 };

  if (sortByPrice) {
    if (sortByPrice === "lowToHigh") {
      sortOptions = { price: 1 };
    } else if (sortByPrice === "highToLow") {
      sortOptions = { price: -1 };
    }
  }

  const products = await Product.find(filter)
    .sort(sortOptions)
    .limit(limit)
    .skip(skip);
  const categories = await Product.distinct("category");

  const newProduct = await Product.find().sort("-createdAt").limit(4);

  const countProduct = await Product.countDocuments();

  const totalPages = Math.ceil(countProduct / limit);

  res.json({ products, categories, totalPages, newProduct });
});

export const getSingleProduct = TryCatch(async (req, res) => {
  const product = await Product.findById(req.params.id);

  const relatedProduct = await Product.find({
    category: product.category,
    _id: { $ne: product._id },
  }).limit(4);

  res.json({ product, relatedProduct });
});

export const updateProduct = TryCatch(async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({
      message: "You are not admin",
    });
  }
  const { title, description, category, price, stock } = req.body;

  const updatedFields = {};

  if (title) updatedFields.title = title;
  if (description) updatedFields.description = description;
  if (stock) updatedFields.stock = stock;
  if (price) updatedFields.price = price;
  if (category) updatedFields.category = category;

  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    updatedFields,
    { new: true, runValidators: true }
  );

  if (!updatedProduct) {
    res.status(404).json({
      message: "Product not found",
    });
  }

  res.json({
    message: "Product Updated",
    updatedProduct,
  });
});

export const updateProductImage = TryCatch(async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({
      message: "you are not admin",
    });
  }

  const { id } = req.params;
  const files = req.files;

  if (!files || files.length == 0) {
    return res.status(400).json({
      message: "no files to upload",
    });
  }

  const product = await Product.findById(id);

  if (!product) {
    res.status(404).json({
      message: "Product not found",
    });
  }

  const oldImages = product.images || [];

  for (const image of oldImages) {
    if (image.id) {
      await cloudinary.v2.uploader.destroy(image.id);
    }
  }

  const imageUploadPromises = files.map(async (file) => {
    const fileBuffer = bufferGenerator(file);
    const result = await cloudinary.v2.uploader.upload(fileBuffer.content);

    return {
      id: result.public_id,
      url: result.secure_url,
    };
  });

  const uploadedImage = await Promise.all(imageUploadPromises);
  product.images = uploadedImage;

  await product.save();

  res.status(200).json({
    message: "Image Updated",
    product,
  });
});
