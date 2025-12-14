// import the router from the express
const express = require('express')
const router = express.Router();

// import the AuthCoach.js from the Controller
const {CoachData , allCoachData} = require('../Controller/AuthCoach')

// to create the route
router.post('/coachdata' , CoachData);
router.get('/allcoach' , allCoachData)

// to export the router
module.exports = router