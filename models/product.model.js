const { query } = require('../database/database.js');
const User = require('./user.model')
class Product {
    static findById = async (productId) => {
        const sql = 'SELECT * FROM Product WHERE id = ?';
        const params = [productId];
        const product = await query(sql, params);
        return product;
    }

    static create = async ({ name, img, category, seller, unit, price, description, number }) => {
        const sql = 'INSERT INTO Product (name, img, category_id, seller_id, unit, price, description, number, rating, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        const params = [name, img, category, seller, unit, price, description, number, 0, Date.now()];
        const product = await query(sql, params);
        return product;
    }
    
    static delete = async (productId) => {
        const sql = 'DELETE FROM Product WHERE id = ?';
        const params = [productId];
        const product = await query(sql, params);
        return product;
    }

}

module.exports = Product;