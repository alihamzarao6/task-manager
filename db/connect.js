const mongoose = require("mongoose");

const dbConn = (url) => {
  return mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = dbConn;
