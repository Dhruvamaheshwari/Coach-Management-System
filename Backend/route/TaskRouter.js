// import the router from the express
const express = require('express')
const router = express.Router();

// import the AuthTask.js from the Controller
const {TaskData , AllTask , DeleteTask} = require('../Controller/AuthTask')


// to create the route
router.post('/taskdata' , TaskData);
router.get('/alltaskdata' , AllTask);
router.delete('/deletetask/:id', DeleteTask);

// to export the router
module.exports = router