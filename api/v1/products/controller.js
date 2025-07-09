const { product } = require("../../../models/product_schema");

const createProductController = async (req, res) => {
  try {
    const data = req.body;
    console.log("creating product", data);
    let newProduct = null;
    try {
      newProduct = await product.create(data);
      res.status(201).json({
        isSuccess: true,
        message: `product created`,
        data: {
          product: newProduct,
        },
      });
    } catch (err) {
      console.log("error while creating product");
      res.status(400);
      res.json({
        isSuccess: false,
        message: `Err:${err.message}`,

        data: {},
      });
      return;
    }
  } catch (err) {
    console.log("error in creatingProductController");
    res
      .status(501)
      .json({ isSuccess: false, message: "Internal server error", data: {} });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const allProducts = await product.find();
    res.status(200).json({
      isSuccess: true,
      message: `product created`,
      data: {
        product: allProducts,
      },
    });
  } catch (err) {
    console.log("error in getAllProducts-->", err.message);
    res
      .status(500)
      .json({ isSuccess: false, message: "Internal server error", data: {} });
  }
};

const updateProductController = async (req, res) => {
  try {
    const { productId } = req.params;
    const newData = req.body;
    const newProduct = await product.findByIdAndUpdate(productId, newData, {
      new: true,
      runValidators: true,
    });
    res.status(201).json({
      isSuccess: true,
      message: `product created`,
      data: {
        product: newProduct,
      },
    });
  } catch {
    console.log("error in getAllProducts-->", err.message);
    res
      .status(501)
      .json({ isSuccess: false, message: "Internal server error", data: {} });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    const deletedProduct = await product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({
        isSuccess: false,
        message: "Product not found",
        data: {},
      });
    }

    return res.status(200).json({
      isSuccess: true,
      message: "Product deleted successfully",
      data: {
        product: deletedProduct,
      },
    });
  } catch (err) {
    console.error("Error deleting product →", err.message);
    return res.status(500).json({
      isSuccess: false,
      message: "Internal server error",
      data: {},
    });
  }
};

module.exports = {
  createProductController,
  getAllProducts,
  updateProductController,
  deleteProduct,
};
