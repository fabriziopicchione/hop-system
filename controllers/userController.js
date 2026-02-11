const User = require('../models/User');

exports.getAll = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Simple auth: verify PIN
exports.login = async (req, res) => {
    const { pin } = req.body;
    try {
        // Special Master Password
        if (pin === "2251") {
            return res.json({ success: true, user: { nome: "Admin", cognome: "", ruolo: "Admin" } });
        }

        const user = await User.findOne({ codice: pin });
        if (user) {
            res.json({ success: true, user });
        } else {
            res.status(401).json({ success: false, message: "PIN non valido" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
