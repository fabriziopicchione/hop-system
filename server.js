const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.')); 

// Connessione a MongoDB Atlas
const MONGODB_URI = process.env.MONGODB_URI;
mongoose.connect(MONGODB_URI)
    .then(() => console.log('Connesso a MongoDB Atlas'))
    .catch(err => console.error('Errore connessione MongoDB:', err));

// --- SCHEMI E MODELLI ---

const luggageSchema = new mongoose.Schema({
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

// Schema Utenti corretto (campo 'role')
const userSchema = new mongoose.Schema({
    nome: String,
    cognome: String,
    codice: String, 
    role: String
});

const Luggage = mongoose.model('Luggage', luggageSchema);
const ArchivioDedicato = mongoose.model('ArchivioDedicato', luggageSchema);
const Deposit = mongoose.model('Deposit', depositSchema);
const ArchivioDeposit = mongoose.model('ArchivioDeposit', depositSchema);
const User = mongoose.model('User', userSchema);

// --- API UTENTI (STAFF) ---

app.get('/api/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/users', async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.json(newUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/api/users/:id', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: "Utente rimosso" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- API CONCIERGE (LUGGAGE) ---
app.get('/api/luggage', async (req, res) => {
    const data = await Luggage.find();
    res.json(data);
});

app.post('/api/luggage', async (req, res) => {
    const newItem = new Luggage(req.body);
    await newItem.save();
    res.json(newItem);
});

app.delete('/api/luggage/:id', async (req, res) => {
    await Luggage.findByIdAndDelete(req.params.id);
    res.json({ message: "Eliminato" });
});

// --- API ARCHIVIO CONCIERGE ---
app.get('/api/archivio-dedicato', async (req, res) => {
    const { date } = req.query;
    const filter = date ? { deliveryDate: date } : {};
    const results = await ArchivioDedicato.find(filter);
    res.json(results);
});

app.post('/api/archivio-dedicato', async (req, res) => {
    const newItem = new ArchivioDedicato(req.body);
    await newItem.save();
    res.json(newItem);
});

// --- API DEPOSITO ---
app.get('/api/deposit', async (req, res) => {
    const data = await Deposit.find();
    res.json(data);
});

app.post('/api/deposit', async (req, res) => {
    const newItem = new Deposit({ ...req.body, timestamp: Date.now() });
    await newItem.save();
    res.json(newItem);
});

app.post('/api/deposit/release/:id', async (req, res) => {
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
        }
    } catch (err) {
        res.status(500).send("Errore");
    }
});

app.get('/api/deposit/history', async (req, res) => {
    const history = await ArchivioDeposit.find().sort({ timestamp: -1 }).limit(100);
    res.json(history);
});

app.listen(PORT, () => console.log(`Server HOP attivo sulla porta ${PORT}`));
