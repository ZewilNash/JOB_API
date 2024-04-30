// fn ===> controller

const asyncWrapper = (fn) => {
    return async (req,res,next) => {
        try {
            // controller logic
          await fn(req,res,next);
          
        }catch(err){
            next(err);
        }
    }
}


module.exports = asyncWrapper