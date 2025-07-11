const Product = require("../models/Product");

// Add new product
const addProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).send({ message: "Product Added Successfully!" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({})
      .populate({ path: "category", select: "name _id" })
      .sort({ _id: -1 });
    res.status(200).json({ products });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Get products with status 'Show'
const getShowingProducts = async (req, res) => {
  try {
    const products = await Product.find({ status: "show" }).sort({ _id: -1 });
    res.send(products);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Get product by ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate({
      path: "category",
      select: "_id, name",
    });
    res.send(product);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Get product by slug
const getProductBySlug = async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug });
    if (!product) {
      return res.status(404).send({ message: "Product not found by slug" });
    }
    res.send(product);
  } catch (err) {
    res.status(500).send({ message: `Slug problem, ${err.message}` });
  }
};

// Update a product
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }
    product.sku = req.body.sku;
    product.name = req.body.name;
    product.slug = req.body.slug;
    product.category = req.body.category;
    product.image = req.body.image;

    if (req.body.prices) {
      product.prices.originalPrice = req.body.prices.originalPrice;
      product.prices.price = req.body.prices.price;
      product.prices.discount = req.body.prices.discount;
    }
    
    product.quantity = req.body.quantity;
    product.expiryDate = req.body.expiryDate;
    product.description = req.body.description;
    product.tag = req.body.tag;
    product.status = req.body.status;
    product.requiresPrescription = req.body.requiresPrescription;

    await product.save();
    res.send({ data: product, message: "Product Updated successfully!" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Update product status only
const updateStatus = async (req, res) => {
  try {
    const newStatus = req.body.status;

    await Product.updateOne(
      { _id: req.params.id },
      {
        $set: {
          status: newStatus,
        },
      }
    );

    res.status(200).send({
      message: `Product ${newStatus} successfully!`,
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Delete product
const deleteProduct = async (req, res) => {
  try {
    const result = await Product.deleteOne({ _id: req.params.id });

    if (result.deletedCount === 0) {
      return res.status(404).send({ message: "Product not found." });
    }

    res.status(200).send({ message: "Product Deleted Successfully!" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const getShowingStoreProducts = async (req, res) => {
  try {
    const queryObject = {};

    const { category, name } = req.query;

    queryObject.status = "show";

    if (category) {
      queryObject.category = category;
    }

    if (name) {
      queryObject.$or = [{ name: { $regex: name, $options: "i" } }];
    }

    const products = await Product.find(queryObject)
      .populate({ path: "category", select: "name _id" })
      .sort({ _id: -1 })
      .limit(100);

    const relatedProduct = await Product.find({
      category: products[0]?.category,
    }).populate({ path: "category", select: "_id name" });

    res.send({
      products,
      relatedProduct,
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

module.exports = {
  addProduct,
  getAllProducts,
  getShowingProducts,
  getShowingStoreProducts,
  getProductById,
  getProductBySlug,
  updateProduct,
  updateStatus,
  deleteProduct,
};
