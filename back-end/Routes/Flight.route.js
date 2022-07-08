const router = require('express').Router();
const {createFlight, updateFlight, deleteFlight, findFlightByAirline, findFlightByID, findAllFlights} = require('../Controllers/Flight.controller');

// Find All Flights
router.get('/', async (req, res) => {
    const flights = await findAllFlights();
    res.json(flights);
});

// Create Flight
router.post('/', async (req, res) => {
    try {
        const flightId = await createFlight(req.body);
        res.status(201).json({_id: flightId});
    } catch (err) {
        res.status(err?.status || 500).json(err);
    }
});

// Find Flight By ID
router.get('/:id', async (req, res) => {
    try {
        const flight = await findFlightByID(req.params.id);
        res.json(flight);
    } catch (err) {
        res.status(err?.status || 400).json(err);
    }
});

// Delete Flights
router.delete('/', async (req, res) => {
    const flights = await deleteAllFlights();
});

// Delete Flight by ID
router.delete('/:id', async (req, res) => {
    try {
        console.log(`try to delete ${req.params.id}`);
        const flight = await deleteFlightById(req.params.id);
    } catch (err) {
        res.status(err?.status || 400).json(err);
    }
});

// Update Flight by ID
router.put('/:id', async (req, res) => {
    try {
        const flight = await updateFlight(req.params.id, req.body);
        res.json(flight);
    } catch (err){
        res.status(err?.status || 400).json(err);
    }
});

module.exports = router;
