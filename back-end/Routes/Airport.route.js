const router = require('express').Router();
const {createAirport, updateAirport, deleteAirport, findAirportByAirline, findAirportByCountry, findAirportByID, findAllAirports} = require('../Controllers/Airport.controller');

// Find all airports
router.get('/', async (req, res) => {
    const airports = await findAllAirports();
    res.json(airports);
});

// Find an airport with ID
router.get('/:id', (req, res) => {
    const airport = await findAirportByID(req.params.id);
    res.json(airport);
});

// Find an airport with Airline
router.get('/:airline', (req, res) => {
    const airport = await findAirportByAirline(req.params.airline);
    res.json(airport);
});

// Find an airport with Country
router.get('/:country', (req, res) => {
    const airport = await findAirportByCountry(req.params.country);
    res.json(airport);
});

// Update an airport
router.post('/update/:id', (req, res) =>{
    try {
        const airportID = await updateAirport(req.body);
        res.json({_id: airportId});
    } catch (err) {
        res.status(err?.status || 400).json(err);
    }
})

// Delete an airport
router.post('/delete/:id', (req, res) =>{
    try {
        const airportID = await deleteAirport(req.body);
        res.json({_id: airportId});
    } catch (err) {
        res.status(err?.status || 400).json(err);
    }
})

// Create an airport
router.post('/', async (req, res) => {
    try {
        const airportID = await createAirport(req.body);
        res.json({_id: airportId});
    } catch (err) {
        res.status(err?.status || 400).json(err);
    }
});

module.exports = router;