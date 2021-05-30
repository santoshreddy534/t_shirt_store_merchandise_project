const { check, validationResult } = require("express-validator");
const express = require("express");
const router = express.Router();

/*Controller routes*/
const {
  signout,
  signup,
  signin,
  isSignedIn
} = require("../controllers/auth"); /* you have to import ex: signout 
                                                            from the controller to route to get access 
                                                            to it here*/

//signout
router.get(
  "/signout", signout
);

//signup
router.post(
  "/signup",
  [
    //name
    check("name")
      .isLength({ min: 3 })
      .withMessage("name must be at least 3 chars long"),
    //email
    check("email").isEmail().withMessage("Email is required"),
    //password
    check("password")
      .isLength({ min: 8 })
      .withMessage("must be at least 5 chars long")
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, "i")
      .withMessage(
        "must contain a number, a uppercase, a lowercase and special character"
      ),
  ],
  signup
);

//signin
router.post(
  "/signin",
  [
    
    //email
    check("email").isEmail().withMessage("Email is required"),
    //password
    check("password")
      .isLength({ min: 8 })
      .withMessage("must be at least 8 chars long")
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, "i")
      .withMessage(
        "must contain a number, a uppercase, a lowercase and special character"
      ),
  ],
  signin
);


module.exports = router;
