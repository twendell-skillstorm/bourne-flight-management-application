const Airport = require('../Models/Airport.model');

// Create New Airport Entry
const createAirport = async ({name, supportedAirlines, city, state, country, terminals}) => {
    try {
        const airport = new Airport({
            name,
            supportedAirlines,
            city,
            state,
            country,
            terminals
        });
        await airport.save();
        return flight._id;
    } catch (err){
        console.error(err);
        throw {status: 400, message: err};
    }
}

// Update Airport Entry
const updateAirport = async (_id, {name, supportedAirlines, city, state, country, terminals}) => {
    try {
        await Airport.findByIdAndUpdate(_id, {$push: {name, supportedAirlines, city, state, country, terminals}})
    } catch (err){
        console.error(err);
        throw {status: 400, message: err};
    }
}

// Delete Airport Entry
const deleteAirport = async (_id) => {
    try {
        await Airport.findByIdAndDelete(_id);    
    } catch (err){
        console.error(err);
        throw {status: 400, message: err};
    }
}

const findAirportByAirline = async (airline) => {
    try {
        const airports = await Airport.find({ supportedAirlines: airline}, function (err, docs) {
            if (err){
                console.log(err);
            }
            else{
                console.log("Airport found");
            }
        });

        if (airports === null){
            console.log(`No airports with the airline: ${airline} found`);
            return `No airports with the airline: ${airline} found`;
        } else {
            return airports;
        }
    } catch (err){
        console.error(err);
        throw {status: 400, message: err};
    }
}

const findAirportByCountry = async (userCountry) => {
    try {
        const airports = await Airport.find({ country: userCountry}, function (err, docs) {
            if (err){
                console.log(err);
            }
            else{
                console.log("Airport found");
            }
        });

        if (airports === null){
            console.log(`No airports with the country: ${country} found`);
            return `No airports with the country: ${country} found`;
        } else {
            return airports;
        }
    } catch (err){
        console.error(err);
        throw {status: 400, message: err};
    }
}

const findAirportByID = async (id) => {
    try {
        const airport = await Airport.findById(id, function (err) {
            if (err){
                console.log(err);
            }
            else{
                console.log("Airport found");
            }
        });

        if (airport === null){
            console.log(`No airports with the ID: ${id} found`);
            return `No airports with the ID: ${id} found`;
        } else {
            return airport;
        }
    } catch (err){
        console.error(err);
        throw {status: 400, message: err};
    }
}

const findAllAirports = async () => {
    try {
        const airports = await Airport.find();
        if (airports === null){
            console.log(`No airports found`);
            return `No airports found`;
        } else {
            return airports;
        }
        return flights;
    } catch (err){
        console.error(err);
        throw {status: 400, message: err};
    }
}
module.exports = {createAirport, updateAirport, deleteAirport, findAirportByAirline, findAirportByCountry, findAirportByID, findAllAirports};