// import express and the database connection
const express = require("express");
const database = require("./connect");
const ObjectId = require("mongodb").ObjectId;
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "./config.env" });

let postRoutes = express.Router();

// GET all posts
// http://localhost:3000/posts

postRoutes.route("/posts").get(verifyToken, async (req, res) => {
  let db = database.getDb();
  let data = await db.collection("posts").find({}).toArray();
  if (data.length > 0) {
    res.json(data);
  } else {
    throw new Error("No posts found");
  }
});

// GET a single post by ID
// http://localhost:3000/posts/1

postRoutes.route("/posts/:id").get(verifyToken, async (req, res) => {
  let db = database.getDb();
  let data = await db
    .collection("posts")
    .findOne({ _id: new ObjectId(req.params.id) });
  if (Object.keys(data).length > 0) {
    res.json(data);
  } else {
    throw new Error("No posts found !");
  }
});

// POST a new post
// http://localhost:3000/posts

postRoutes.route("/posts").post(verifyToken, async (req, res) => {
  let db = database.getDb();
  let mongoObject = {
    title: req.body.title,
    description: req.body.description,
    content: req.body.content,
    author: req.body.user._id,
    authorID: req.body.user.name,
    dateCreated: req.body.dateCreated,
  };
  let data = await db.collection("posts").insertOne(mongoObject);
  res.json(data);
});

// PUT a post(update)
// http://localhost:3000/posts/1

postRoutes.route("/posts/:id").put(verifyToken, async (req, res) => {
  let db = database.getDb();
  let mongoObject = {
    $set: {
      title: req.body.title,
      description: req.body.description,
      content: req.body.content,
      author: req.body.author,
      dateCreated: req.body.dateCreated,
    },
  };
  let data = await db
    .collection("posts")
    .updateOne({ _id: new ObjectId(req.params.id) }, mongoObject);
  res.json(data);
});

// DELETE a post
// http://localhost:3000/posts/1

postRoutes.route("/posts/:id").delete(verifyToken, async (req, res) => {
  let db = database.getDb();
  let data = await db
    .collection("posts")
    .deleteOne({ _id: new ObjectId(req.params.id) });
  res.json(data);
});

function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ msg: "Authentication failed" });
  }

  jwt.verify(token, process.env.SECRETKEY, (err, user) => {
    if (err) {
      return res.status(403).json({ msg: "Invalid Token" });
    }
    req.body.user = user;
    next();
  });
}

module.exports = postRoutes;
