const router = require('express').Router();
const {createPassenger, findPassengerByID, updatePassenger, deletePassenger, findAllPassengers} = require('../Controllers/Passenger.controller');

// Find All Passengers
router.get('/', async (req, res) => {
    const passengers = await findAllPassengers();
    res.json(passengers);
});

// Find Passenger By ID
router.get('/:id', async (req, res) => {
    try {
        console.log(`Sent ID: ${req.params.id}`);
        const passenger = await findPassengerByID(req.params.id);
        res.json(passenger);
    } catch (err) {
        res.status(err?.status || 400).json(err);
    }
});

// Delete Passengers
router.delete('/', async (req, res) => {
    const passengers = await deleteAllPassengers();
});

// Delete Passenger by ID
router.delete('/:id', async (req, res) => {
    try {
        console.log(`try to delete ${req.params.id}`);
        const passenger = await deletePassenger(req.params.id);
    } catch (err) {
        res.status(err?.status || 400).json(err);
    }
});

// Update Passenger by ID
router.put('/:id', async (req, res) => {
    try {
        console.log(`Sent ID: ${req.params.id}`);
        const passenger = await updatePassenger(req.params.id, req.body);
        res.json(passenger);
    } catch (err){
        res.status(err?.status || 400).json(err);
    }
});

// Create an passenger
router.post('/', async (req, res) => {
    try {
        const passengerID = await createPassenger(req.body);
        res.json({_id: passengerID});
    } catch (err) {
        res.status(err?.status || 400).json(err);
    }
});

module.exports = router;