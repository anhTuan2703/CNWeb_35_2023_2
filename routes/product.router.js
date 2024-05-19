const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/product.controller');
const AuthMiddleware = require('../middlewares/auth.middleware');

router.get('/:shopId/find', ProductController.findProductsByShop);
router.get('/find', ProductController.findProduct);
router.get('/search', ProductController.findProductByName);
router.get('/all-product', ProductController.getAllProduct);
//router.use(AuthMiddleware.authorize)
router.post('/create', ProductController.createProduct);
router.post('/delete', ProductController.deleteProduct);
router.post('/update', ProductController.updateProduct);

module.exports = router;