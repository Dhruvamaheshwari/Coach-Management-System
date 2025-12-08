// import the router from the express
const express = require('express')
const router = express.Router();

// import the AuthCoach.js from the Controller
const {CoachData} = require('../Controller/AuthCoach')

// to create the route
router.post('/coachdata' , CoachData);

// to export the router
module.exports = router