const mongoose = require('mongoose');

const modeloSchema = new mongoose.Schema({
  nombre: { type: String, required: true, unique: true },
  marca: { type: mongoose.Schema.Types.ObjectId, ref: 'Marca', required: true },
});

const Modelo = mongoose.model('Modelo', modeloSchema);
module.exports = Modelo;