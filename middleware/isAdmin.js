function isAdmin(req, res, next) {
  if (req.session.user.role !== "Admin") {
    return res.redirect("/");
  }
  next();
}
module.exports = isAdmin;
