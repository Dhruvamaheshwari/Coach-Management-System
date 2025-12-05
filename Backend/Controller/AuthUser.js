
// import the user.js from model
const User = require('../model/user');


// This is for the Singup page;
//todo -> Singup is done only left is the jwt and password hash
exports.singup = async (req, res) => {
    try {
        // get data;
        const { first_name, last_name, email, password, role } = req.body;

        // to check user is already exist or not
        const userexist = await User.findOne({ email });

        if (userexist)
            return res.status(400).json({ succ: false, mess: 'user is already singup pls login' })

        const userCreate = await User.create({ first_name, last_name, email, password, role });
        return res.status(200).json({ succ: true, user: userCreate, mess: 'user is created' });
    } catch (err) {
        console.log(err)
        return res.status(500).json({ mess: err, suss: false });
    }
}

// This is for the Login page
//todo -> login is done only auth is left
exports.login = async (req, res) => {
    try {
        // get the data
        const { email, password } = req.body;

        // to check email is presnt or not in the database
        const userEnter = await User.findOne({ email });

        if (!userEnter)
            return res.status(400).json({ succ: false, mess: "you are not loign pls login first" })

        return res.status(200).json({ succ: true, mess: "user is login successfully", user: userEnter })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ succ: false, mess: err })
    }
}

