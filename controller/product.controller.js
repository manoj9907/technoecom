const product = require("../modules/product.module");
const logger = require("../controller/logger");

exports.create = async (req, res) => {
  console.log("check req", req.body);
  try {
    const { productname, size, price, category_id, stock } = req.body;

    const newProduct = new product({
      productname,
      size,
      price,
      category_id,
      stock,
    });
    const saveProduct = await newProduct.save();
    return res.status(200).json({
      success: true,
      saveProduct,
    });
  } catch (error) {
    res.status(500).json({
      message: "An Error Occured",
    });
  }
};

exports.getAllProduct = async (req, res) => {
  try {
    const getAllProduct = await product.find();
    console.log("check get", getAllProduct);
    return res.status(200).json({
      success: true,
      getAllProduct,
    });
  } catch (error) {
    res.status(500).json({
      message: "internal server error",
    });
  }
};

exports.getProduct = async (req, res) => {
  try {
    if (req.query.product_id) {
      const getProduct = await product.findById(req.query.product_id);
      console.log("check get", getProduct);
      return res.status(200).json({
        success: true,
        getAllProduct,
      });
    } else if (req.query.category_id) {
      var category_id = req.query.category_id;
      const getAllProduct = await product.find({
        category_id: category_id,
      });
      //   console.log("cj", getAllProduct);
      console.log("check get", getAllProduct);
      return res.status(200).json({
        success: true,
        getAllProduct,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "internal server error",
    });
  }
};
