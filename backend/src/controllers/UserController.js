const User = require('../models/User')

class UserController {

    async create(req, res) {

        if(req.body.name == "" || req.body.email == "" || req.body.password == ""){
            res.sendStatus(400);
            return;
        }

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