const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');
const AuthMiddleware = require('../middlewares/auth.middleware');

router.use(AuthMiddleware.authorize);

router.post('/change-information', UserController.changeInformation);

module.exports = router;