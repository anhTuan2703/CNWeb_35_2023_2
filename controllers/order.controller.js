const Order = require("../models/order.model");
const catchAsyncError = require("../middlewares/catchAsyncErrors");
const { query } = require("../database/database");
//const Product = require("../models/product.model");
//const User = require("../models/user.model");

exports.createOrder = catchAsyncError(async (req, res, next) => {
	const order = new Order(req.body);
	
	order.customerId = req.body.customer_id;
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

exports.deleteOrder = catchAsyncError(async (req, res, next) => {
	const id = req.params.id;
	const sql = "DELETE FROM orders WHERE id =?";
	const ress = await query(sql, [id]);
	res.json({
		data: ress,
	});
});

exports.deleteItemOrder = catchAsyncError(async (req, res, next) => {
	const id = req.params.orderId;
	const productId = req.params.productId;
	if (productId != null){
		await query("DELETE FROM itemOrder WHERE order_id = ? AND product_id = ?", [id, productId]);
		res.status(200).json({
        	status: "success",
        	message: "Product deleted from cart successfully",
    	});
	}
});

// update product or delivery info
exports.updateOrder = catchAsyncError(async (req, res, next) => {
	const id = req.params.id;
	const body = req.body;

	const shipPrice = body.ship_price !== undefined ? body.shipPrice : 0;
	const totalPrice = body.total_price !== undefined ? body.totalPrice : 0;
	await query(
		`UPDATE orders SET ship_price ="${shipPrice}", total_price = "${totalPrice}" WHERE id = ${id}`,
		[],
	);

    const ship_id = (await query("SELECT ship_id FROM orders WHERE id = ?", [id]))[0].ship_id;
	console.log(ship_id);
    const shippingInfo = body.shipping_info;
    for (const key in shippingInfo) {
        await query(
            `UPDATE Shipping_info SET ${key}="${shippingInfo[key]}" WHERE id = ${ship_id}`,
            [],
        );
    }

	const itemsOrder = body.items_order;
	if (itemsOrder != null){
		for (const item of itemsOrder){
			const productId = item.id;
			const amount = parseInt(item.amount);
			const existingItem = await query(
				"SELECT id, amount FROM itemOrder WHERE order_id = ? AND product_id = ?", 
				[id, productId]
			);
			if (existingItem.length > 0) {
				const itemId = existingItem[0].id;
				await query("UPDATE itemOrder SET amount = ? WHERE id = ?", [amount, itemId]);
			} else {
				await query("INSERT INTO itemOrder (product_id, order_id, amount) VALUES (?, ?, ?)", [productId, id, amount]);
			}
		}
	}


	const updateOrder = await query("SELECT * FROM orders WHERE id = ?", [id]);
	res.status(200).json({
		status: "success",
		data: updateOrder[0],
	});
});

