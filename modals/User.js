const mongoose = require("mongoose");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
    name:{
        
        type:String,
        required:[true , "Please provide name"],
        trim:true,
        minlength:3,
        maxlength:50
    },
    email:{
        
        type:String,
        required:[true , "Please provide email"],
        trim:true,
        match:[
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide valid email'
        ],

        unique:true

    },
    password:{
        
        type:String,
        required:[true , "Please provide password"],
        trim:true,
        minlength:6,
        maxlength:100,
    },

} , {timestamps:true});

UserSchema.pre("save" , async function (next) {
    const salt = await bcrypt.genSalt(10);
    
    this.password = await bcrypt.hash(this.password , salt);

    next();
});

UserSchema.methods.generateToken = function () {
    return jwt.sign({userId:this._id , name:this.name} , process.env.JWT_SECRET , {
        expiresIn:"30d"
    });
}

UserSchema.methods.comparePasswords = async function (userPassword) {
    const isMatch =  bcrypt.compare(userPassword , this.password);  

    return isMatch;
}

module.exports = mongoose.model("User" , UserSchema);