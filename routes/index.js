const router = require("express").Router();
const isLoggedIn = require("./../middleware/isLoggedIn");

/* GET home page */
router.get("/", (req, res, next) => {
  // Check if the incoming request has a valid cookie/session
  let IsLoggedIn = false;

  if (req.session.user) {
    IsLoggedIn = true;
  }

  res.render("index", { IsLoggedIn: IsLoggedIn, ambassador: req.session.user });
});

module.exports = router;
