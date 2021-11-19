const router = require("express").Router();
const isLoggedIn = require("./../middleware/isLoggedIn");

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

// GET login
router.get("/login", (req, res) => {
  res.render("auth/login-form");
});

//Get Signup
router.get("/signup", (req, res) => {
  res.render("auth/signup-form");
});

module.exports = router;
