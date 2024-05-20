const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');
const AuthMiddleware = require('../middlewares/auth.middleware');


router.get('/change-information/:user_id', UserController.getUserInfomation);
//router.use(AuthMiddleware.authorize);
// http://localhost:3001/api/v1/user/change-password
router.post('/change-information', UserController.changeInformation);
router.post('/change-password', UserController.changePassword);

module.exports = router;