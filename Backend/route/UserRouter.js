// import the express
const express = require('express')
const router = express.Router();


// import the AuthUser.js from the Controller
const {singup , login} = require("../Controller/AuthUser");

// to create the route
router.post("/singup" , singup);
router.post("/login" , login)

// export the router
module.exports = router