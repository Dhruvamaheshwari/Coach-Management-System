
// import the user.js from model
const User = require('../model/user');

// use bcrypt for the the password hashing
const bcrypt = require('bcrypt');

// import the jwt tocken for jsonwebtoken
const jwt = require('jsonwebtoken');

// we can load the serate key from the .env {JWT_SECRET}
require('dotenv').config();


// This is for the Singup page;
exports.singup = async (req, res) => {
    try {
        // get data;
        const { first_name, last_name, email, password, role } = req.body;

        // to check user is already exist or not
        const userexist = await User.findOne({ email });

        if (userexist)
            return res.status(400).json({ succ: false, mess: 'user is already singup pls login' })

        // secure password
        let hashpassword;
        try{
            hashpassword = await bcrypt.hash(password , 10); // this is for the password hasing usig 10 roation
        }catch(err){
            return res.status(501).json({ success: false, message: "error in hashing in password" })
        }

        //  create the user in the database [ using the function ( .create ) ]
        const userCreate = await User.create({ first_name, last_name, email, password:hashpassword, role });
        return res.status(200).json({ succ: true, user: userCreate, mess: 'user is created' });
        
    } catch (err) {
        console.log(err)
        return res.status(500).json({ mess: err, suss: false });
    }
}

// This is for the Login page
exports.login = async (req, res) => {
    try {
        // get the data
        const { email, password } = req.body;

        // to check email is presnt or not in the database
        const userEnter = await User.findOne({ email });

        if (!userEnter)
            return res.status(400).json({ succ: false, mess: "you are not loign pls login first" })

        // create the payload
        const payload = {
            email:userEnter.email,
            id:userEnter._id,
            role:userEnter.role,
        }

        // to decode the password using the compare  fun. and match the password
        const match = await bcrypt.compare(password , userEnter.password);
        if(match)
        {
            // to creat the jwt token
            let token = jwt.sign(payload , process.env.JWT_TOKEN , {expiresIn:'2h'})

            // to creatr the object of token to intreact the mongoDB
            const userobj = userEnter.toObject();
            userobj.token = token;
            userobj.password = null;

            const option = {
                expires:new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly:true,
            }
            return res.cookie("token" , token , option).status(200).json(
                {success:true , 
                token , 
                userobj ,
                message:"User logged In"})
                    
        }
        else
        {
             return res.status(500).json({success:false , message:"Incorrect password"})
        }
    } catch (err) {
        console.log(err)
        return res.status(500).json({ succ: false, mess: err })
    }
}

// Log out route
exports.logout = (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
    });

    return res.status(200).json({
        success: true,
        message: "Logged out successfully",
    });
};