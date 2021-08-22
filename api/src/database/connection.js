const mongoose = require("mongoose");

mongoose.connect(process.env.BASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = mongoose;
