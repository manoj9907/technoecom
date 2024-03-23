const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var orderSchema = new Schema(
  {
    order_id: {
      type: String,
      required: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    purchase_products: [
      {
        productname: {
          type: String,
          required: true,
        },
        product_id: {
          type: String,
          required: true,
        },
        size: {
          type: Number,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        category_id: {
          type: String,
          required: true,
        },
        category_name: {
          type: String,
          required: true,
        },
        stock: {
          type: Number,
          required: true,
        },
      },
    ],
    order_status: {
      type: Boolean,
      default: true,
    },
    totalAmount: {
      type: Number,
    },
    total_purchase_item: {
      type: Number,
    },
    purchase_date: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    timestamps: true,
  }
);

const orderModel = mongoose.model("order", orderSchema);
module.exports = orderModel;
