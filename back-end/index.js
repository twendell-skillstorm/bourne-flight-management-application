const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');

const app = express();
// Set default port to 8080
const PORT = process.env.PORT || 8080;

/** MIDDLEWARE */
// app.use enables middleware functionality

// Parses JSON into JS objects between HTTP and the endpoint
app.use(express.json());
// Allow all traffic
app.use(cors());

/** ROUTES */
// Airports
app.use('/airports', require('./Routes/Airport.route'));
// Employees
app.use('/employees', require('./Routes/Employee.route'));
// Flights
app.use('/flights', require('./Routes/Flight.route'));
// FlightCrew
app.use('/flight-crew', require('./Routes/FlightCrew.route'));
// Passengers
app.use('/passengers', require('./Routes/Passenger.route'));

app.all('*', (req, res) => {
    res.status(404).send('We don\'t have the resource you\'re looking for.');
});

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Successfully connected to MongoDB!');
    })

    .catch(err => {
        // Terminates if cannot connect to database.
        console.error(err);
        process.exit(1);
    });

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}!`);
});

// DO NOT DELETE OR THE SERVER BREAKS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  
  app.get('/', function(req, res, next) {
    // Handle the get for this route
  });
  
  app.post('/', function(req, res, next) {
   // Handle the post for this route
  });