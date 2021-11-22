const router = require("express").Router();

//Get Client page => Show all Clients
router.get("/clients", (req, res) => {
  res.render("client-view");
});

//add clients
router.get("/clientsadd", (req, res) => {
  res.render("client-add");
});




module.exports = router;
