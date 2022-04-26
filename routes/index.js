const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    return res.send({ message: "Application it's working!" });
});

module.exports = router;