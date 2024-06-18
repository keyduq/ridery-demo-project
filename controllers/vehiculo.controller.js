const Marca = require('../models/marca.model');
const Modelo = require('../models/modelo.model');
const Vehiculo = require('../models/vehiculo.model');

/**
 * Crea un vehículo
 */
async function createVehiculo(req, res) {
  try {
    const { marca, modelo, anio } = req.body;

    if (!marca || !modelo || !anio) {
      return res
        .status(400)
        .json({ message: 'Marca, modelo y año son requeridos' });
    }

    // busca si existe la marca, si no la agrega
    let marcaModel = await Marca.exists({ nombre: marca });

    if (!marcaModel) {
      marcaModel = new Marca({ nombre: marca });
      await marcaModel.save();
    }

    // busca si existe el modelo asociado a la marca si no la agrega
    let modeloModel = await Modelo.exists({
      nombre: modelo,
      marca: marcaModel._id,
    });

    if (!modeloModel) {
      modeloModel = new Modelo({ nombre: modelo, marca: marcaModel._id });
      await modeloModel.save();
    }

    let flota = 'economico';
    if (
      anio >= 2018 &&
      marca === 'Chevrolet' &&
      (modelo === 'Aveo' || modelo === 'Optra')
    ) {
      flota = 'espectacular';
    } else if (
      anio >= 2015 &&
      marca === 'Toyota' &&
      (modelo === 'Hilux' || modelo === 'Fortunner' || modelo === 'Prado')
    ) {
      flota = 'pickup';
    }

    let vehiculo = new Vehiculo({
      marca: marcaModel._id,
      modelo: modeloModel._id,
      anio,
      flota,
    });
    vehiculo = await vehiculo.save().then(v => v.populate('marca modelo'));
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
    const vehiculos = await Vehiculo.find(query).populate('marca modelo');

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
};
