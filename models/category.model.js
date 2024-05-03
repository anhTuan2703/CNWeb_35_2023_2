const { query } = require('../database/database.js');


class Category {
    static getAll = async () => {
        const sql = `SELECT * FROM Category WHERE 1`;
        const result = await query(sql);
        return result;
    }
}

module.exports = Category;