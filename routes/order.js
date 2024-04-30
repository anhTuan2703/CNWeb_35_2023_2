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
	getOrders,
	updateProductAmount,
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
router.get("/order/detail/:orderId", isAuthenticatedUser, getOrderDetail);
router.post("/order/:orderId/product/:productId", isAuthenticatedUser, addProduct);
router.put("/order/updateItem/:orderId", isAuthenticatedUser, updateProductAmount);
router.put("/order/shippingInfo/:orderId", isAuthenticatedUser, updateShippingInfo);
//router.get("/user/orders", isAuthenticatedUser, getUserOrders);

module.exports = router;
