const jwt = require('jsonwebtoken');

function auth(req,res,next){

    const token = req.cookies.token;
    console.log('cookie');
    
    if(!token) return res.sendStatus(401);

    try {
        req.user = jwt.verify(token , process.env.Secret);
        next();


    } catch (error) {
        console.log({message : "error in auth middleware"} , error)
        return res.sendStatus(401);
    }


}
module.exports = auth