const ArchivioDedicato = require('../models/ArchivioDedicato');

exports.getDedicated = async (req, res) => {
    const { date, filter } = req.query;
    let query = {};
    if (date) query.deliveryDate = date;
    if (filter) {
        query.$or = [
            { guest: new RegExp(filter, 'i') },
            { room: new RegExp(filter, 'i') }
        ];
    }
    try {
        const results = await ArchivioDedicato.find(query);
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createDedicated = async (req, res) => {
    try {
        const newItem = new ArchivioDedicato(req.body);
        await newItem.save();
        res.json(newItem);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
