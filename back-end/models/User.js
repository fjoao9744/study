const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    nome: String,
    tasks: String
});

module.exports = mongoose.model("User", UserSchema);
