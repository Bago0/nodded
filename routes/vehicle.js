// routes/vehicle.js
const express = require('express');
const router = express.Router();

const vehicleService = require('../services/vehicleService');
const ApiSecurity = require('../middleware/apiSecurity');

router.get('/all', ApiSecurity.requireLogin, vehicleService.getAll);
router.get('/:id', ApiSecurity.requireLogin, vehicleService.getOne);
router.post('/add', ApiSecurity.requirePermits('manage_vehicle'), vehicleService.add);
router.put('/:id', ApiSecurity.requirePermits('manage_vehicle'), vehicleService.update);
router.delete('/:id', ApiSecurity.requirePermits('manage_vehicle'), vehicleService.delete);
router.get('/search', ApiSecurity.requireLogin, vehicleService.search);

module.exports = router;
