const router = require("express").Router();
const Admin = require("../models/admin-model");
const Ambassador = require("../models/ambassador-model");
const Client = require("../models/client-model");

//ROUTES
//Get Home Page
router.get("/", (req, res, next) => {
  res.render("index");
});

// POST /login
router.post("/login", (req, res) => {
  // Get the username and password from the req.body
  const { username, password } = req.body;

  // Check if the username and the password are provided
  const usernameNotProvided = !username || username === "";
  const passwordNotProvided = !password || password === "";

  if (usernameNotProvided || passwordNotProvided) {
    res.render("auth/login-form", {
      errorMessage: "Provide username and password.",
    });

    return;
  }

  let user;
  // Check if the user exists
  User.findOne({ username: username })
    .then((foundUser) => {
      user = foundUser;

      if (!foundUser) {
        throw new Error("Wrong credentials");
      }

      // Compare the passwords
      return bcrypt.compare(password, foundUser.password);
    })
    .then((isCorrectPassword) => {
      if (!isCorrectPassword) {
        throw new Error("Wrong credentials");
      } else if (isCorrectPassword) {
        // Create the session + cookie and redirect the user
        // This line triggers the creation of the session in the DB,
        // and setting of the cookie with session id that will be sent with the response
        req.session.user = user;
        res.redirect("/");
      }
    })
    .catch((err) => {
      res.render("auth/login-form", {
        errorMessage: err.message || "Provide username and password.",
      });
    });
});

module.exports = router;
