const express = require('express') 
const router = express.Router() 

const {signup} = require('../controls/authentication');
const {signin} = require('../controls/authentication');
const {signout} = require('../controls/authentication');
const {signinrequired} = require('../controls/authentication'); // Use to restrict access to functions
const {signupValidator} = require('../design/validator');


//const {trial} = require('../controls/client');

//router.get("/",trial )
router.get('/signout', signout)
router.post('/signup', signupValidator, signup);
router.post('/signin', signin);

/*
//router.get('/hello', signupValidator, hello) --> only works for signed in users
router.get('/hello', signinrequired, (req,res) => {
      res.send('hello there')
});
 */

module.exports = router; 