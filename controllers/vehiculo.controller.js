const Vehiculo = require('../models/vehiculo.model');

/** 
 * Crea un vehículo
 */
async function createVehiculo(req, res) {
  try {
    const { marca, modelo, anio } = req.body;

    if (!marca || !modelo || !anio) {
      return res.status(400).json({ message: 'Marca, modelo y año son requeridos' });
    }

    let flota = 'economico'
    if (anio >= 2018 && marca === 'Chevrolet' && (modelo === 'Aveo' || modelo === 'Optra')) {
      flota = 'espectacular';
    } else if (anio >= 2015 && marca === 'Toyota' && (modelo === 'Hilux' || modelo === 'Fortuner' || modelo === 'Prado')) {
      flota = 'pickup';
    }

    const vehiculo = new Vehiculo({ marca, modelo, anio, flota });
    await vehiculo.save();
    return res.status(201).json(vehiculo);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

/**
 * Obtiene todos los vehículos o si se especifica req.params.flota, los vehículos de esa flota
 */
async function getVehiculos(req, res) {
  try {
    let query = {};
    let { flota } = req.params;
    if (flota) {
      query.flota = flota;
    }
    const vehiculos = await Vehiculo.find(query);

    if (!vehiculos || vehiculos.length === 0) {
      return res.status(404).json({ message: 'No se encontraron vehículos' });
    }

    return res.json(vehiculos);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

module.exports = {
  createVehiculo,
  getVehiculos,
}