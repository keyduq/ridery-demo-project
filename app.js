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

// Conecta normalmente a mongodb en caso de no ser un test
if (process.env.NODE_ENV !== 'test') {
  db.connect(config.mongoUri)
    .then(() => {
      console.log('Conectado a MongoDB');
    })
    .catch(error => console.error(error));
}

// Inicia servidor
const server = app.listen(config.port, () => {
  console.log(`Server running at http://localhost:${config.port}`);
});

module.exports = {
  app,
  server,
}