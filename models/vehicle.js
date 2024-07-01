const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    pid: { type: String, required: true, unique: true },
    dateOfBirth: { type: Date, required: true },
    position: { type: String, required: true },
    salary: { type: Number, required: true }
},{
    collection: 'employees',
    timestamps: true,
    read: 'nearest',
    writeConcern: {
        w: 'majority',
        j: true,
        wtimeoutMS: 30000
    }
});

module.exports = mongoose.model('Employee', employeeSchema);