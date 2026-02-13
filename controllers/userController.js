const User = require('../models/User');

exports.getAll = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Create new user
exports.create = async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Update existing user
exports.update = async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete user
exports.delete = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: "User deleted" });
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
