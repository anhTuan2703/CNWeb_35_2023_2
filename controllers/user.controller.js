const User = require('../models/user.model');
const AuthUtil = require('../utils/auth.util');

class UserController {
    static changeInformation = async (req, res) => {
        try {
            await User.updateAccountInformation({
                id: req.user.id,
                cccd: req.body.cccd,
                email: req.body.email
            });
            if (req.user.role === 'CUSTOMER') {
                await User.updateProfileInformation({
                    id: req.user.id,
                    name: req.body.name,
                    phone_number: req.body.phone_number,
                    date_of_birth: req.body.date_of_birth
                });
            } else {
                await User.updateSellerInformation({
                    id: req.user.id,
                    shop_name: req.body.shop_name,
                    description: req.body.description
                });
            }
            res.status(200).json({
                success: true,
                message: 'Change information successfully!'
            });
        } catch (err) {
            console.log(err);
            res.status(500).json({
                success: false,
                message: err.message
            });
        }
    }

    static changePassword = async (req, res) => {
        try {
            const foundUser = await User.findById(req.user.id);
            if (foundUser.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'User not found!'
                });
            }
            const isMatch = await AuthUtil.comparePassword(req.body.oldPassword, foundUser[0].password);
            if (!isMatch) {
                return res.status(400).json({
                    success: false,
                    message: 'Old password is incorrect!'
                });
            }
            if(req.body.newPassword !== req.body.confirmPassword) {
                return res.status(400).json({
                    success: false,
                    message: 'New password and confirm password do not match!'
                });
            }
            const hashedPassword = await AuthUtil.hashPassword(req.body.newPassword);
            await User.changePassword({
                id: req.user.id,
                newPassword: hashedPassword
            });
            res.status(200).json({
                success: true,
                message: 'Change password successfully!'
            });
        } catch (err) {
            console.log(err);
            res.status(500).json({
                success: false,
                message: err.message
            });
        }
    }
}

module.exports = UserController;