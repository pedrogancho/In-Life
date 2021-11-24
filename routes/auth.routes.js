const router = require("express").Router();
const Admin = require("../models/admin-model");
const Ambassador = require("../models/ambassador-model");
const bcrypt = require("bcryptjs");

const isLoggedIn = require("./../middleware/isLoggedIn");

const saltRounds = 10;

//ROUTES
//Get Home Page
router.get("/", (req, res, next) => {
  res.render("index");
});

// GET login
router.get("/login", (req, res) => {
  res.render("auth/login-form");
});

// POST /login
router.post("/login", (req, res) => {
  // Get the email and password from the req.body
  const { email, password } = req.body;

  // Check if the email and the password are provided
  const emailNotProvided = !email || email === "";
  const passwordNotProvided = !password || password === "";

  if (emailNotProvided || passwordNotProvided) {
    res.render("auth/login-form", {
      errorMessage: "Provide email and password.",
    });

    return;
  }

  let ambassador;
  // Check if the email exists
  Ambassador.findOne({ email: email })
    .then((foundEmail) => {
      ambassador = foundEmail;

      if (!foundEmail) {
        throw new Error("Wrong credentials");
      }

      // Compare the passwords
      return bcrypt.compare(password, foundEmail.password);
    })
    .then((isCorrectPassword) => {
      if (!isCorrectPassword) {
        throw new Error("Wrong credentials");
      } else if (isCorrectPassword) {
        // Create the session + cookie and redirect the user
        // This line triggers the creation of the session in the DB,
        // and setting of the cookie with session id that will be sent with the response
        req.session.user = ambassador;
        console.log("user session: ", req.session.user);
        res.redirect("/clients");
      }
    })
    .catch((err) => {
      res.render("auth/login-form", {
        errorMessage: err.message || "Provide email and password.",
      });
    });
});

//Get Signup
router.get("/signup", (req, res) => {
  res.render("auth/signup-form");
});

// POST /signup
router.post("/signup", (req, res) => {
  // Get the email and password from the req.body
  const { name, email, password, promocode } = req.body;

  // Check if the email and the password are provided
  const emailNotProvided = !email || email === "";
  const passwordNotProvided = !password || password === "";

  if (emailNotProvided || passwordNotProvided) {
    res.render("auth/signup-form", {
      errorMessage: "Provide email and password.",
    });

    return;
  }

  const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;

  if (!regex.test(password)) {
    res.status(400).render("auth/signup-form", {
      errorMessage:
        "Password needs to have at least 8 characters and must contain at least one number, one lowercase and one uppercase letter.",
    });

    return;
  }

  // Check that the email is not taken
  Ambassador.findOne({ email: email })
    .then((foundEmail) => {
      if (foundEmail) {
        throw new Error("The email is taken");
      }

      // Generating the salt string
      return bcrypt.genSalt(saltRounds);
    })
    .then((salt) => {
      // Encrypt the password
      return bcrypt.hash(password, salt);
    })
    .then((hashedPassword) => {
      // Create the new user
      return Ambassador.create({
        name: name,
        email: email,
        password: hashedPassword,
        promocode: promocode,
        role: "Ambassador",
      });
      // return User.create({ email, password: hashedPassword });
    })
    .then((createdUser) => {
      // Redirect to the home `/` page after the successful signup
      res.redirect("/login");
    })
    .catch((err) => {
      res.render("auth/signup-form", {
        errorMessage: err.message || "Error while trying to sign up",
      });
    });
});

// GET Dashboard
router.get("/ambassador", (req, res) => {
  res.render("ambassador-dashboard");
});

router.get("/secret", isLoggedIn, (req, res) => {
  res.render("secret-view");
});

// GET /logout
router.get("/logout", (req, res) => {
  console.log("here");
  // Delete the session from the sessions collection
  // This automatically invalidates the future request with the same cookie
  req.session.destroy((err) => {
    if (err) {
      return res.render("error");
    }

    // If session was deleted successfully redirect to the home page.
    res.redirect("/");
  });
});

module.exports = router;
