const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const ambassadorSchema = new Schema({
  name: String,
  lastName: String,
  Email: String,
  Password: String,
  Image: String,
  Promocode: String,
  role: { type: String, enum: ["Admin", "Client", "Ambassador"] },

  // comida:{type: String, enum:["prego", "polvo"]}
});

const Ambassador = model("Ambassador", ambassadorSchema);

module.exports = Ambassador;
