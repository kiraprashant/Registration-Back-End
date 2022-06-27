const mongoose = require("mongoose")

const UserSchema = mongoose.Schema({
    Name:{
        type:String,
        required:[true , "Name is Required"]
    },
    Email:{
        type:String,
        required:[true , "Email is Required"],
        unique:[true,"Email is already Exists"]
    },
    Contact:{
        type:Number,
        required:[true , "Phone is Required"]
    },
    Password:{
        type:String,
        required:[true, "password is Required"]
    },
    Hobbies:[]
})

const UserModel = mongoose.model("Resgistration",UserSchema)

module.exports = UserModel