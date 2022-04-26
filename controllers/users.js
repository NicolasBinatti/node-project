const usersModel = require('../models/user')
const authHelper = require('../helpers/auth')
const bcrypt = require('bcrypt');

module.exports = {

    // List All
    list: async (req, res) => {
        const users = await usersModel.find({});
        if (!users) return res.send({ error: 'Users not found' });
        return res.send(users);
    },

    // List One
    find: async (req, res) => {
        const { id } = req.params;

        if (!id) return res.send({ error: 'User id invalid' });
        await usersModel.find({ _id: id }).exec((e, post) => {
            if (e || !post) return res.send({ error: 'User not found' });
            return res.send(post);
        });
    },

    // Create a new one
    create: async (req, res) => {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.send({ error: 'Invalid email and password!' });
        }
        if (await usersModel.findOne({ email })) {
            return res.send({ error: 'User already registered!' });
        }

        const user = await usersModel.create(req.body);
        user.password = undefined;
        return res.send({ user, token: authHelper.createToken(user.id) });
    },

    // Make authenticate
    login: async (req, res) => {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.send({ error: 'Invalid email and password!' });
        }

        const user = await usersModel.findOne({ email }).select('+password');
        if (!user) {
            return res.send({ error: 'User not registered!' });
        }

        const pass_ok = await bcrypt.compare(password, user.password);
        if (!pass_ok) {
            return res.send({ error: 'The password is not correct!' });
        }

        user.password = undefined;
        return res.send({ token: authHelper.createToken(user.id) });
    },

    //Delete one
    delete: async (req, res) => {
        const { id } = req.params;
        await usersModel.findOneAndRemove({ _id: id }).exec((err, post) => {
            if (post == null) {
                return res.send({ error: 'User not found.' });
            }
            if (err) {
                return res.send({ error: 'Failed to delete :' + err });
            }
            res.status(200).json({ message: 'User deleted !' })
        });

    }

}
