const mongoose = require('mongoose');

const vehiculoSchema = new mongoose.Schema({
  marca: { type: mongoose.Schema.Types.ObjectId, ref: 'Marca', required: true },
  modelo: { type: mongoose.Schema.Types.ObjectId, ref: 'Modelo', required: true },
  anio: { type: Number, required: true },
  flota: { type: String, enum: ['economico', 'espectacular', 'pickup'], required: true },
});

const Vehiculo = mongoose.model('Vehiculo', vehiculoSchema);

module.exports = Vehiculo;
