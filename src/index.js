const express = require("express");
require("./db/mongoose");
const userRouter = require("./routers/user");
const ratingRouter = require("./routers/rating");
const cors = require("cors"); // Import the cors middleware
const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors()); // Use the cors middleware to enable CORS for all routes
app.use(userRouter);
app.use(ratingRouter);

app.listen(port, () => {
  console.log(`Server is up on ${port}`);
});

module.exports = app;
