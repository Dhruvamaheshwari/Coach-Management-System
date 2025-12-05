const { Schema , model } = require("mongoose")

// create the new Schema for the user

const UserSchema = new Schema ({
    first_name:{
        type:String,
        require:true,
        trim:true,
    },
    last_name:{
        type:String,
        require:true,
        trim:true,
    },
    email:{
        type:String,
        require:true,
        trim:true,
    },
    password:{
        type:String,
        require:true,
    },
    role:{
        type:String,
        enum:["Admin" , "Maintainer"]
    }
})

// create the model;
const User = model("User" , UserSchema);

// export the model
module.exports = User;