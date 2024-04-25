const User = require('../models/user.model');
const AuthUtil = require('../utils/auth.util');

class AccessController {
    static register = async (req, res) => {
        try {
            const {
                account_name,
                password,
                role,
                cccd,
                email,
            } = req.body
            const foundUser = await User.findByUsername(account_name);
            if(foundUser.length > 0) {
                throw new Error('Account name already exists!')
            }
            const hashedPassword = await AuthUtil.hashPassword(password);
            const newUser = await User.createAccount({
                account_name, password: hashedPassword, role, cccd, email
            })
            if(newUser) {
                let newProfile = null;
                if(role === 'CUSTOMER') {
                    const {
                        name,
                        phone_number,
                        dob
                    } = req.body
                    newProfile = await User.createProfile({
                        name, account_id: newUser.insertId, phone_number, dob
                    })
                } else {
                    const {
                        shop_name,
                        description
                    } = req.body
                    newProfile = await User.createSellerProfile({
                        shop_name, description, account_id: newUser.insertId
                    })
                }
                if(newProfile) {
                    return res.status(201).json({
                        success: true,
                        message: 'Create account and profile successfully!'
                    })
                } else {
                    throw new Error('Create profile failed!')
                }
            } else {
                throw new Error('Create account failed!')
            }
        } catch (err) {
            return res.status(500).send({
                success: false,
                message: err.message
            })
        }
    }

    static login = async (req, res) => {
        const {
            account_name,
            password
        } = req.body;
        const foundUser = await User.findByUsername(account_name);
        if(foundUser.length === 0) {
            return res.status(404).send({
                success: false,
                message: 'Account not found!'
            })
        }
        const user = foundUser[0];
        const isPasswordMatch = await AuthUtil.comparePassword(password, user.password);
        if(!isPasswordMatch) {
            return res.status(401).send({
                success: false,
                message: 'Invalid password!'
            })
        }
        const token = AuthUtil.generateToken({
            id: user.id,
            role: user.role
        });
        return res.status(200).json({
            success: true,
            message: 'Login successfully!',
            token
        })
    }
}

module.exports = AccessController;