
// import the user.js from model
const User = require('../model/user');

exports.singup = async(req , res) =>{
    try{
        // get data;
        const {first_name , last_name , email , password , role} = req.body;

        // to check user is already exist or not
        const userexist = await User.findOne({ email });
        
        if(userexist)
            return res.status(400).json({succ:false ,mess:'user is already singup pls login'})

        const userCreate = await User.create({first_name , last_name , email , password , role});
            return res.status(200).json({succ:true , user:userCreate , mess:'user is created'});
    }catch(err){
        console.log(err)
        return res.status(500).json({mess: err , suss:false });
    }
}
