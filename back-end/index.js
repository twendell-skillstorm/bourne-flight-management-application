
const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config();
cors = require('cors');

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

// This binds a router object to the url /airports
// Any HTTP request starting with /airports will come here
app.use('/airports', require('./Routes/Airport.route.js'));
app.use('/employees', require('./Routes/Employee.route.js'));
app.use('/flights', require('./Routes/Flight.route.js'));
app.use('/flight-crew', require('./Routes/FlightCrew.route.js'));
app.use('/passengers', require('./Routes/Passenger.route.js'));


app.all('*', (req, res) => {
    console.log("ERROR: We don\'t have the resource you\'re looking for.");
    res.status(404).send('ERROR: We don\'t have the resource you\'re looking for.');
});

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Successfully connected to MongoDB!');
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
});

app.listen(port, () => console.log("Backend server live on " + port));