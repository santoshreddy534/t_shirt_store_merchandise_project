require("dotenv").config();
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");

//getting models from models files
const User = require("../models/user");

//signup
exports.signup = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }

  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        err: "Not able to save user in DB",
      });
    }
    res.json({
      name: user.name,
      email: user.email,
      id: user._id,
    });
  });
};

//sigin
exports.signin = (req, res) => {
  const { email, password } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }

  User.findOne({ email }, (err, user) => {
    if (err || !user) {
     return res.status(400).json({
        error: "USER Email does not exist",
      });
    }
    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "Email and Password do not match",
      });
    }

    //create token- here we are creating token based on user._id
    const token = jwt.sign({ _id: user._id }, process.env.SECRET);
    //put token in cookie. we also named cookie as "token"
    res.cookie("token", token, {expire: new Date() + 9999});
    //send response to front end
    const {_id, name, email, role} = user
    res.json({token, user: {_id, name, email, role}})
  });
};

//signout
exports.signout = (req, res) => {
    res.clearCookie("token")
    res.json({
    message: "user signout successfully",
  });
};


//protected Routes

//isSignedIn                       /**here user._id === auth._id */
exports.isSignedIn = expressJwt({ /** we have used express-jwt here to protect the routes **/
  secret: process.env.SECRET,
  userProperty:"auth"             /* we used auth in checker in isAuthenticated also*/
})

//custom middleware

//isAuthenticated
exports.isAuthenticated = (req, res, next)=>{
/* checker checks if the user is authenticated or not */
 const checker = req.profile && req.auth && req.profile._id == req.auth._id;                           /*through the frontend we will make an property 
                                                                                                        inside the user called profile and it will only be
                                                                                                        set if the user logs in. note: here req.profile._id is for
                                                                                                        profile prop we set in frontend. ultimately we are checking 
                                                                                                        if the account belongs to the user or not */
  
  if(!checker){
    return res.status(403).json({
      error: "ACCESS DENIED"
    });
  }
  next();
}

//isAdmin
exports.isAdmin = (req, res, mext) =>{
  if(req.profile.role === 0){
    return res.status(403).json({
      error: "You are not an Admin, Access Denied"
    })
  }
  next();

}