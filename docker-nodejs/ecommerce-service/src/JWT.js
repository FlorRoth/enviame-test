const {sign, verify} = require("jsonwebtoken");

const createTokens = (user) => {
    const accessToken = sign(
        {email: user.email, id: user.id},
        process.env.JWT_SECRET
    );

    return accessToken;
}

const validateTokens = (req,res,next) => {
    const accessToken = req.cookies["access-token"];

    if(!accessToken){
        return res.status(400).json({
            error: "Usuario no autenticado"
        });
    }
    try {
        const validToken = verify(accessToken,process.env.JWT_SECRET);
        if(validToken){
            req.authenticated = true;
            return next();
        }
        
    } catch(error) {
        return res.status(400).json({error: error})
    }

    return accessToken;
}

module.exports = {createTokens, validateTokens}