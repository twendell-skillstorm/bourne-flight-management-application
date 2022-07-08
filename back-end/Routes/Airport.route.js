const router = require('express').Router();
const {createAirport, findAirportByID, findAllAirports, deleteAllAirports, deleteAirportById, updateAirport} = require('../Controllers/Airport.controller');

// Find All Airports
router.get('/', async (req, res) => {
    const airports = await findAllAirports();
    res.json(airports);
});

// Create Airport
router.post('/', async (req, res) => {
    try {
        const airportId = await createAirport(req.body);
        res.status(201).json({_id: airportId});
    } catch (err) {
        res.status(err?.status || 500).json(err);
    }
});

// Find Airport By ID
router.get('/:id', async (req, res) => {
    try {
        const airport = await findAirportByID(req.params.id);
        res.json(airport);
    } catch (err) {
        res.status(err?.status || 400).json(err);
    }
});

// Delete Airports
router.delete('/', async (req, res) => {
    const airports = await deleteAllAirports();
});

// Delete Airport by ID
router.delete('/:id', async (req, res) => {
    try {
        console.log(`try to delete ${req.params.id}`);
        const airport = await deleteAirportById(req.params.id);
    } catch (err) {
        res.status(err?.status || 400).json(err);
    }
});

// Update Airport by ID
router.put('/:id', async (req, res) => {
    try {
        const airport = await updateAirport(req.params.id, req.body);
        res.json(airport);
    } catch (err){
        res.status(err?.status || 400).json(err);
    }
});

module.exports = router;