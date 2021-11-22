const router = require("express").Router();
const Client = require("../models/client-model");

//Get Client page => Show all Clients
router.get("/clients", (req, res) => {
  Client.find()
  .then((clientsFromDb)=>{

    res.render("client-view", {clientsFromDb});
  });
});

//add clients
router.get("/clientsadd", (req, res) => {
  res.render("client-add");
});

router.post("/clientsadd", (req, res) => {
  const { name, lastName, email, promocode } = req.body;

  Client.create({
    name: name,
    lastName: lastName,
    email: email,
    promocode: promocode,
  })
    .then((createdClient) => res.redirect(`/clientsadd`))
    .catch((error) => console.log(error));
});

module.exports = router;
