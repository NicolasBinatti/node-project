const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth')
const UsersController = require('../controllers/users')

router.get('/', auth, UsersController.list);
router.get('/:id', auth, UsersController.find);
router.post('/', auth, UsersController.create);
router.delete('/:id', auth, UsersController.delete);

router.post('/auth', UsersController.login);

module.exports = router;