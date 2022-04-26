const authHelper = require('../helpers/auth');

const auth = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.send({ error: 'Token Invalido!' });
    }
    authHelper.jwt.verify(token, authHelper.passJwt, (err, decoded) => {
        if (err) {
            return res.send({ error: 'Token Invalido' });
        }
        res.locals.auth_data = decoded;
        return next();
    });
}

module.exports = auth;