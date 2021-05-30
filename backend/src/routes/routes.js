var express = require("express")
var app = express();
var router = express.Router();
var UserController = require("../controllers/UserController");

router.get('/', UserController.index);
router.post('/user', UserController.create);

module.exports = router;