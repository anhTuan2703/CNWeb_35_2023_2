const User = require('../models/user.model');
const AuthUtil = require('../utils/auth.util');
 
class AccessController {
    static register = async (req, res) => {
        try {
            const {
                name,
                account_name,
                password,
                email,
                phone_number,
                address,
                cccd,
                date_of_birth,
                role
            } = req.body;
            const foundUser = await User.findByUserName(account_name) || await User.findByEmail(email);
            if(foundUser){
                throw new Error('User already exists');
            }
            const passwordHash = await AuthUtil.hashPassword(password);
            const newUser = await User.create({
                name,
                account_name,
                password: passwordHash,
                email,
                phone_number,
                address,
                cccd,
                date_of_birth,
                role
            });
            if(!newUser){
                throw new Error('Error creating user');
            }
            return res.status(201).send({
                success: true,
                message: 'User created successfully',
                user: newUser.insertId
            });
        } catch (error) {
            return res.status(400).send({
                success: false,
                message: error.message
            })
        }
    }
 
    static login = async (req, res) => {
        const { account_name, password } = req.body;
        try {
            const foundUser = await User.findByUserName(account_name);
            if(!foundUser){
                throw new Error('User not found');
            }
            const isPasswordValid = await AuthUtil.comparePassword(password, foundUser.password);
            if(!isPasswordValid){
                throw new Error('Invalid password');
            }
            console.log(foundUser)
            const token = AuthUtil.createToken({
                userId: foundUser.id,
                email: foundUser.email,
                role: foundUser.role
            });
            return res.status(200).send({
                success: true,
                message: 'Login successful',
                token
            });
        } catch (error) {
            return res.status(400).send({
                success: false,
                message: error.message
            });
        }
    }
}
 
module.exports = AccessController;