const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWTSecret = "sadcl,0fa9e&*iur#09ajiu$89aju@sdf89i";

class UserController {
  async findAll(req, res) {
    let users = await User.find();
    if (!users) {
      return res.json({ message: "No users found" });
    }
    res.json({ users });
  }

  async create(req, res) {
    if (
      req.body.name == "" ||
      req.body.email == "" ||
      req.body.password == ""
    ) {
      res.sendStatus(400);
      return;
    }

    try {
      let user = await User.findOne({ email: req.body.email });

      if (user != undefined) {
        res.statusCode = 400;
        res.json({ error: "Email já cadastrado." });
        return;
      }

      let password = req.body.password;
      let salt = await bcrypt.genSalt(10);
      let hash = await bcrypt.hash(password, salt);

      let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: hash,
      });

      await newUser.save();
      res.json({ email: req.body.email });
    } catch (err) {
      res.sendStatus(500);
    }
  }

  async auth(req, res) {
    let { email, password } = req.body;

    let user = await User.findOne({ email });

    if (user == undefined) {
      res.statusCode = 403;
      res.json({ errors: { email: "Email não cadastrado." } });
      return;
    }

    let isPasswordRight = await bcrypt.compare(password, user.password);

    if (!isPasswordRight) {
      res.statusCode = 403;
      res.json({ errors: { password: "Senha incorreta." } });
      return;
    }

    jwt.sign(
      { email, name: user.name, id: user._id },
      JWTSecret,
      { expiresIn: "48h" },
      (err, token) => {
        if (err) {
          res.sendStatus(500);
          console.log(err);
        } else {
          res.json({ token });
        }
      }
    );
  }

  async delete(req, res) {
    await User.deleteOne({ email: req.params.email });
    res.sendStatus(200);
  }
}

module.exports = new UserController();
