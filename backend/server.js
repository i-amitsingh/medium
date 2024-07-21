const connect = require("./connect");
const express = require("express");
const cors = require("cors");
const posts = require("./postRoutes");
const users = require("./userRoutes");

const app = express();
const port = process.env.PORT || 3000;

// middlewares
app.use(cors());
app.use(express.json());
app.use(posts);
app.use(users);

// app is listening on port 5000 and connecting to the database
app.listen(port, () => {
  connect.connectToServer();
  console.log(`Server is running on port: ${port}`);
});
