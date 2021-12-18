const formidable = require('formidable'); 
const lodash =  require('lodash');
const fs = require('fs')
const Item = require('../design/item');
const { errorHandler } = require('../design/error_handling')



exports.del = (req, res) => {
    let itemID = req.item; 
    itemID.remove((err, rem) => {
        if (err){
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json({
        
            success : "removed"
        });
    });
};

exports.findItem = (req, res, next, id) => {
    Item.findById(id)
        .populate('productType')
        .exec((err, item) =>{
        if (err){
            return res.status(400).json({
                error: "Error finding item" 
            });
        } else if (!item){
            return res.status(400).json({
                error: "Item does not exist"
            });
        }

        req.item = item;
        next(); 
    });
};

exports.read = (req, res) => {
    req.item.photo = undefined; 
    return res.json(req.item)
}

exports.create = (req, res) => {
    let form = new formidable.IncomingForm() 
    form.keepExtensions = true 

    form.parse(req, (err, fields, files) => {
        if (err){
            //console.log('PHOTO UPLOAD ERROR ----->', err)
            return res.status(400).json({
                error : "Image upload failed"
            })
        }

        // name, description, price, productType, quantity, photo, validShipping
        const {name, description, price, productType, quantity, validShipping} = fields;
        if (!name || !description || !price || !productType || !quantity || !validShipping) {
            console.log(name)
            console.log(description)
            console.log(price)
            console.log(productType)
            console.log(quantity)
            console.log(validShipping)
            return res.status(400).json({
                error : "All required fields have not been filled in"
            })
        }


        let item = new Item(fields) 
        if (files.photo){
            if (files.photo.size > 1000000) {
                return res.status(400).json({
                    error : "Image size is too big, should be <1MB"
                })
            }
            item.photo.data = fs.readFileSync(files.photo.path)
            item.photo.contentType = files.photo.type
        }

        item.save((err, result) => {
            if (err){
                res.result(400).json({
                    error : errorHandler(err)
                });
            }
            res.json(result)

        })

    });


};



exports.write = (req, res) => {
    let form = new formidable.IncomingForm() 
    form.keepExtensions = true 

    form.parse(req, (err, fields, files) => {
        if (err){
            //console.log('PHOTO UPLOAD ERROR ----->', err)
            return res.status(400).json({
                error : "Image upload failed"
            })
        }

        // name, description, price, productType, quantity, photo, validShipping
        //const {name, description, price, productType, quantity, validShipping} = fields;
        //if (!name || !description || !price || !productType || !quantity || !validShipping) {
        //    return res.status(400).json({
        //        error : "All required fields have not been filled in"
        //    })
        //}


        let item = req.item
        item = lodash.extend(item, fields)

        if (files.photo){
            if (files.photo.size > 1000000) {
                return res.status(400).json({
                    error : "Image size is too big, should be <1MB"
                })
            }
            item.photo.data = fs.readFileSync(files.photo.path)
            item.photo.contentType = files.photo.type
        }

        item.save((err, result) => {
            if (err){
                res.result(400).json({
                    error : errorHandler(err)
                });
            }
            res.json(result)

        })

    });

};

/*
Sort and return the products based on different parameters
Sort by the popular products: products?sortwith=numberSold&order=desc&max=4
Sort by the newest products: products?sortwith=createdAt&order=desc&max=4
If there are no other parameters, so return all parameters ordered by id
 */

exports.listItems = (req,res) => {

    let order = req.query.order ? req.query.order : 'asc';
    let sortwith = req.query.sortwith ? req.query.sortwith : '_id';
    let max = req.query.max ? parseInt(req.query.max) : 99;

    Item.find()
        .select("-photo") // We don't want to return the photos, huge file size
        .populate('productType')
        .sort([[sortwith, order]])
        .limit(max)
        .exec((err,data) => {
            if (err) {
                return res.status(400).json({error:"Items not found"})
            }
            res.json(data)
        })

}

exports.listRelated = (req,res) => {

    let max = req.query.max ? parseInt(req.query.max) : 4;

    Item.find({_id: { $ne: req.item._id}, productType: req.item.productType})
        .select("-photo")
        .limit(max)
        .populate('productType', '_id name')
        .exec((err,data) => {
            if (err) {
                return res.status(400).json({error:"Items not found"})
            }
            res.json(data)
        })

}

exports.listProductTypes = (req,res) => {

    Item.distinct("productType",{}, (err,data) => {
        if (err) {
            return res.status(400).json({error:"Items not found"})
        }
        res.json(data)
    })

}

exports.photo =  (req, res, next) => {
    if (req.item.photo.data) {
        res.set('Content-Type',req.item.photo.contentType)
        return res.send(req.item.photo.data)
    }
    return res.status(400).json({error:"Photo not found"})

}

exports.listSearch = (req, res) => {
    //create query object to hold search value and category value
    const query = {}
    //assign search value to query.name

    if(req.query.search){
        query.name={$regex: req.query.search, $options: 'i'}
        //assign category value to query category
        if(req.query.product && req.query.product != 'All'){
            query.product = req.query.product
        }
        //find product based on query w/ 2 properties i.e search and category
        Item.find(query, (err, item) => {
            if(err){
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            res.json(item)
        }).select("-photo");
    }

}

// exports.getSearched = (req,res) => {

//     let order = req.body.order ? req.body.order : 'desc';
//     let sortwith = req.body.sortwith ? req.body.sortwith : '_id';
//     let max = req.body.max ? parseInt(req.body.max) : 50;

//     let skipitem = req.body.skip ? parseInt(req.body.skip) : 0; // So only 6 load initially and we can send more
//     let itemArray = {};

//     for (let key in req.body.queries) {
//         if (req.body.queries[key].length > 0) {
//             if (key === "price") {
//                 itemArray[key] = {
//                     $gte: req.body.filters[key][0],
//                     $lte: req.body.filters[key][1]
//                 };
//             }
//             else {
//                 itemArray[key] = req.body.filters[key];
//             }
//         }
//     }

//     Item.find(itemArray)
//         .select("-photo") // We don't want to return the photos, huge file size
//         .populate('productType')
//         .sort([[sortwith, order]])
//         .skip(skipitem)
//         .limit(max)
//         .exec((err,data) => {
//             if (err) {
//                 return res.status(400).json({error:err})
//             }
//             res.json({
//                 size: data.length,
//                 data
//             })
//         })

// }


exports.listBySearch = (req, res) => {
    let order = req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = parseInt(req.body.skip);
    let findArgs = {};
 
    // console.log(order, sortBy, limit, skip, req.body.filters);
    // console.log("findArgs", findArgs);
 
    for (let key in req.body.filters) {
        if (req.body.filters[key].length > 0) {
            if (key === "price") {
                // gte -  greater than price [0-10]
                // lte - less than
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                };
            } else {
                findArgs[key] = req.body.filters[key];
            }
        }
    }
 
    Item.find(findArgs)
        .select("-photo")
        .populate("productType")
        .sort([[sortBy, order]])
        .skip(skip)
        .limit(limit)
        .exec((err, data) => {
            if (err) {
                return res.status(400).json({
                    error: "Products not found"
                });
            }
            res.json({
                size: data.length,
                data
            });
        });
};
