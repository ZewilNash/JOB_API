const User = require("../modals/User");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const register = async (req,res) => {

    user = await User.create({...req.body});

    const token = user.generateToken();
   
    res.status(201).json({user:{name:user.name,email:user.email},token , success:true});

}

const login = async (req,res) => {
    const {email,password} = req.body;
    
    if(!email || !password){
        return res.status(400).json({msg:"Please provide email and password"});
    }

    const user = await User.findOne({email});

    if(!user){
        return res.status(401).json({msg:"Invalid Credentials"});
    }

    // here compare passwords

    const isPassword = await user.comparePasswords(password);

    if(!isPassword){
        return res.status(401).json({msg:"Invalid Credentials"});
    }

    const token = user.generateToken();

    res.status(200).json({user:{name:user.name},token});
}


module.exports = {
    register,
    login
}