const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema

const itemSchema = new mongoose.Schema({
    name : {
        type : String,
        trim : true, 
        required : true, 
        maxlength : 64
    }, 
    description : {
        type : String,
        required : true, 
        maxlength : 1300
    },
    price : {
        type : Number,
        trim : true,
        required : true, 
        maxlength : 10
    },
    productType : {
        type : ObjectId,
        ref : 'Product',
        required: true
    }, 
    quantity : {
       type : Number
    },
    numberSold : {
        type : Number,
        default : 0
    },
    photo : {
        data : Buffer, 
        contentType: String
    },
    validShipping: {
        required : true, 
        type : Boolean
    }
    
},  {timestamps: true});

module.exports = mongoose.model("Item", itemSchema)