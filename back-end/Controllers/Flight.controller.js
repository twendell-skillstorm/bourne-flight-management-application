const Flight = require('../Models/Flight.model');

// Create New Flight Entry
const createFlight = async ({airline, flightNumber, departureDateTime, departureFlight, arrivalDateTime, arrivalFlight, flightcrew, passengerLimit, currentPassengers, passengerList}) => {
    try {
        const flight = new Flight({
            airline, 
            flightNumber, 
            departureDateTime, 
            departureFlight, 
            arrivalDateTime, 
            arrivalFlight, 
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

const updateFlight = async (id, updatedFlight) => {
    try {
        const flight = await Flight.findByIdAndUpdate({_id: id}, updatedFlight, {new: true});
        return flight;
    } catch (err) {
        console.error(err);
        throw { status: 404, message: err }; // Akin to rejecting a Promise
    }
}

// Delete Flight Entry
const deleteFlight = async id => {
    console.log(`try to delete ${id}`);
    const flight = await Flight.findByIdAndRemove(id);
    return flight;
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

const findFlightByID = async id => {
    try {
        // If no flight is found, this does NOT return a rejected promise. Instead null is returned
        const flight = await Flight.findById(id);
        if (flight == null) {
            throw `No flight with the id of ${id} found.`;
        }
        return flight; // Flight was found and we return it
    } catch (err) {
        console.error(err);
        throw { status: 404, message: err }; // Akin to rejecting a Promise
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