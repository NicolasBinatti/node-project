const express = require('express');
const router = express.Router();

const authHelper = require('../helpers/auth');
const auth = require('../middlewares/auth')


router.get('/', auth, (req, res) => {
    return res.send({ message: "testing..." });
});

module.exports = router;