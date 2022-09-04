const jwt = require("jsonwebtoken");

const fetchUser =async (req,res,next)=>{

    const token = req.header('auth-token')

    if(!token){
        return res.status(401).send({error:"please authenticate using valid token"})
    }
try {

    const data = await jwt.verify(token,"hii guys")
    req.user = data.user

} catch (error) {
    res.status(401).send({error:"please authenticate using valid token"})
}
next()

}

module.exports = fetchUser