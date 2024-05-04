const express = require("express");

const router = express.Router();

const {
	createOrder,
	updateOrder,
	deleteOrder,
	deleteItemOrder,
	getOrders,
	// getOrderById,
	// getUserOrders,
} = require("../controllers/order.controller");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

//router.get("/orders", isAuthenticatedUser, authorizeRoles("admin"), getOrders);
router.post("/order", isAuthenticatedUser, createOrder);
router.put("/order/:id", isAuthenticatedUser, updateOrder);
// router.get("/order/:id", isAuthenticatedUser, getOrderById);
router.delete("/order/:id", isAuthenticatedUser, deleteOrder);
router.delete("/order/:orderId/product/:productId", isAuthenticatedUser, deleteItemOrder);
//router.get("/user/orders", isAuthenticatedUser, getUserOrders);

module.exports = router;