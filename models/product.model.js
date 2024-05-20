const { query } = require('../database/database.js');
const User = require('./user.model')
class Product {
    static findById = async (productId) => {
        const sql = 'SELECT * FROM Product WHERE id = ?';
        const params = [productId];
        const product = await query(sql, params);
        return product;
    }

    static findByName = async (searchTerm) => {
        const products = await query(`
            SELECT 
                Product.id,
                Product.name,
                Category.name AS category,
                Product.img AS image,
                Product.unit,
                Product.price,
                Product.description,
                Product.number,
                Product.rating
            FROM Product
            LEFT JOIN Category ON Product.category_id = Category.id
            WHERE Product.name LIKE '%${searchTerm}%'
        `);
        return products;
    }

    static findAll = async (shopId) => {
        const sql = 'SELECT * FROM Product WHERE seller_id = ?';
        const params = [shopId];
        const product = await query(sql, params);
        return product;

    }

    static update = async ({ id, name, img, category, unit, price, description }) => {
        const sql = 'UPDATE Product SET name = ?, img = ?, category_id = ?, unit = ?, price = ?, description = ? WHERE id = ?';
        const params = [name, img, category, unit, price, description, id];
        const product = await query(sql, params);
        return product;
    }

    static create = async ({ name, img, category, unit, price, description, number }) => {
        const now = new Date();
		const createdAt = now.toISOString().slice(0, 19).replace('T', ' ');
        const sql = 'INSERT INTO Product (name, img, category_id, unit, price, description, number, rating, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
        const params = [name, img, category, unit, price, description, number, 0, createdAt];
        const product = await query(sql, params);
        return product;
    }
    
    static delete = async (productId) => {
        const sql = 'DELETE FROM Product WHERE id = ?';
        const params = [productId];
        const product = await query(sql, params);
        return product;
    }


    static findAll = async() =>{
        const sql =            
                `SELECT 
                Product.id,
                Product.name,
                Category.name AS category,
                Product.img AS image,
                Product.unit,
                Product.price,
                Product.description,
                Product.number,
                Product.rating
            FROM Product
            LEFT JOIN Category ON Product.category_id = Category.id`;

        const products = await query(sql);
        console.log(products.length);
        return products;
    }



    static changeNumber = async ({ id, number }) => {
        const sql = 'UPDATE Product SET number = ? WHERE id = ?';
        const params = [number, id];
        const product = await query(sql, params);
        return product;
    }


}

module.exports = Product;