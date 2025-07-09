const express = require("express");
const apiRouter = express.Router();
const { productRouter } = require("./products/routes.js");

apiRouter.use("/products", productRouter);
module.exports = { apiRouter };
