const res = require('express/lib/response');
const jwt = require('jsonwebtoken');
const {JWT_SECRET_KEY, TOKEN_EXPIRATION_DURATION} = require('../constants')

function generatingSessionToken (userId) {
    return jwt.sign( {userId}, JWT_SECRET_KEY,{
        expiresIn: TOKEN_EXPIRATION_DURATION,
    })
}

function decodingSessionToken(req, res, next) {
    try {
        const sessionToken = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(sessionToken, JWT_SECRET_KEY);
        
        console.log(decodedToken);
        req.decodedSessionToken = sessionToken;
        
        next();

    } catch( err ) {
        res.status(401).json({
            message : 'Invalid Token'
        })
    }
}

module.exports = {
    generatingSessionToken,
    decodingSessionToken
};