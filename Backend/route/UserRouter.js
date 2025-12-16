// import the express
const express = require('express')
const router = express.Router();


// import the AuthUser.js from the Controller
const {singup , login , logout} = require("../Controller/AuthUser");

// to create the route
router.post("/singup" , singup);
router.post("/login" , login)
router.post("/logout" , logout)

// export the router
module.exports = router