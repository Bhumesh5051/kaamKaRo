import jwt from "jsonwebtoken"

const protectroute =(req,res,next) =>{
    console.log("cookie recived ",req.cookies  );
    
  try{ const token = req.cookies.token
    if(!token){
        return res.status(400).json({
            message:"not authorized"
        })}
    const verifieduser = jwt.verify(token,process.env.JWT_SECRET)
    if(!verifieduser){return res.status(400).json({
            message:"not authorized"
        })}
    req.user = verifieduser
    next()}catch (error) {
        console.log("error try again later",error);
        res.status(500).json({
            message:'internal server error'
        })
    }
}

export default protectroute
