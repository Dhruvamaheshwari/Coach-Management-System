const express = require("express")
const app = express()

// import the Port into the .env file;
require('dotenv').config();
const port = process.env.PORT || 4000;


// call the dbconnect function to connect the mongoDB
const dbconnect = require('./Config/db');
dbconnect();


// use the pre-build Middleware
app.use(express.json());


//!___________________________TO connect the frontend________________________________
// to connect the frontend and backend usign the CORS
// import the CORS
const cors = require('cors');
app.use(cors({
    origin:'http://localhost:5173',
    credentials: true,
}))

// import the router and mount
const UserRouter = require("./route/UserRouter");
const TaskRouter = require("./route/TaskRouter");
const CoachRouter = require("./route/CoachRouter");
app.use('/api/v1' , UserRouter);
app.use('/api/v1' , TaskRouter);
app.use('/api/v1' , CoachRouter);

// this is the default router
app.get('/' , (req , res)=>{
    res.send('hello jiii kya haal chaal')
})

// server start
app.listen(port , ()=> console.log(`server is started at ${port}`))