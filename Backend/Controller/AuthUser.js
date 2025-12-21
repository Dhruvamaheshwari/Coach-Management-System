
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
    // 1️⃣ Get data from request body
    const { email, password } = req.body;

    // 2️⃣ Check if user exists
    const userEnter = await User.findOne({ email });
    if (!userEnter) {
      return res.status(400).json({
        success: false,
        message: "Please create your account",
      });
    }

    // 3️⃣ Compare password
    const match = await bcrypt.compare(password, userEnter.password);
    if (!match) {
      return res.status(401).json({
        success: false,
        message: "Incorrect password",
      });
    }

    // 4️⃣ Create JWT payload
    const payload = {
      id: userEnter._id,
      email: userEnter.email,
      role: userEnter.role,
    };

    // 5️⃣ Generate JWT token
    const token = jwt.sign(payload, process.env.JWT_TOKEN, {
      expiresIn: "2h",
    });

    // 6️⃣ Prepare user object (remove password)
    const userobj = userEnter.toObject();
    userobj.password = undefined;
    userobj.token = token;

    // 7️⃣ Cookie options
    const options = {
      httpOnly: true,
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    };

    // 8️⃣ Send response
    return res
      .cookie("token", token, options)
      .status(200)
      .json({
        success: true,
        message: "User logged in successfully",
        token,
        userobj,
      });

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Server error during login",
    });
  }
};


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