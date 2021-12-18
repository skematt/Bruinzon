const user = require('../design/userdata');



exports.findUser = (req,res,next,userID) => {
    user.findById(userID).exec((err,userdata) =>{
            if (err || !user) {
                return res.status(400).json({error: "User not found"})
            }
            req.profile = userdata;
            next(); // so this is middleware
        }
    )
}

exports.read = (req, res) => {
    return res.json(req.profile);
    
}

exports.update = (req, res) => {
    user.findOneAndUpdate({_id: req.profile._id}, {$set: req.body}, {new : true}, (err, userProfile) => {
        if (err){
            return res.status(400).json({
                error : "No user, wrong user selected"
            })
        }
        res.json(userProfile)
    })
}