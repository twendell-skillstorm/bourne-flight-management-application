const router = require('express').Router();
const {createEmployee, updateEmployee, deleteEmployee, findAllEmployees} = require('../Controllers/Employee.controller');

// Find all employees
router.get('/', async (req, res) => {
    const employees = await findAllEmployees();
    res.json(employees);
});

// Update an employee
router.post('/update/:id', (req, res) =>{
    try {
        const employeeID = await updateEmployee(req.body);
        res.json({_id: employeeId});
    } catch (err) {
        res.status(err?.status || 400).json(err);
    }
})

// Delete an employee
router.post('/delete/:id', (req, res) =>{
    try {
        const employeeID = await deleteEmployee(req.body);
        res.json({_id: employeeId});
    } catch (err) {
        res.status(err?.status || 400).json(err);
    }
})

// Create an employee
router.post('/', async (req, res) => {
    try {
        const employeeID = await createEmployee(req.body);
        res.json({_id: employeeId});
    } catch (err) {
        res.status(err?.status || 400).json(err);
    }
});

module.exports = router;