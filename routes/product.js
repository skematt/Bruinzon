const express = require('express') 
const router = express.Router() 

const {create, findProduct, read, write, del, all} = require("../controls/product");
const {signinrequired} = require("../controls/authentication");
const {isValidAuthUser} = require("../controls/authentication"); 
const {isValidAdminUser} = require("../controls/authentication"); 

const {findUser} = require('../controls/userdata');



router.post("/product/create/:userID", signinrequired, isValidAuthUser, isValidAdminUser, create)

router.get("/product/:productID", read)
router.put("/product/:productID/:userID", signinrequired, isValidAuthUser, isValidAdminUser, write)
router.delete("/product/:productID/:userID", signinrequired, isValidAuthUser, isValidAdminUser, del)
router.get("/products", all)

router.param('userID',findUser);
router.param('productID', findProduct)


module.exports = router; 