const { query } = require('../database/database.js');
const User = require('./user.model')
class Product {
    static findById = async (productId) => {
        const sql = 'SELECT * FROM Product WHERE id = ?';
        const params = [productId];
        const product = await query(sql, params);
        return product;
    }

}

module.exports = Product;