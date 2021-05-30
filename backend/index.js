var express = require("express")
var app = express()
var router = require("./src/routes/routes")
var db = require("./src/database/config")
var mongoose = require("mongoose")

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/", router);
mongoose.connect(db.uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.listen(8686, () => {
    console.log("Servidor rodando")
});

module.exports = app;