const User = require("../models/user");

/**get user by id */
exports.getUserById = (req, res, next, id)=>{
    User.findById(id).exec((err, user)=>{
        if(err || !user){
            return res.status(400).json({
                error: "No user was found in DB"
            })
        }
        req.profile = user; //stored user into req.profile which is frontend //actually we stored it into req object but added 
                                                        //profile to req object  i.e req.profile
        next();
    })
}

/**get users */
exports.getUser = (req, res)=>{
    req.profile.salt = undefined;
    req.profile.encry_password = undefined;
    req.profile.createdAt = undefined;
    req.profile.updatedAt = undefined;
    return res.json(req.profile)
} 

/**update user PUT */
exports.updateUser = (req, res)=>{
    User.findByIdAndUpdate(
        {_id: req.profile._id},
        {$set: req.body},
        {new: true, useFindAndModify: false},
        (err, user)=>{
            if(err || !user){
                res.status(400).json({
                    error: "You are not authorised to update this user"
                })
            }
            user.salt = undefined;
            user.encry_password = undefined;
            res.json(user)
        }
    )
}