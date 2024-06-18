const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/config');
const db = require('./db');
const vehiculoRoutes = require('./routes/vehiculo.route');
const userRoutes = require('./routes/user.route');
const auth = require('./middlewares/auth.middleware');

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api', userRoutes);
app.use('/api/vehiculos', auth, vehiculoRoutes);

// Conectar a MongoDB e iniciar el api
db.connect(config.mongoUri)
  .then(() => {
    console.log('Conectado a MongoDB');
    app.listen(config.port, () => {
      console.log(`Server running at http://localhost:${config.port}`);
    });
  })
  .catch(error => console.error(error));