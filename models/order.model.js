const { query } = require("../database/database");
const ErrorHandler = require("../utils/errorHandler");

class Order {
	constructor(order) {
		this.id = order.id || null;
        this.customerId = order.customer_id || 0;
		this.itemsOrder = order.items_order || [];
		this.shippingInfo = order.shipping_info || null;
		this.shipPrice = order.ship_price || 0;
		this.totalPrice = order.total_price ||0;
		this.shipId = order.ship_id || null;
		// this.createdAt = order.createdAt || Date.now;
		const now = new Date();
		const createdAt = now.toISOString().slice(0, 19).replace('T', ' ');
		this.createdAt = createdAt;
	}
	// create new order
	async createOrder() {
		if (this.itemsOrder.length < 1)
			return new ErrorHandler("Dont have any order items", 401);

		let address = "", phoneNo = "", city = "";
		if (this.shippingInfo != null){
			address = this.shippingInfo.address;
			phoneNo = this.shippingInfo.phoneNo;
			city = this.shippingInfo.city;
		}

		const sql_shipping =
			"INSERT INTO Shipping_info (address, phoneNo, city) VALUES (?, ?, ?)";
		const params_shipping = [
			address,
			phoneNo,
			city,
		];
		const res_shippingInfo = await query(sql_shipping, params_shipping);
		this.shippingInfo.id = res_shippingInfo.insertId;			
		

		const sql_order =
			"INSERT INTO Orders (customer_id, ship_price, total_price, ship_id, created_at) VALUES (?, ?, ?, ?, ?)";
		const params_order = [
			this.customerId,
			this.shipPrice,
			this.totalPrice,
			this.shippingInfo.id,
			this.createdAt,
		];
		const res_order = await query(sql_order, params_order);
		this.id = res_order.insertId;

		if (this.itemsOrder != null){
			for (const item of this.itemsOrder) {
				const sql_orderItem =
					"INSERT INTO ItemOrder (order_id, product_id, amount, created_at) VALUES (?,?,?, ?)";
				const params_orderItem = [this.id, item.id, item.amount, this.createdAt];
				await query(sql_orderItem, params_orderItem);
			}			
		}
		return this;
	}


	static async getOrders(query) {
		const { skip, take } = query;

		const sql =
			"SELECT * FROM orders";
		const res = await query(sql, [skip, take]);

		return res;
	}
	
}

module.exports = Order;
