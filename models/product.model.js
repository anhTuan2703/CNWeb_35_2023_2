const { query } = require('../database/database.js');
const User = require('./user.model')
class Product {
    static findById = async (productId) => {
 
    }
 
    static create = async ({ userId, name, category, unit, price, description, number }) => {
 
        const user = await User.findById(userId);
        if(user.role !== 'seller') {
            throw new Error('You can not add product!');
        }
 
        const sql = 'INSERT INTO products (name, category, unit, price, description, number) VALUES (?, ?, ?, ?, ?, ?)';
        const params = [name, category, unit, price, description, number];
 
        const newProduct = await query(sql, params);
        return newProduct;
    }
}
 
module.exports = Product;