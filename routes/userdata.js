const express = require('express')
const router = express.Router()

const {findUser} = require('../controls/userdata');
const {signinrequired} = require('../controls/authentication'); // Use to restrict access to functions
const {isValidAuthUser} = require('../controls/authentication'); // Use to restrict access to functions, hide other profiles
const {isValidAdminUser} = require('../controls/authentication'); // Use to restrict access to functions to admins

const {read} = require('../controls/userdata'); 
const {update} = require('../controls/userdata')


router.param('userID',findUser);
// router.get("/userdata/:userID", signinrequired, isValidAdminUser, (req,res) => {
//         res.json({
//             userdata: req.profile
//         })
//     }
// );

router.get("/userdata/:userID",signinrequired, isValidAuthUser, read ); 
router.put("/userdata/:userID", signinrequired, isValidAuthUser, update);

module.exports = router;