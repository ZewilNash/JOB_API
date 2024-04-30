const {StatusCodes} = require("http-status-codes")

const errorHandlerMiddleWare = (err,req,res,next) => {
    
    // console.log(err);

  
    if(err.code && err.code === 11000){
        return res.status(400).json({msg:`Duplicate value entered for ${Object.keys(err.keyValue)} field,please choose another value` , success:false});
    }
    
    if(err.name === "ValidationError"){
        res.status(400).json({msg:Object.values(err.errors).map(item => item.message).join(",") , success:false});
    }

    if(err.name === "CastError"){
        res.status(404).json({msg:`No Item Found with id: ${err.value}` , success:false});
    }
    
    res.status(500).json({msg:"Something went wrong, try again later" , success:false});
}


module.exports = errorHandlerMiddleWare;