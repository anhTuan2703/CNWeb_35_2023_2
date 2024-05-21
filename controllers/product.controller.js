const Product = require('../models/product.model');
const User = require('../models/user.model');
const { query } = require('../database/database.js');

class ProductController {
    static createProduct = async (req, res) => {
        try {
            const existing= (await query(`SELECT * FROM Product WHERE name = '${req.body.name.trim()}'`))
            console.log(existing)
            if (existing > 0){
                return res.status(201).send({
                    success: false,
                    message: 'Product is already exist in database'
                })
            }
            console.log("heeeeee")
            const newProduct = await Product.create({ ...req.body});

            if(newProduct){
                return res.status(201).send({
                    success: true,
                    message: 'Product created successfully'
                });                
            }else{
                return res.status(201).send({
                    success: false,
                    message: 'Lack of information'
                });   
            }

        } catch (error) {
            return res.status(400).send({
                success: false,
                message: error.message
            });
        }
    }
    
    static deleteProduct = async (req, res) => {
        console.log(req.body.id)
        try {
            const product = await Product.findById(req.body.id);
            if (!product.length) {
                return res.status(404).send({
                    success: false,
                    message: 'Product not found'
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

    static updateProduct = async (req, res) => {
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
            await Product.update(req.body);
            return res.status(200).json({
                success: true,
                message: 'Product updated successfully'
            });
        } catch (err) {
            console.log(err);
            return res.status(400).send({
                success: false,
                message: err.message
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

    static getAllProduct = async (req, res) =>{
        console.log("hi");
        try {
            const products =  await Product.findAll();
            return res.status(200).json(
                products
            );
        }
        catch (error) {

            return res.status(400).send({
                success: false,
                message: error.message
            });
        }
    }
    
    static findProductByName = async (req, res) => {
        try {
            console.log(req.query.q)
            const products = await Product.findByName(req.query.q)
            return res.status(200).json(
                products
            );
        } catch (error){
            res.status(400).send({
                success: false,
                massage: error.massage
            });
        }
    }



    static changeProductNumber = async (req, res) => {
        try {

        } catch (err) {
            console.log(err);
            return res.status(400).send({
                success: false,
                message: err.message
            });
        }

    }
}

module.exports = ProductController;