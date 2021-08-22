var express = require("express");
var router = express.Router();
var UserController = require("../controllers/UserController");

router.get("/user", UserController.findAll);
router.post("/user", UserController.create);
router.delete("/user/:email", UserController.delete);
router.post("/auth", UserController.auth);

module.exports = router;
