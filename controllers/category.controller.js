const Category = require('../models/category.model');

class CategoryController {

    static getAll = async (req, res) => {
        return res.status(200).json({ 
            message: 'Get all categories successfully',
            categories: await Category.getAll() 
        });
    }
}

module.exports = CategoryController;