const mongoose = require('mongoose')
const crypto = require('crypto'); // hash password, library from node.js
const { PassThrough } = require('stream');
//const id = require('uuid/v1')

const productSchema = new mongoose.Schema({
    name : {
        type : String,
        trim : true, 
        required : true, 
        maxlength : 64,
        unique : true
    }


    
},  {timestamps: true});


module.exports = mongoose.model("Product", productSchema)