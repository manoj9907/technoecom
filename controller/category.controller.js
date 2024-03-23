const category = require("../modules/category.module");
const logger = require("../controller/logger");

exports.create = async (req, res) => {
  console.log("check req", req.body);
  try {
    const { categoryname, description, store_id } = req.body;
    const existingCatgory = await category.findOne({ categoryname });
    console.log("existingCatgory", existingCatgory);
    if (existingCatgory) {
      return res.status(400).json({ message: "category already exist" });
    }

    const newCategory = new category({ categoryname, description, store_id });
    const saveCategory = await newCategory.save();
    return res.status(200).json({
      success: true,
      saveCategory,
    });
  } catch (error) {
    res.status(500).json({
      message: "An Error Occured",
    });
    // logger.loggerResponse.log("error", error);
  }
};

exports.getCategory = async (req, res) => {
  try {
    const getCategory = await category.find();
    console.log("check get", getCategory);
    return res.status(200).json({
      success: true,
      getCategory,
    });
  } catch (error) {
    res.status(500).json({
      message: "internal server error",
    });
  }
};
