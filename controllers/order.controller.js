const Order = require("../models/order.model");
const catchAsyncError = require("../middlewares/catchAsyncErrors");
const { query } = require("../database/database");
const Product = require("../models/product.model");
const User = require("../models/user.model");

exports.createOrder = catchAsyncError(async (req, res, next) => {

	const order = new Order(req.body);
	order.customerId = req.customerId;
	try {
		const newOrder = await order.createOrder();
		res.status(200).json({
			status: "success",
			data: newOrder,
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			err,
		});
	}
});

