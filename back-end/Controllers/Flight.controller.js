const Flight = require('../Models/Flight.model');

// Create New Flight Entry
const createFlight = async ({airline, flightNumber, departureDateTime, departureAirport, departureTerminal, arrivalDateTime, arrivalAirport, arrivalTerminal, flightcrew, passengerLimit, currentPassengers, passengerList}) => {
    try {
        const flight = new Flight({
            airline, 
            flightNumber, 
            departureDateTime, 
            departureAirport, 
            departureTerminal, 
            arrivalDateTime, 
            arrivalAirport, 
            arrivalTerminal, 
            flightcrew, 
            passengerLimit, 
            currentPassengers, 
            passengerList
        });
        await flight.save();
        return flight._id;
    } catch (err){
        console.error(err);
        throw {status: 400, message: err};
    }
}

// Update Flight Entry
const updateFlight = async (_id, {airline, FlightNumber, departureDateTime, departureAirport, departureTerminal, arrivalDateTime, arrivalAirport, arrivalTerminal, flightcrew, passengerLimit, currentPassengers, passengerList}) => {
    try {
        await Flight.findByIdAndUpdate(_id, {$push: {airline, FlightNumber, departureDateTime, departureAirport, departureTerminal, arrivalDateTime, arrivalAirport, arrivalTerminal, flightcrew, passengerLimit, currentPassengers, passengerList}})
    } catch (err){
        console.error(err);
        throw {status: 400, message: err};
    }
}

// Delete Flight Entry
const deleteFlight = async (_id) => {
    try {
        await Flight.findByIdAndDelete(_id);
    } catch (err){
        console.error(err);
        throw {status: 400, message: err};
    }
}

const findFlightByAirline = async (userAirline) => {
    try {
        const flights = await Flight.find({ airline: userAirline}, function (err, docs) {
            if (err){
                console.log(err);
            }
            else{
                console.log("Flight found");
            }
        });

        if (flights === null){
            console.log(`No flights with the airline: ${userAirline} found`);
            return `No flights with the airline: ${userAirline} found`;
        } else {
            return flights;
        }
    } catch (err){
        console.error(err);
        throw {status: 400, message: err};
    }
}

const findFlightByID = async (id) => {
    try {
        const flight = await Flight.findById(id, function (err) {
            if (err){
                console.log(err);
            }
            else{
                console.log("Flight found");
            }
        });

        if (flight === null){
            console.log(`No flights with the ID: ${id} found`);
            return `No flights with the ID: ${id} found`;
        } else {
            return flight;
        }
    } catch (err){
        console.error(err);
        throw {status: 400, message: err};
    }
}

const findAllFlights = async () => {
    try {
        const flights = await Flight.find();
        if (flights === null){
            console.log(`No flights found`);
            return `No flights found`;
        } else {
            return flights;
        }
        return flights;
    } catch (err){
        console.error(err);
        throw {status: 400, message: err};
    }
}
module.exports = {createFlight, updateFlight, deleteFlight, findFlightByAirline, findFlightByID, findAllFlights};