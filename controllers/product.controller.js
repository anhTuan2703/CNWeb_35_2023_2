const Product = require('../models/product.model');
const User = require('../models/user.model');

class ProductController {
    static createProduct = async (req, res) => {
        try {
            const user = await User.findById(req.user.id);
            if (!user.length) {
                return res.status(404).send({
                    success: false,
                    message: 'User not found'
                });
            }
            if (user[0].role !== 'SELLER') {
                return res.status(403).send({
                    success: false,
                    message: 'You are not a seller'
                });
            }
            const seller = await User.findSellerByAccountId(req.user.id);
            if (!seller.length) {
                return res.status(404).send({
                    success: false,
                    message: 'Seller not found'
                });
            }
            await Product.create({ ...req.body, seller: seller[0].id });
            return res.status(201).send({
                success: true,
                message: 'Product created successfully'
            });
        } catch (error) {
            return res.status(400).send({
                success: false,
                message: error.message
            });
        }
    }
    
    static deleteProduct = async (req, res) => {
        try {
            const user = await User.findById(req.user.id);
            if (!user.length) {
                return res.status(404).send({
                    success: false,
                    message: 'User not found'
                });
            }
            if (user[0].role !== 'SELLER') {
                return res.status(403).send({
                    success: false,
                    message: 'You are not a seller'
                });
            }
            const seller = await User.findSellerByAccountId(req.user.id);
            if (!seller.length) {
                return res.status(404).send({
                    success: false,
                    message: 'Seller not found'
                });
            }
            const product = await Product.findById(req.body.id);
            if (!product.length) {
                return res.status(404).send({
                    success: false,
                    message: 'Product not found'
                });
            }
            if (product[0].seller_id !== seller[0].id) {
                return res.status(403).send({
                    success: false,
                    message: 'You are not the owner of this product'
                });
            }
            await Product.delete(req.body.id);
            return res.status(200).json({
                success: true,
                message: 'Product deleted successfully'
            });
        } catch (error) {
            return res.status(400).send({
                success: false,
                message: error.message
            });
        }
    }

    static findProduct = async (req, res) => {
        try {
            const product = await Product.findById(req.query.id);
            if (!product.length) {
                return res.status(404).send({
                    success: false,
                    message: 'Product not found'
                });
            }
            return res.status(200).json({
                success: true,
                product: product[0]
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