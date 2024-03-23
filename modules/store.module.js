const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var storeSchema = {
  storename: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
};

const storeModel = mongoose.model("store", storeSchema);
module.exports = storeModel;
