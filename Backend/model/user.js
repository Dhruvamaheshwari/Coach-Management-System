const { Schema, model } = require("mongoose")

// create the new Schema for the user

const UserSchema = new Schema({
    first_name: {
        type: String,
        require: true,
        trim: true,
    },
    last_name: {
        type: String,
        require: true,
        trim: true,
    },
    email: {
        type: String,
        require: true,
        trim: true,
    },
    password: {
        type: String,
        require: true,
    },
    role: {
        type: String,
        enum: ["admin",
            "mechanical",
            "electrical",
            "signal_telecom",
            "carriage_wagon",
            "traction",
            "operations",
            "engineering",
            "railway_safety",
            "maintenance"],
        require: true,
    },
    Railway_Id: {
        type: String,
        require: true,
    },
    // TIME TRACKING
    lastLoginAt: Date,
    lastLogoutAt: Date,
    totalWorkTime: {
        type: Number, // in milliseconds
        default: 0,
    },
    status: {
        type: String,
        enum: ["online", "offline"],
        default: "offline",
    },
})

// create the model;
const User = model("User", UserSchema);

// export the model
module.exports = User;