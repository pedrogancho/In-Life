const router = require("express").Router();
const Client = require("../models/client-model");

//add clients
router.get("/clientsadd", (req, res) => {
  res.render("client-add");
});

router.post("/clientsadd", (req, res) => {
  const { name, lastName, email, promocode } = req.body;
  console.log(name, lastName, email, promocode);
  console.log("creating client");

  return Client.create({
    name: name,
    lastName: lastName,
    email: email,
    promocode: promocode,
  })
    .then((createdClient) => {
      console.log(createdClient);
      res.redirect(`/clientsadd`);
    })
    .catch((error) => console.log("erro:", error));
});

//Get Client page => Show all Clients
router.get("/clients", (req, res) => {
  Client.find().then((clientsFromDb) => {
    return res.render("client-view", { clientsFromDb });
  });
});
//Get /clients-update
router.get("/clients-update", (req, res) => {
  res.render("clients-update");
});

//Update Client
router.post("/clients-update", (req, res) => {
  const clientsId = req.params.clientsId;
  const { name, lastName, email, promocode } = req.body;

  Client.findByIdAndUpdate(
    clientsId,
    { name, lastName, email, promocode },
    { new: true }
  )
    .then((updatedClient) => {
      res.redirect(`/clients-update${clientsId}`);
    })
    .catch((err) => console.log(err));
});

module.exports = router;
