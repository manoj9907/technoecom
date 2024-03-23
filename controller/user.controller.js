const user = require("../modules/user.module");
const order = require("../modules/order.module");

exports.create = async (req, res) => {
  console.log("check req", req.body);
  try {
    const { username, phonenumber } = req.body;
    const existingUser = await user.findOne({ phonenumber });
    if (existingUser) {
      return res.status(400).json({ message: "User already exist" });
    }

    const newUser = new user({ username, phonenumber });
    const saveUser = await newUser.save();
    return res.status(200).json({
      success: true,
      saveUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "An Error Occured",
    });
  }
};

exports.getAllUser = async (req, res) => {
  try {
    console.log("get");
    const getalluser = await user.find();
    console.log("check get", getalluser);
    return res.status(200).json({
      success: true,
      getalluser,
    });
  } catch (error) {
    res.status(500).json({
      message: "internal server error",
    });
  }
};

exports.MyOrders = async (req, res) => {
  try {
    if (req.query.order_id) {
      var myOrders = await order.findOne({ order_id: req.query.order_id });
      console.log("myorder", myOrders);
      if (myOrders === null) {
        return res.status(400).json({ message: "User order not found" });
      }
      //   const groupedByCategory = myOrders.purchase_products.reduce(
      //     (acc, product) => {
      //       const { category_id, category_name, ...rest } = product;
      //       if (!acc[category_id]) {
      //         acc[category_id] = {
      //           category_id,
      //           category_name,
      //           product: [],
      //         };
      //       }
      //       acc[category_id].product.push(rest);
      //       return acc;
      //     },
      //     {}
      //   );
      //   const groupedcategories = Object.values(groupedByCategory);

      return res.status(200).json({
        success: true,
        myOrders,
      });
    } else if (req.query.user_id) {
      var myOrders = await order.find({ user_id: req.query.user_id });
      console.log("myorder", myOrders);
      if (myOrders.length === 0) {
        return res.status(400).json({ message: "User order not found" });
      }
      return res.status(200).json({
        success: true,
        myOrders,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "internal server error",
    });
  }
};
