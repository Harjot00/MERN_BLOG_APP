const express = require("express");
const users = require("../Models/Users");
const bcrypt = require("bcrypt");

const router = express.Router();

router.get("/users", async (req, res) => {
  let allUsers;
  try {
    allUsers = await users.find({}).populate("blogPosts");
  } catch (err) {
    return res.status(404).json(err);
  }
  if (!allUsers) {
    return res.status(404).json({ msg: "No users found" });
  }

  return res.status(200).json(allUsers);
});

router.get("/users/:id", async (req, res) => {
  let userBlogs;
  try {
    userBlogs = await users
      .findOne({ _id: req.params.id })
      .populate("blogPosts");
    if (!userBlogs) {
      return res.status(404).json({ msg: "No user found" });
    }

    return res.status(200).json(userBlogs.blogPosts);
  } catch (err) {
    return res.status(500).json({ err });
  }
});

router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = users({
    username: username,
    email: email,
    password: hashedPassword,
  });

  let existingUser;

  try {
    existingUser = await users.findOne({ email });
  } catch (err) {
    console.log(err);
  }

  if (existingUser) {
    res.status(400).json({ msg: "User already exists with this email" });
  } else {
    await newUser
      .save()
      .then(() => {
        res.status(200).json({ id: newUser._id, loggedIn: true });
      })
      .catch((err) => {
        res.status(500).json({ err });
        console.log(err);
      });
  }
});

router.post("/login", async (req, res) => {
  let userLogin, ispasswordCorrect;
  try {
    userLogin = await users.findOne({ email: req.body.email });
    if (!userLogin) {
      res.status(404).json({ message: "incorrect email" });
    } else {
      ispasswordCorrect = bcrypt.compareSync(
        req.body.password,
        userLogin.password
      );

      if (!ispasswordCorrect) {
        return res.status(404).json({ msg: "Password is incorrect" });
      }
      return res.status(200).json({ loggedIn: true, id: userLogin._id });
    }
  } catch (err) {
    res.status(404).json(err);
  }
});

module.exports = router;
