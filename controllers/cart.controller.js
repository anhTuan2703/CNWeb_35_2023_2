const Cart = require("../models/cart.model");
const Order = require("../models/order.model");
const catchAsyncError = require("../middlewares/catchAsyncErrors");
const { query } = require("../database/database");
const Product = require("../models/product.model");
const Customer = require("../models/customer.model");
const APIFeatures = require("../utils/apifeature");
exports.createOrder = catchAsyncError(async (req, res, next) => {
	const order = new Order(req.body);
	order.user = req.user;
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

exports.getUserOrders = catchAsyncError(async (req, res) => {
	const user = req.user;
	const { take = 10, orderStatus = "" } = req.query;
	const status = `%${orderStatus}%`;
	const sql =
		"SELECT * FROM orders WHERE idUser = ? AND orderStatus LIKE ? ORDER BY id DESC";
	try {
		const orders = new APIFeatures(
			await query(sql, [user.id, status]),
			req.query,
		)
			.filter()
			.pagination(take);

		res.status(200).json({
			status: "success",
			data: orders.query,
			total: orders.total,
		});
	} catch (error) {}
});