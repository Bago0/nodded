// services/employeeService.js
const Employee = require('../models/employee');

exports.getAll = async (req, res) => {
    try {
        const employees = await Employee.find();
        res.json(employees);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getOne = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.json(employee);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.add = async (req, res) => {
    const employee = new Employee({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        pid: req.body.pid,
        dateOfBirth: req.body.dateOfBirth,
        position: req.body.position,
        salary: req.body.salary
    });

    try {
        const newEmployee = await employee.save();
        res.status(201).json(newEmployee);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.update = async (req, res) => {
    try {
        const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.json(employee);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.delete = async (req, res) => {
    try {
        const employee = await Employee.findByIdAndDelete(req.params.id);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.json({ message: 'Employee deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.search = async (req, res) => {
    const { page = 1, limit = 10, searchText = '' } = req.query;
    const searchQuery = {
        $or: [
            { firstName: new RegExp(searchText, 'i') },
            { lastName: new RegExp(searchText, 'i') },
            { pid: new RegExp(searchText, 'i') }
        ]
    };

    try {
        const employees = await Employee.find(searchQuery)
            .limit(limit * 1)
            .skip((page - 1) * limit);
        const count = await Employee.countDocuments(searchQuery);

        res.json({
            employees,
            totalPages: Math.ceil(count / limit),
            currentPage: parseInt(page)
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
