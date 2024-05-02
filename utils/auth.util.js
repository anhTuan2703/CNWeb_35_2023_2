const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const app_config = require('../configs/app.config')

class AuthUtil {
    static hashPassword = async (password) => {
        return await bcrypt.hash(password, 10);
    }

    static comparePassword = async (password, hash) => {
        return await bcrypt.compare(password, hash);
    }
    
    static generateToken = (payload) => {
        return jwt.sign(payload, app_config.secret_key, { expiresIn: '1d' });
    }
}

module.exports = AuthUtil;