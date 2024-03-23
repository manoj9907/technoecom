const order = require("../modules/order.module");
const product = require("../modules/product.module");

exports.createOrder = async (req, res) => {
  console.log("check req", req.body);
  let orderId = 0;
  let totalAmount = 0;
  try {
    const { user_id, purchase_products } = req.body;
    let totalitems = purchase_products.length;

    // check order ID
    const ordeId = await order.findOne().sort({ createdAt: -1 });
    console.log("order", ordeId);
    if (ordeId) {
      orderId = parseInt(ordeId.order_id.split("-"[1]));
    }
    purchase_products.forEach((product) => {
      totalAmount += product.price * product.quantity;
    });

    var newOrderid = generateOrderId(orderId);
    console.log("new", newOrderid);
    const newOrder = new order({
      order_id: newOrderid,
      user_id: user_id,
      purchase_products: purchase_products,
      totalAmount: totalAmount,
      total_purchase_item: totalitems,
    });
    const saveOrder = await newOrder.save();
    console.log("save order", saveOrder);
    for (let purchse of saveOrder.purchase_products) {
      if (purchse.product_id) {
        var stockCount = purchse.stock - purchse.quantity;
        var updateStock = await product.findOneAndUpdate(
          { _id: purchse.product_id },
          { stock: stockCount }
        );
      }
    }

    return res.status(200).json({
      success: true,
      message: "Order placed successfully",
      saveOrder,
    });
  } catch (error) {
    res.status(500).json({
      message: "An Error Occured",
    });
  }
};

function generateOrderId(orderId) {
  orderId++;
  return `${orderId.toString().padStart(5, "0")}`;
}
