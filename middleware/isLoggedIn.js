// Custom middleware that checks if the request has a valid cookie
function isLoggedIn(req, res, next) {
  if (!req.session.user) {
    return res.redirect("/login");
  }

  next();
}

// function isAdmin(req, res, next) {
//   if (req.session.user === "admin") {
//     next();
//   } else {
//     res.redirect("/login");
//   }
// }

module.exports = isLoggedIn;
// modeule.exports = { isLoggedIn, isAdmin }; for 2 functions
