var express = require("express")
var router = express.Router();
var UserController = require("../controllers/UserController");

router.post('/user', UserController.create);

module.exports = router;