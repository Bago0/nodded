// models/Vehicle.js
const mongoose = require('mongoose');

const serviceDetailSchema = new mongoose.Schema({
    serviceName: { type: String, required: true },
    serviceDate: { type: Date, required: true }
});

const vehicleSchema = new mongoose.Schema({
    licensePlate: { type: String, required: true, unique: true },
    vinCode: { type: String, required: true, unique: true },
    color: { type: String, required: true },
    make: { type: String, required: true },
    model: { type: String, required: true },
    serviceDetails: [serviceDetailSchema]
});

module.exports = mongoose.model('Vehicle', vehicleSchema);
