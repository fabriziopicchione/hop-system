const Luggage = require('../models/Luggage');

exports.getAll = async (req, res) => {
    try {
        const data = await Luggage.find();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.create = async (req, res) => {
    try {
        const newItem = new Luggage(req.body);
        await newItem.save();
        res.json(newItem);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateStatus = async (req, res) => {
    try {
        const updatedItem = await Luggage.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { new: true }
        );
        res.json(updatedItem);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.delete = async (req, res) => {
    try {
        await Luggage.findByIdAndDelete(req.params.id);
        res.json({ message: "Eliminato" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
