const User = require('../models/user.model');
const AuthUtil = require('../utils/auth.util');
const Order = require("../models/order.model");
const Notify = require("./sendmail.controller");
class AccessController {
    static register = async (req, res) => {
        //console.log(req.body)
        try {
            const {
                account_name,
                password,
                name,
                cccd,
                email,
                phone_number,
                date_of_birth,
            } = req.body
            const foundUser = await User.findByUsername(account_name);
            if (foundUser.length > 0) {
                throw new Error('Account name already exists!')
            }
            console.log(date_of_birth)
            const hashedPassword = await AuthUtil.hashPassword(password);
            const newUser = await User.createAccount({
                account_name, password: hashedPassword, name, cccd, email, phone_number, date_of_birth
            })
            const customerId = newUser.insertId;
            const order = new Order({customer_id: customerId})
            const newOrder = await order.createOrder();

            const targetMail = "vituan121002@gmail.com";
            const mailContent = {
                subject: "Welcome to group 35",
                content: "You've created an account in our web, hope you enjoy it."
            }
            Notify(targetMail, mailContent);
            res.status(200).json({
                success: true,
                message: "Create account successfully"
            })
        } catch (err) {
            return res.status(500).send({
                success: false,
                message: err.message
            })
        }
    }

    static login = async (req, res) => {
        try {
            console.log("login");
            const {
                account_name,
                password
            } = req.body;
            const foundUser = await User.findByUsername(account_name);
            if (foundUser.length === 0) {
                return res.status(404).send({
                    success: false,
                    message: 'Account not found!'
                })
            }
            const user = foundUser[0];
            const isPasswordMatch = await AuthUtil.comparePassword(password, user.password);
            // if (!isPasswordMatch) {
            //     return res.status(401).send({
            //         success: false,
            //         message: 'Invalid password!'
            //     })
            // }
            const token = AuthUtil.generateToken({
                id: user.id,
                role: user.role
            });
            console.log(user.role)
            return res.status(200).cookie('id', user.id).send({
                success: true,
                message: 'Login successfully!',
                token
            })
        } catch (err) {
            console.log(err);
            return res.status(500).send({
                success: false,
                message: err.message
            })
        }
    }
}

module.exports = AccessController;