const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());



// Database Connection
const MONGODB_URI = process.env.MONGODB_URI;
mongoose.connect(MONGODB_URI)
    .then(() => console.log('Connesso a MongoDB Atlas'))
    .catch(err => console.error('Errore connessione MongoDB:', err));

// Routes
const luggageRoutes = require('./routes/luggageRoutes');
const userRoutes = require('./routes/userRoutes');
const archiveRoutes = require('./routes/archiveRoutes');
const depositRoutes = require('./routes/depositRoutes');

app.use('/api/luggage', luggageRoutes);
app.use('/api/users', userRoutes);
app.use('/api/archivio-dedicato', archiveRoutes);
app.use('/api/deposit', depositRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
