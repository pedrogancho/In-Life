const router = require("express").Router();
const isLoggedIn = require("./../middleware/isLoggedIn");

/* GET home page */
router.get("/", (req, res, next) => {
  // Check if the incoming request has a valid cookie/session
  let isLoggedIn = false;
  let isAdmin = false;

  if (req.session.user) {
    isLoggedIn = true;
    if (req.session.user.role === "Admin") {
      isAdmin = true;
    }
  }

  res.render("index", {
    isLoggedIn: isLoggedIn,
    ambassador: req.session.user,
    isAdmin,
  });
});

module.exports = router;
