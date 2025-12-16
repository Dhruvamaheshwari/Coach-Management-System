const jwt = require('jsonwebtoken')

require('dotenv').config();

exports.auth = (req, res) => {
    try {
        const token = req.cookies.token;
        //  console.log("REQ COOKIES ", req.cookies);

        if (!token) {
            return res.status(401).json({ success: false, message: "token is not found" })
        }

        // very the token
        try {
            // yee eek method h jo token ko verify krta h
            const payload = jwt.verify(token, process.env.JWT_TOKEN);
            // console.log(payload);
            // req.user = payload;
            return res.status(200).json({
                loggedIn: true,
                user: payload,
            });



        } catch (err) {
            return res.status(401).json({ success: false, message: "token is invalid" })
        }
    } catch (err) {
        return res.status(500).json({ success: false, message: "something went wrong" })
    }
}