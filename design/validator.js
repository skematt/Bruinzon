exports.signupValidator = (req, res, call) => {
    req.check('name' , 'Non-empty name').notEmpty();
    req.check('email', 'Required valid email').notEmpty(); 
    req.check('email', 'Require valid email').matches(/.+\@.+\..+/)
        .withMessage("Invalid email, email does not containt @"); 

    req.check('password' , 'Password is invalid, possibly empty').notEmpty(); 
    req.check('password').isLength({min:3}).withMessage("Password is too short"); 

    const errors = req.validationErrors()

    if (errors){
        let err = errors.map(error => error.msg)[0];
        return res.status(400).json({error: err}); 
    }
    call();
};