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

// get order detail
exports.getOrderDetail = catchAsyncError(async (req, res, next) =>{
	//const id = req.params.orderId;
	const userId = req.body.customer_id;

	const orderId = await query (`SELECT id FROM Orders WHERE customer_id = ? and status = 'pending'`, [userId])[0].id;
	console.log(userId)	
	const order = await query (`SELECT * FROM Orders WHERE id = ?`, [orderId])[0];
	
	if (!order) 
		res.status(500).json({
			status: "error",
			massage: "Order Not Found" + orderId
	});

	const itemsOrder = await query (`SELECT * FROM ItemOrder WHERE order_id = ?`, [orderId]);
	const shippingInfo = await query (`SELECT * FROM Shipping_Info WHERE id = ?`, [order[0].ship_id]);

	const products = [];
	for (const item of itemsOrder) {
		// Fetch the product details for the current item
		const product = await query(`SELECT * FROM Product WHERE id = ?`, [item.product_id]);
		product[0].amount = item.amount;
		const category = await query (`SELECT * FROM Category WHERE id = ?`, [product[0].id]);
		product[0].category = category[0].name;
		products.push(product);
	}

	products.forEach(element => {
		console.log(element)
	});

	const responseData = {
		id: orderId,
		items_order: products.map(item => ({
			//id: item.id,
			name: item[0].name,
			image: item[0].img,
			category: item[0].category,
			unit: item[0].unit,
			price: item[0].price,
			description: item[0].description,
            amount: item[0].amount
		})),
		shipping_info: {
			address: shippingInfo[0].address,
			phoneNo: shippingInfo[0].phoneNo,
			city: shippingInfo[0].city
		},
		ship_price: order[0].ship_price,
		total_price: order[0].total_price
	};

	res.status(200).json({
		status: "success",
		data: responseData
	})
});

//add product 
exports.addProduct = catchAsyncError(async (req, res, next) =>{
	const id = req.params.orderId;
	const productId = req.params.productId;

	const existingItem = await query(
		"SELECT id, amount FROM itemOrder WHERE order_id = ? AND product_id = ?", 
		[id, productId]
	);
	if (existingItem.length > 0 ){
		const itemId = existingItem[0].id;
		const amount = existingItem[0].amount;
		const sql_udpate = 
			"UPDATE ItemOrder SET amount = ? WHERE id = ?";
		const params_orderItem = [amount + 1, itemId];
		await query(sql_udpate, params_orderItem);

		res.status(200).json({
			status: "sucess",
			massage: "Product already exist in cart, increase amount",
		});
	}

	const now = new Date();
	const createdAt = now.toISOString().slice(0, 19).replace('T', ' ');
	const sql_orderItem =
		"INSERT INTO ItemOrder (order_id, product_id, amount, created_at) VALUES (?,?,?,?)";
	const params_orderItem = [id, productId, 1, createdAt];
	await query(sql_orderItem, params_orderItem);
	res.status(200).json({
		status: "sucess",
		massage: "Add product to cart successfully",
	});
});

//update product amount in cart
exports.updateProductAmount = catchAsyncError(async (req, res, next) =>{
	const id = req.params.orderId;
	const body = req.body;
	console.log("hi " + body.product_id)
	const existingItem = await query(
		"SELECT id, amount FROM itemOrder WHERE order_id = ? AND product_id = ?", 
		[id, body.product_id]
	);

	if (existingItem.length > 0 ){
		const itemId = existingItem[0].id;
		const sql_udpate = 
			"UPDATE ItemOrder SET amount = ? WHERE id = ?";
		const params_orderItem = [body.amount, itemId];
		await query(sql_udpate, params_orderItem);
		res.status(200).json({
			status: "sucess",
			massage: "Update Product amount successfully",
		});
	}
	else{
		res.status(200).json({
			status: "error",
			massage: "No Product with this id in cart",
		});
	}
});

//update shipping info 
exports.updateShippingInfo = catchAsyncError(async (req, res, next) =>{
	const id = req.params.orderId;
	const shippingInfo = req.body.shipping_info;
	const ship_id = (await query("SELECT ship_id FROM orders WHERE id = ?", [id]))[0].ship_id;
    for (const key in shippingInfo) {
        await query(
            `UPDATE Shipping_info SET ${key}="${shippingInfo[key]}" WHERE id = ${ship_id}`,
            [],
        );
    }
	res.status(200).json({
		status: "success",
		massage: "Update shipping info succesfully",
	});
});

// place order 
exports.placedOrder = catchAsyncError(async (req, res, next) =>{
	const orderId = req.params.orderId;
	const order = (await query ("SELECT * FROM orderes WHERE id = ?", [orderId]))[0];
	const customerId = order.customer_id;
	if (order.status == "pending"){
		await query(`UPDATE orders SET status = 'placed' WHERE id = ${orderId}`);

		const createOrderResult = await exports.createOrder({
			body: { customer_id: customerId } 
		});

		res.status(200).json({
			status: "success",
			massage: "Place order succesfully"
		});
	}
	res.status(400).json({
		status: "not success",
		massage: "Place order failed"
	});

});

// get all placed order: 
exports.getAllPlacedOrders = catchAsyncError(async  (req, res, next) =>{
	const customerId = req.params.customer_id;
	const placedOrders = (await query("SELECT * FROM orders WHERE customer_id = ? AND status = 'placed'", [customerId]));
});
//get current order id 
exports.getCurrentOrderId = catchAsyncError(async (req, res, next) =>{
	const customerId = req.params.customer_id;
	const currnentOrder = (await query("SELECT id FROM orders WHERE customer_id = ? AND status = 'pending'", [customerId]));
	res.status(200).json({
		orderId: currnentOrder
	})
})