const express = require('express') 
const router = express.Router() 

const {create, findItem, read, del, write, listItems, listRelated, listProductTypes, photo, listBySearch, getSearched, listSearch} = require("../controls/item");
const {signinrequired} = require("../controls/authentication");
const {isValidAuthUser} = require("../controls/authentication"); 
const {isValidAdminUser} = require("../controls/authentication");


const {findUser} = require('../controls/userdata');

router.get('/items', listItems)
router.get('/items/related/:itemID', listRelated)
router.get('/items/producttypes', listProductTypes)

router.get('/items/photo/:itemID', photo)

router.post('/items/by/search', listBySearch)
router.get('/items/search', listSearch)

router.get("/item/:itemID", read)
router.post("/item/create/:userID", signinrequired, isValidAuthUser, isValidAdminUser, create)
router.delete("/item/:itemID/:userID", signinrequired, isValidAuthUser, isValidAdminUser, del)
router.put("/item/:itemID/:userID", signinrequired, isValidAuthUser, isValidAdminUser, write)


router.param('userID',findUser);
router.param('itemID', findItem)

module.exports = router; 