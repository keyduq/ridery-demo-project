const mongoose = require('mongoose');

const marcaSchema = new mongoose.Schema({
  nombre: { type: String, required: true, unique: true },
});

const Marca = mongoose.model('Marca', marcaSchema);
module.exports = Marca;