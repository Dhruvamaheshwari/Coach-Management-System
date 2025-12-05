// import the express
const express = require('express')
const router = express.Router();


// import the AuthUser.js from the Controller
const {singup} = require("../Controller/AuthUser");

// to create the route
router.post("/singup" , singup);



// export the router
module.exports = router