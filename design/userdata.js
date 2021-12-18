const mongoose = require('mongoose')
const crypto = require('crypto'); // hash password, library from node.js
const { PassThrough } = require('stream');
//const id = require('uuid/v1')

const clientSchema = new mongoose.Schema({
    name : {
        type : String,
        trim : true, 
        required : true, 
        maxlength : 64
    },
    email : {
        type : String,
        trim : true, 
        required : true, 
        unique : 64
    },
    password : {
        type : String, 
        required : true, 
        trim : true, 
        maxlength : 64


    }, 

    profile: {
        type: String, 
        trim : true
    }, 

    hashing : String, 
    role : {
        type : Number, 
        default : 0
    }, 

    history: {
        type : Array, 
        default : []
    }

    
},  {timestamps: true});

// hashed password

// clientSchema.virtual('password')
// .set(function(password){
//     this._password = password
//     this.hashing = uuidv1()
//     this.hashed_password = this.encryptPassword(password)
// })
// .get(function(){
//     return this._password
// })

clientSchema.methods = {
    compare: function(pass){
        return pass === this.password;
    }
}

// clientSchema.methods = {
//     encryptPassword: function(password){
//         if (!password){
//             return ''; 
//         }
//         try{
//             return crypto.createHmac('sha1', this.hashing)
//                         .update(password)
//                         .digest('hex')
//         } catch (err){
//             return  ''; 
//         }
//     }
// }

module.exports = mongoose.model("Client", clientSchema)