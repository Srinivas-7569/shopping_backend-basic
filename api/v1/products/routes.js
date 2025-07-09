const express = require("express");
const {
  createProductController,
  getAllProducts,
  updateProductController,
  deleteProduct,
} = require("./controller.js");
const productRouter = express.Router();

productRouter.get("/", (req, res) => {
  res.json({
    isSuccess: true,
    message: "products list feached",
    data: {},
  });
});
productRouter.get("/", getAllProducts);
productRouter.post("/", createProductController);
productRouter.patch("/:productId", updateProductController);
productRouter.delete("/:productId", deleteProduct);
module.exports = { productRouter };
