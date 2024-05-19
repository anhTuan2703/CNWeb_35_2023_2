const Category = require('../models/category.model');
const { query } = require('../database/database.js');
class CategoryController {

    static getAll = async (req, res) => {
        return res.status(200).json(
            await Category.getAll() 
        );
    }

    static createCategory = async (req, res) => {
        console.log(req.body.name)
        const sql = `SELECT * FROM Category WHERE name = TRIM('${req.body.name}')`
        const existingItem = await query(sql);
        if (existingItem.length > 0){
            res.status(500).json({
                success: false,
                message: "Category is already exist"
            })
        }else{
            const category = await Category.createCategory(req.body.name);
            if(category){
                res.status(200).json({
                    success: true, 
                    message: "Create category successfully"
                })                
            }else{
                res.status(500).json({
                    success: false,
                    message: "Create category failed"
                })
            }

        }
    }
}

module.exports = CategoryController;