const jwt = require('jsonwebtoken');
const app_config = require('../configs/app.config');
 
class AuthMiddleware {
    static authorize = (req, res, next) => {
        const token = req.headers.authorization;
        if(!token) {
            return res.status(401).json({ success: false, message: 'Unauthorized' });
        }
        try {
            const jwt_decoded = jwt.verify(token, app_config.secret_key);
            req.jwt_decoded = jwt_decoded;
            return next();
        } catch (error) {
            return res.status(400).send({
                success: false,
                message: error.message
            })
        }
    }
}
 
module.exports = AuthMiddleware;