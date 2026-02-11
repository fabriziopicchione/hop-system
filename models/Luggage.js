const mongoose = require('mongoose');

const luggageSchema = new mongoose.Schema({
    barcode: String, // Tag Number
    guest: String,
    room: String,
    pcs: mongoose.Schema.Types.Mixed,
    type: String,
    source: String,
    user: String,
    time: String,
    deliveryDate: String,
    status: String,
    start: Number,
    durata: String
});

module.exports = mongoose.model('Luggage', luggageSchema);
