const Deposit = require('../models/Deposit');
const ArchivioDeposit = require('../models/ArchivioDeposit');

exports.getAll = async (req, res) => {
    try {
        const data = await Deposit.find();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.create = async (req, res) => {
    try {
        const newItem = new Deposit({ ...req.body, timestamp: Date.now() });
        await newItem.save();
        res.json(newItem);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.release = async (req, res) => {
    try {
        const item = await Deposit.findById(req.params.id);
        if (item) {
            const releasedData = {
                ...item._doc,
                releaseDate: new Date().toLocaleDateString('it-IT'),
                releaseTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                releasePorter: req.body.releasePorter
            };
            await ArchivioDeposit.create(releasedData);
            await Deposit.findByIdAndDelete(req.params.id);
            res.json({ message: "Riconsegnato" });
        } else {
            res.status(404).json({ error: "Item not found" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
