const { query } = require('../database/database.js');

class User {
    static createAccount = async ({ account_name, password, name, cccd, email, phone_number, date_of_birth }) => {
        const now = new Date();
		// const createdAt = now.toISOString().slice(0, 19).replace('T', ' ');
		// this.createdAt = createdAt;

        const sql = `INSERT INTO Account (account_name, password, name, cccd, email, phone_number, date_of_birth, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
        const params = [account_name, password, name, cccd, email, phone_number, date_of_birth, now.toISOString().slice(0, 19).replace('T', ' ')];
        const result = await query(sql, params);

        return result;
    }

    static createProfile = async ({ name, account_id, phone_number, dob }) => {
        const sql = `INSERT INTO Profile (name, account_id, phone_number, date_of_birth) VALUES (?, ?, ?, ?)`;
        const params = [name, account_id, phone_number, dob];
        const result = await query(sql, params);
        return result;
    }

    static createSellerProfile = async ({ shop_name, description, account_id }) => {
        const sql = `INSERT INTO Seller (shop_name, description, account_id) VALUES (?, ?, ?)`;
        const params = [shop_name, description, account_id];
        const result = await query(sql, params);
        return result;
    }

    static async findByUsername(username) {
        const sql = `SELECT * FROM Account WHERE account_name = ?`;
        const params = [username];
        const result = await query(sql, params);
        return result;
    }

    static findById = async (id) => {
        const sql = `SELECT * FROM Account WHERE id = ?`;
        const params = [id];
        const result = await query(sql, params);
        return result;
    }

    static updateAccountInformation = async ({ id, cccd, email, name, phone_number, date_of_birth }) => {
        const sql = `UPDATE Account SET cccd = ?, email = ?, name = ?, phone_number = ?, date_of_birth = ? WHERE id = ?`;
        const params = [cccd, email, name, phone_number, date_of_birth, id];
        const result = await query(sql, params);
        console.log(id)
        return result; 
    }

    static updateProfileInformation = async ({ id, name, phone_number, date_of_birth }) => {
        const sql = `UPDATE Profile SET name = ?, phone_number = ?, date_of_birth = ? WHERE account_id = ?`;
        const params = [name, phone_number, date_of_birth, id];
        const result = await query(sql, params);
        return result;
    }

    static updateSellerInformation = async ({ id, shop_name, description }) => {
        const sql = `UPDATE Seller SET shop_name = ?, description = ? WHERE account_id = ?`;
        const params = [shop_name, description, id];
        const result = await query(sql, params);
        return result;
    }

    static async changePassword({ id, newPassword }) {
        const sql = `UPDATE Account SET password = ? WHERE id = ?`;
        const params = [newPassword, id];
        const result = await query(sql, params);
        return result;
    }

    static findSellerByAccountId = async (id) => {
        const sql = `SELECT * FROM Seller WHERE account_id = ?`;
        const params = [id];
        const result = await query(sql, params);
        return result;
    }

    static findAccountById = async(id) => {
        const sql = `SELECT * FROM Account WHERE id = ?`;
        const params = [id];
        const result = await query(sql, params);
        return result;
    }
}

module.exports = User;