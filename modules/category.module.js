const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var categorySchema = {
  categoryname: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  store_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "store",
    required: true,
  },
};

const categoryModel = mongoose.model("category", categorySchema);
module.exports = categoryModel;
