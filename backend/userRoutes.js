// import express and the database connection
const express = require("express");
const database = require("./connect");
const ObjectId = require("mongodb").ObjectId;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "./config.env" });

let userRoutes = express.Router();
const SALT_ROUNDS = 6;

// http://localhost:3000/users

userRoutes.route("/users").get(async (req, res) => {
  let db = database.getDb();
  let data = await db.collection("users").find({}).toArray();
  if (data.length > 0) {
    res.json(data);
  } else {
    throw new Error("No users found");
  }
});

// http://localhost:3000/users/1

userRoutes.route("/users/:id").get(async (req, res) => {
  let db = database.getDb();
  let data = await db
    .collection("users")
    .findOne({ _id: new ObjectId(req.params.id) });
  if (Object.keys(data).length > 0) {
    res.json(data);
  } else {
    throw new Error("No users found !");
  }
});

// http://localhost:3000/users

userRoutes.route("/users").post(async (req, res) => {
  let db = database.getDb();

  const takenEmail = await db
    .collection("users")
    .findOne({ email: req.body.email });
  if (takenEmail) {
    res.status(400).json({ msg: "Email already taken" });
  } else {
    const hash = await bcrypt.hash(req.body.password, SALT_ROUNDS);
    let mongoObject = {
      name: req.body.name,
      email: req.body.email,
      password: hash,
      joinDate: new Date(),
      posts: [],
    };
    let data = await db.collection("users").insertOne(mongoObject);
    res.json(data);
  }
});

// http://localhost:3000/users/1

userRoutes.route("/users/:id").put(async (req, res) => {
  let db = database.getDb();
  let mongoObject = {
    $set: {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      joinDate: req.body.joinDate,
      posts: req.body.posts,
    },
  };
  let data = await db
    .collection("users")
    .updateOne({ _id: new ObjectId(req.params.id) }, mongoObject);
  res.json(data);
});

// http://localhost:3000/users/1

userRoutes.route("/users/:id").delete(async (req, res) => {
  let db = database.getDb();
  let data = await db
    .collection("users")
    .deleteOne({ _id: new ObjectId(req.params.id) });
  res.json(data);
});

// #login

userRoutes.route("/users/login").post(async (req, res) => {
  let db = database.getDb();

  const user = await db.collection("users").findOne({ email: req.body.email });

  if (user) {
    const confirmation = await bcrypt.compare(req.body.password, user.password);
    if (confirmation) {
      const token = jwt.sign(user, process.env.SECRETKEY, { expiresIn: "24h" });
      res.json({
        success: true,
        token,
      });
    } else {
      res.json({ success: false, msg: "Incorrect Password" });
    }
  } else {
    res.json({ success: false, msg: "User not found" });
  }
});

module.exports = userRoutes;
