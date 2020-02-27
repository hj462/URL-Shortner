const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        console.log(req.headers.authorization)
        const token = req.headers.authorization.split(' ')[1];
        const verified_token = jwt.verify(token, 'secretKey');
        next();

    }catch(erro){
        return res.status(400).json({
            "message": "Auth Failed"
        });
    }
}