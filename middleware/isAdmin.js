function isAdmin(req, res, next) {
    if (!req.session.user && req.session.user.role === "Admin") {
      return res.redirect("/login");
    }
    next();
  }
  module.exports = isAdmin;