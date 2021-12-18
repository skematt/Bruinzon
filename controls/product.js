const mongoose = require('mongoose')
const Product = require('../design/product');
const Item = require('../design/item')
const { errorHandler } = require('../design/error_handling')

exports.create = (req, res) => {
    const product = new Product(req.body)
    product.save((err, name) =>{
        if (err){
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json({name});
    })
}

exports.read = (req, res) => {
    return res.json(req.product)
}

exports.write = (req, res) =>{
    let prod = req.product
    prod.name = req.body.name

    prod.save((err, prodName) => {
        if (err){
            return res.status(400).json({
                error : "Error with product"
            });
        }
        res.json(prodName)

    });

};

exports.del= (req, res) =>{

    let prod = req.product


    prod.remove((err, prodName) => {
        if (err){
            return res.status(400).json({
                error : "Error with removal"
            });
        }
        res.json({ removal : "Success"});

    });
    
}

exports.all= (req, res) =>{
    Product.find().exec((err, prodName) => {
        if (err){
            return res.status(400).json({
                error : "Error with returning"
            });
        }
        res.json(prodName)

    })
    
}


exports.findProduct = (req, res, next, objID) => {
    Product.findById(objID).exec((err, prod) => {
        if (err){
            return res.status(400).json({
                error : errorHandler(err)
            });
        } else if (!prod){
            return res.status(400).json({
                error: "Does not exist"
            }); 
        }
        req.product = prod; 
        next();
    });
}

/*
exports.photo =  (req, res, next) => {
    if (req.item.photo.data) {
        res.set('Content-Type',req.item.photo.contentType)
        return res.send(req.item.photo.data)
    }
}
 */