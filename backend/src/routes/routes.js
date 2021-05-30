var express = require("express")
var app = express();
var router = express.Router();
var UserController = require("../controllers/UserController");

router.get('/', UserController.index);

module.exports = router;