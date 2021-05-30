const express = require("express");
const router = express.Router();

const { getUserById, getUser, updateUser } = require("../controllers/user");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");

router.param("userId", getUserById);

//get user
router.get("/user/:userId", isSignedIn, isAuthenticated, getUser);

//update user
router.put("/user/:userId", isSignedIn, isAuthenticated, updateUser);

module.exports = router;
