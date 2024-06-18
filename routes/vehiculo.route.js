const express = require('express');
const vehiculoController = require('../controllers/vehiculo.controller');
const router = express.Router();

router.post('/vehiculos', vehiculoController.createVehiculo);
router.get('/vehiculos', vehiculoController.getVehiculos);
router.get('/vehiculos/:flota', vehiculoController.getVehiculos);

module.exports = flota;