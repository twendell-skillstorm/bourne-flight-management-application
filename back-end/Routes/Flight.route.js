const router = require('express').Router();
const {createFlight, updateFlight, deleteFlight, findFlightByAirline, findFlightByID, findAllFlights} = require('../Controllers/Flight.controller');

// Find all flights
router.get('/', async (req, res) => {
    const flights = await findAllFlights();
    res.json(flights);
});

// Find an flight with ID
router.get('/:id', (req, res) => {
    const flight = await findFlightByID(req.params.id);
    res.json(flight);
});

// Find an flight with Airline
router.get('/:airline', (req, res) => {
    const flight = await findFlightByAirline(req.params.airline);
    res.json(flight);
});

// Update an flight
router.post('/update/:id', (req, res) =>{
    try {
        const flightID = await updateFlight(req.body);
        res.json({_id: flightId});
    } catch (err) {
        res.status(err?.status || 400).json(err);
    }
})

// Delete an flight
router.post('/delete/:id', (req, res) =>{
    try {
        const flightID = await deleteFlight(req.body);
        res.json({_id: flightId});
    } catch (err) {
        res.status(err?.status || 400).json(err);
    }
})

// Create an flight
router.post('/', async (req, res) => {
    try {
        const flightID = await createFlight(req.body);
        res.json({_id: flightId});
    } catch (err) {
        res.status(err?.status || 400).json(err);
    }
});

module.exports = router;
