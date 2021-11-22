const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const clientSchema = new Schema({
  name: String,
  lastName: String,
  Email: String,
  Promocode: String,
  Ambassador: { type: Schema.Types.ObjectId, ref: "Ambassador" },
  // comida:{type: String, enum:["prego", "polvo"]}
});

const Client = model("Client", clientSchema);

module.exports = Client;
