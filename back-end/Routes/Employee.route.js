const router = require('express').Router();
const {createEmployee, findAllEmployees, findEmployeeByID, deleteEmployeeById, updateEmployee } = require('../Controllers/Employee.controller');

// Find All Employees
router.get('/', async (req, res) => {
    const employees = await findAllEmployees();
    res.json(employees);
});

// Create Employee
router.post('/', async (req, res) => {
    try {
        const employeeId = await createEmployee(req.body);
        res.status(201).json({_id: employeeId});
    } catch (err) {
        res.status(err?.status || 500).json(err);
    }
});

// Find Employee By ID
router.get('/:id', async (req, res) => {
    try {
        const employee = await findEmployeeByID(req.params.id);
        res.json(employee);
    } catch (err) {
        res.status(err?.status || 400).json(err);
    }
});

// Delete Employee by ID
router.delete('/:id', async (req, res) => {
    try {
        console.log(`try to delete ${req.params.id}`);
        const employee = await deleteEmployeeById(req.params.id);
    } catch (err) {
        res.status(err?.status || 400).json(err);
    }
});

router.put('/:id', async (req, res) => {
    try {
        console.log(`Got ${req.params.id}`);
        const employee = await updateEmployee(req.params.id, req.body);
        res.json(employee);
    } catch (err){
        res.status(err?.status || 400).json(err);
    }
});

module.exports = router;