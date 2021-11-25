const router = require("express").Router();
const Client = require("../models/client-model");
const isLoggedIn = require("./../middleware/isLoggedIn");
const isAdmin = require("./../middleware/isAdmin");

/* GET home page */
router.get("/", (req, res, next) => {
  // Check if the incoming request has a valid cookie/session
  let userIsLoggedIn = false;
  if (req.session.user) {
    userIsLoggedIn = true;
  }

  res.render("index", { userIsLoggedIn: userIsLoggedIn });
});
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

//Get Client page => Show specifi Clients from an ambassador
router.get("/clients", (req, res) => {
  Client.find({ promocode: req.session.user.promocode }).then(
    (clientsFromDb) => {
      let IsLoggedIn = false;

      if (req.session.user) {
        IsLoggedIn = true;
      }
      //{promocode: req.session.user}
      return res.render("client-view", {
        clientsFromDb,
        IsLoggedIn: IsLoggedIn,
      });
    }
  );
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

// POST client-update/:clientId/delete
router.post("/client-update/:clientId/delete", (req, res) => {
  const clientId = req.params.clientId;

  Client.findByIdAndRemove(clientId)
    .then((status) => {
      res.redirect("/clients");
    })
    .catch((err) => console.log(err));
});

// GET Admin

router.get("/admin", isAdmin, (req, res) => {
  Client.find().then((clientsFromDb) => {
    console.log(clientsFromDb);
    let IsLoggedIn = false;

    if (req.session.user) {
      IsLoggedIn = true;
    }
    return res.render("admin-view", {
      clientsFromDb,
      IsLoggedIn: IsLoggedIn,
    });
  });
});

module.exports = router;
