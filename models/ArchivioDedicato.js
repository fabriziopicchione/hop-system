const mongoose = require('mongoose');

const archivioDedicatoSchema = new mongoose.Schema({
    barcode: String,
    guest: String,
    room: String,
    pcs: mongoose.Schema.Types.Mixed,
    type: String,
    status: String,
    user: String,
    durata: String,
    time: String,
    deliveryDate: String
});

module.exports = mongoose.model('ArchivioDedicato', archivioDedicatoSchema);
