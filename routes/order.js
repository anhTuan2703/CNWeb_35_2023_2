const express = require("express");

const router = express.Router();

const {
	createOrder,
	updateOrder,
	deleteOrder,
	deleteItemOrder,
	getOrderDetail,
	addProduct,
	updateShippingInfo,
	placedOrder,
	getOrders,
	updateProductAmount,
	// getOrderById,
	// getUserOrders,
} = require("../controllers/order.controller");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");
// isAuthenticatedUser, authorizeRoles("admin"),
router.post("/order", isAuthenticatedUser, createOrder);
router.put("/order/:customer_id", isAuthenticatedUser, updateOrder);
router.get("/order/details/:customer_id", getOrderDetail);
router.put("/order/place-order/:customer_id", isAuthenticatedUser, placedOrder);
router.delete("/order/:id", isAuthenticatedUser, deleteOrder);
//router.delete("/order/:orderId/product/:productId", isAuthenticatedUser, deleteItemOrder);
router.post("/order/add-product/:productId", isAuthenticatedUser, addProduct);


//router.get("/user/orders", isAuthenticatedUser, getUserOrders);

module.exports = router;
