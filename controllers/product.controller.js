const Product = require('../models/product.model');
 
class ProductController {
    static createProduct = async (req, res) => {
        try {
            const { name, category, unit, price, description, number } = req.body;
            const { userId } = req.jwt_decoded;
            const newProduct = await Product.create({
                userId,
                name,
                category,
                unit,
                price,
                description,
                number
            });
            return res.status(201).send({
                success: true,
                message: 'Product created successfully',
                productId: newProduct.insertId
            });
        } catch (error) {
            return res.status(400).send({
                success: false,
                message: error.message
            });
        }
    }
}
 
module.exports = ProductController;