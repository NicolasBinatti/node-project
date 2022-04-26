const jwt = require('jsonwebtoken');
require('dotenv').config();

const passJwt = process.env.KEY_JWT;

const createToken = (userId) => {
    return jwt.sign({ id: userId }, passJwt, { expiresIn: '7d' });
}

module.exports = {
    jwt,
    passJwt,
    createToken,
};