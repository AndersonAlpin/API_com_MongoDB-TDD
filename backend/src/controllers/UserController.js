const User = require('../models/User')

class UserController {

    async index(req, res) {
        res.json({})
    }

    async create(req, res) {
        try {
            let newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            })

            await newUser.save();
            res.json({ email: req.body.email })
        } catch (err) {
            res.sendStatus(500);
        }
    }
}

module.exports = new UserController();