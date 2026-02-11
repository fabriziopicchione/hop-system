const mongoose = require('mongoose');

const depositSchema = new mongoose.Schema({
    tag: String,
    guest: String,
    pcs: String,
    location: String,
    notes: String,
    user: String,
    date: String,
    time: String,
    timestamp: Number,
    releaseDate: String,
    releaseTime: String,
    releasePorter: String
});

module.exports = mongoose.model('Deposit', depositSchema);
