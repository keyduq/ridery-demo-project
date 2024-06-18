const mongoose = require('mongoose');

const vehiculoSchema = new mongoose.Schema({
  marca: { type: String, required: true },
  modelo: { type: String, required: true },
  anio: { type: Number, required: true },
  flota: { type: String, enum: ['economico', 'espectacular', 'pickup'], required: true },
});

const Vehiculo = mongoose.model('Vehiculo', vehiculoSchema);

module.exports = Vehiculo;