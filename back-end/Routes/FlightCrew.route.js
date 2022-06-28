const router = require('express').Router();
const {createFlightCrew, updateFlightCrew, deleteFlightCrew, findFlightCrewByAirline, findFlightCrewByID, findAllFlightCrews} = require('../Controllers/FlightCrew.controller');

// Find all flightCrews
router.get('/', async (req, res) => {
    const flightCrews = await findAllFlightCrews();
    res.json(flightCrews);
});

// Find an flightCrew with ID
router.get('/:id', (req, res) => {
    const flightCrew = await findFlightCrewByID(req.params.id);
    res.json(flightCrew);
});

// Find an flightCrew with Airline
router.get('/:airline', (req, res) => {
    const flightCrew = await findFlightCrewByAirline(req.params.airline);
    res.json(flightCrew);
});

// Update an flightCrew
router.post('/update/:id', (req, res) =>{
    try {
        const flightCrewID = await updateFlightCrew(req.body);
        res.json({_id: flightCrewId});
    } catch (err) {
        res.status(err?.status || 400).json(err);
    }
})

// Delete an flightCrew
router.post('/delete/:id', (req, res) =>{
    try {
        const flightCrewID = await deleteFlightCrew(req.body);
        res.json({_id: flightCrewId});
    } catch (err) {
        res.status(err?.status || 400).json(err);
    }
})

// Create an flightCrew
router.post('/', async (req, res) => {
    try {
        const flightCrewID = await createFlightCrew(req.body);
        res.json({_id: flightCrewId});
    } catch (err) {
        res.status(err?.status || 400).json(err);
    }
});

module.exports = router;