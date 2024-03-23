const store = require("../modules/store.module");
const logger = require("../controller/logger");

exports.create = async (req, res) => {
  console.log("check req", req.body);
  try {
    const { storename, description } = req.body;
    const existingStore = await store.findOne({ storename });
    if (existingStore) {
      return res.status(400).json({ message: "store already exist" });
    }

    const newstore = new store({ storename, description });
    const saveStore = await newstore.save();
    return res.status(200).json({
      success: true,
      saveStore,
    });
  } catch (error) {
    res.status(500).json({
      message: "An Error Occured",
    });
    // logger.loggerResponse.log("error", error);
  }
};

exports.getStore = async (req, res) => {
  try {
    const getallstore = await store.find();
    console.log("check get", getallstore);
    return res.status(200).json({
      success: true,
      getallstore,
    });
  } catch (error) {
    res.status(500).json({
      message: "internal server error",
    });
  }
};
