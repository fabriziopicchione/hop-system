const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    nome: String,
    cognome: String,
    codice: String,
    ruolo: String
});

module.exports = mongoose.model('User', userSchema);
