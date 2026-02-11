const mongoose = require('mongoose');
const depositSchema = require('./Deposit').schema; // Reuse schema

module.exports = mongoose.model('ArchivioDeposit', depositSchema);
