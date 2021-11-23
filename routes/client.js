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
      res.redirect(`/clients`);
    })
    .catch((error) => console.log("erro:", error));
});

//Get Client page => Show all Clients
router.get("/clients", (req, res) => {
  Client.find().then((clientsFromDb) => {
    //{promocode: req.session.user}
    return res.render("client-view", { clientsFromDb });
  });
});

// GET /client/:clientId/edit - Renders the edit client POST form
router.get("/client-update/:clientId/edit", (req, res) => {
  const clientId = req.params.clientId;

  Client.findById(clientId)
    .then((client) => {
      res.render("client-update", { client: client });
    })
    .catch((err) => console.log(err));
});

//Update Client /POST
router.post("/client-update/:clientId/edit", (req, res) => {
  const clientId = req.params.clientId;
  const { name, lastName, email, promocode } = req.body;

  Client.findByIdAndUpdate(
    clientId,
    { name, lastName, email, promocode },
    { new: true }
  )
    .then((updatedClient) => {
      res.redirect(`/clients`);
    })
    .catch((err) => console.log(err));
});

// POST   client-update/:clientId/delete
router.post("/client-update/:clientId/delete", (req, res) => {
  const clientId = req.params.clientId;

  Client.findByIdAndRemove(clientId)
    .then((status) => {
      res.redirect("/clients");
    })
    .catch((err) => console.log(err));
});

module.exports = router;
