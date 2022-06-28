const router = require('express').Router();
const {createPassenger, updatePassenger, deletePassenger, findAllPassengers} = require('../Controllers/Passenger.controller');

// Find all passengers
router.get('/', async (req, res) => {
    const passengers = await findAllPassengers();
    res.json(passengers);
});

// Update an passenger
router.post('/update/:id', (req, res) =>{
    try {
        const passengerID = await updatePassenger(req.body);
        res.json({_id: passengerId});
    } catch (err) {
        res.status(err?.status || 400).json(err);
    }
})

// Delete an passenger
router.post('/delete/:id', (req, res) =>{
    try {
        const passengerID = await deletePassenger(req.body);
        res.json({_id: passengerId});
    } catch (err) {
        res.status(err?.status || 400).json(err);
    }
})

// Create an passenger
router.post('/', async (req, res) => {
    try {
        const passengerID = await createPassenger(req.body);
        res.json({_id: passengerId});
    } catch (err) {
        res.status(err?.status || 400).json(err);
    }
});

module.exports = router;