const client = require('../design/userdata');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const { errorHandler } = require('../design/error_handling')

exports.signup = (req, res) => {
    console.log("req.body", req.body)
    const customer = new client(req.body)
    customer.save((err, customer) => {
        if (err){
           return res.status(400).json({err});
        }
        res.json({
            customer
        });
    });
};

exports.trial = (req, res) => {
    res.json({message: "hello"});
};

exports.signin = (req, res) => {
    const {email, password} = req.body
    client.findOne({email}, (err, customer) => {
        if (err || !customer){
            return res.status(400).json({
                error: 'User with email do not exist.'
            });
        }

        if (!customer.compare(password)){
            return res.status(401).json({error : "Wrong password"})
        }
    

        const token = jwt.sign({_id: customer._id}, process.env.JWT_SECRET);
        res.cookie('token', token, {expire: new Date() + 9999})

        const {_id, name, email, role} = customer;
        return res.json({token, customer: {_id, email , name , role}});
    });
};

exports.signout = (req,res) => {
    res.clearCookie('token');
    res.json({message:'User successfully signed out'});
};

const secretstring = process.env.JWT_SECRET || 'abc';
exports.signinrequired = expressJwt({
        secret: secretstring,
        algorithms: ['HS256'],
        userProperty: 'auth'
    }
);

exports.isValidAuthUser = (req,res,next) => {
    let check = req.profile && req.auth && req.profile._id == req.auth._id;
    if (!check) {
        return res.status(403).json({error:'You are not authorised to view this!'});
    }
    next();
};

exports.isValidAdminUser = (req,res,next) => {
    if (req.profile.role === 0) {
        return res.status(403).json({error:'Not a valid admin user, access denied'});
    }
    next();
};

