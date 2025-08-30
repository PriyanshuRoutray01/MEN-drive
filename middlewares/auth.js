const jwt=require('jsonwebtoken')
const jwt_Secret = process.env.JWT_SECRET;
function authe(req,res,next){
    const token= req.cookies.token
    console.log("Token received:", token);
console.log("JWT_SECRET loaded:", jwt_Secret);

    if(!token){
       return res.status(401).json({
            message:"unauthorized"
        })
    }
    try {
        const decoded=jwt.verify(token,jwt_Secret)
        req.user=decoded
        console.log("authed")
        return next();
    } catch (error) {
        return res.status(401).json({
            message:"unauthorized"
        })
        
    }
}
module.exports=authe