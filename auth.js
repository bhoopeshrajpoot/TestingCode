const auth = (req,res,next)=>{

    if("authorization" in req.body){
        next();
    }else{
        res.send("Invalid User").status(401);
    }

}

module.exports = auth;