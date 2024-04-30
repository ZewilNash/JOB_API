const User = require("../modals/User");

const jwt = require("jsonwebtoken");

const authenticateUser = async (req,res,next) => {
    const userToken = req.headers.authorization;

    if(!userToken || !userToken.startsWith("Bearer ")){
        return res.status(401).json({success:false , msg:"Unauthorized Invalid"});
    }

    const token = userToken.split(" ")[1];

    try {
        const payload = await jwt.verify(token , process.env.JWT_SECRET);

        const user = {
            userId:payload.userId,
            name:payload.name
        }
    
        req.user = user;

        next();

    }catch(err){
        return res.status(401).json({success:false , msg:"Unauthorized Invalid"});
    }

}


module.exports = authenticateUser;