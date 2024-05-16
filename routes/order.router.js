const express = require("express");

const router = express.Router();

const {
	createOrder,
	updateOrder,
	deleteOrder,
	getOrderDetail,
	deleteItemOrder,
	purchasedOrder,
	getOrders,
	// getOrderById,
	// getUserOrders,
} = require("../controllers/order.controller");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");
const AuthMiddleware = require('../middlewares/auth.middleware');

router.get("/orders", isAuthenticatedUser, authorizeRoles("admin"), getOrders);



//router.use(AuthMiddleware.authorize);

router.get("/order/details", getOrderDetail);

router.post("/order", createOrder);
router.put("/order/:id", updateOrder);
router.get("/order/place-order/:orderId", getOrderById);
router.delete("/order/:id", deleteOrder);
//router.delete("/order/:orderId/product/:productId", deleteItemOrder);
//router.get("/user/orders", isAuthenticatedUser, getUserOrders);

module.exports = router;