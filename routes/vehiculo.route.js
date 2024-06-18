const express = require('express');
const vehiculoController = require('../controllers/vehiculo.controller');
const router = express.Router();

router.post('/', vehiculoController.createVehiculo);
router.get('/', vehiculoController.getVehiculos);
router.get('/:flota', vehiculoController.getVehiculos);

module.exports = router;
