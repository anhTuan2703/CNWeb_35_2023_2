const express = require('express');
const router = express.Router();

router.use('/access', require('./access.router'));
router.use('/product', require('./product.router'));
router.use('/user', require('./user.router'));
router.use('/category', require('./category.router'));

module.exports = router;