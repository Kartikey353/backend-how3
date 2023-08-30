const mongoose = require("mongoose");
require('dotenv').config(); 
console.log(process.env.NODE_ENV);
// const databaseURI =
//   process.env.NODE_ENV === "production"
//     ? process.env.PRODUCTION_DATABASE_URI
//     : process.env.TESTING_DATABASE_URI;  
const databaseURI = process.env.PRODUCTION_DATABASE_URI;
mongoose.connect(databaseURI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false, //to hide Deprecation warning message on console
  useUnifiedTopology: true,
});
