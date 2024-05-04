const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/product.controller');
const AuthMiddleware = require('../middlewares/auth.middleware');

router.get('/find', ProductController.findProduct);
router.use(AuthMiddleware.authorize)
router.post('/create', ProductController.createProduct);
router.post('/delete', ProductController.deleteProduct);
router.post('/update', ProductController.updateProduct);

module.exports = router;