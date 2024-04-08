const { query } = require('../database/database.js');
 
class User {
    static async create({ name, account_name, email, password, phone_number, cccd, date_of_birth, role }) {
        const sql = 'INSERT INTO Profile (name, account_name, email, password, phone_number, cccd, date_of_birth, role) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        const params = [ name, account_name, email, password, phone_number, cccd, date_of_birth, role ];
        const newUser = await query(sql, params);
        return newUser;
    }
 
    static async findByEmail(email) {
        const sql = 'SELECT * FROM Profile WHERE email = ?';
        const params = [email];
        const foundUser = await query(sql, params);
        return foundUser[0];
    }
 
    static async findByUserName(account_name) {
        const sql = 'SELECT * FROM Profile WHERE account_name = ?';
        const params = [account_name];
        const foundUser = await query(sql, params);
        return foundUser[0];
    }
 
    static findById = async (userId) => {
        const sql = 'SELECT * FROM Profile WHERE id = ?';
        const params = [userId];
        const foundUser = await query(sql, params);
        return foundUser[0];
    }
 
}
 
module.exports = User;