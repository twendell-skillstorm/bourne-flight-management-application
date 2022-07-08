const router = require('express').Router();
const {createFlightCrew, updateFlightCrew, deleteFlightCrew, findFlightCrewByAirline, findFlightCrewByID, findAllFlightCrews} = require('../Controllers/FlightCrew.controller');
// Find All FlightCrews
router.get('/', async (req, res) => {
    const flightCrews = await findAllFlightCrews();
    res.json(flightCrews);
});

// Create FlightCrew
router.post('/', async (req, res) => {
    try {
        const flightCrewId = await createFlightCrew(req.body);
        res.status(201).json({_id: flightCrewId});
    } catch (err) {
        res.status(err?.status || 500).json(err);
    }
});

// Find FlightCrew By ID
router.get('/:id', async (req, res) => {
    try {
        const flightCrew = await findFlightCrewByID(req.params.id);
        res.json(flightCrew);
    } catch (err) {
        res.status(err?.status || 400).json(err);
    }
});

// Delete FlightCrews
router.delete('/', async (req, res) => {
    const flightCrews = await deleteAllFlightCrews();
});

// Delete FlightCrew by ID
router.delete('/:id', async (req, res) => {
    try {
        console.log(`try to delete ${req.params.id}`);
        const flightCrew = await deleteFlightCrew(req.params.id);
    } catch (err) {
        res.status(err?.status || 400).json(err);
    }
});

// Update FlightCrew by ID
router.put('/:id', async (req, res) => {
    try {
        const flightCrew = await updateFlightCrew(req.params.id, req.body);
        res.json(flightCrew);
    } catch (err){
        res.status(err?.status || 400).json(err);
    }
});

module.exports = router;