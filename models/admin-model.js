const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const adminSchema = new Schema({
  name: String,
  lastName: String,
  Email: String,
  Password: String,
  Image: String,
  Promocode: String,
  Ambassador: Boolean,

  // comida:{type: String, enum:["prego", "polvo"]}
  //Posts => posts{type: mongoose.Schema.Types-objectID, ref: "Post"}
  //Post.findById(123).populate('cretator')
});

const Admin = model("Admin", adminSchema);

module.exports = Admin;
