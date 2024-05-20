const User = require('../models/user.model');
const AuthUtil = require('../utils/auth.util');

class UserController {
    static changeInformation = async (req, res) => {
        try {
            // console.log(req.body)
            // console.log(req.params.customerID)
            await User.updateAccountInformation({
                id: req.body.customer_id,
                cccd: req.body.CCCD,
                email: req.body.email,
                name: req.body.name,
                phone_number: req.body.phone_number,
            });
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
            console.log(req.body)
            const foundUser = await User.findById(req.body.userID);
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
                id: req.body.userID,
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

    static getUserInfomation = async(req, res) => {
            const userId = req.params.user_id;
            console.log("change info");
            const data = await User.findAccountById(userId)
            if (data){
                res.status(200).json(data[0])
            }
            else{
                res.status(500).json({
                    success: false,
                    message: "No user was found!"
                })
            }
    }
}

module.exports = UserController;