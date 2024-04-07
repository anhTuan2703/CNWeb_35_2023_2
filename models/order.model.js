const { query } = require("../database/database");
const ErrorHandler = require("../utils/errorHandler");

class Order {
	constructor(order) {
		this.id = order.id || null;
        this.customerId = order.customerId || null;
		this.productId = this.productId || null;
		this.createdAt = order.createdAt || Date.now;
	}
	// create new order
	async createOrder() {
		if (this.itemsOrder.length < 1)
			return new ErrorHandler("Dont have any order items", 401);
		// create Order
		const sql_order =
			"INSERT INTO Order (customer_id, product_id, created_at) VALUES (?, ?, ?)";
		const params_order = [
			this.customerId,
			this.productId,
			this.createdAt,
		];
		const res_order = await query(sql_order, params_order);
		this.id = res_order.insertId;
		return this;
	}

	static async getOrders(query) {
		const { skip, take } = query;

		const sql =
			"SELECT * FROM order";
		const res = await query(sql, [skip, take]);

		return res;
	}
}

module.exports = Order;
