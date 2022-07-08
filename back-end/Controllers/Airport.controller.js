const Airport = require('../Models/Airport.model');

// Create New Airport Entry
const createAirport = async ({name, city, state, country}) => {
    try {
        const airport = new Airport({
            name,
            city,
            state,
            country,
        });
        await airport.save();
        return airport._id;
    } catch (err){
        console.error(err);
        throw {status: 400, message: err};
    }
}

const findAirportByID = async id => {
    try {
        // If no airport is found, this does NOT return a rejected promise. Instead null is returned
        const airport = await Airport.findById(id);
        if (airport == null) {
            throw `No airport with the id of ${id} found.`;
        }
        return airport; // Airport was found and we return it
    } catch (err) {
        console.error(err);
        throw { status: 404, message: err }; // Akin to rejecting a Promise
    }
}

const findAllAirports = async (limit=0) => {
    const airports = await Airport.find(); // GET all airports
    return airports;
}

const deleteAllAirports = async (limit=0) => {
    const airports = await Airport.remove({});
    return airports;
}
    
const deleteAirportById = async id => {
    console.log(`try to delete ${id}`);
    const airports = await Airport.findByIdAndRemove(id);
    return airports;
}

const updateAirport = async (id, updatedAirport) => {
    try {
        const airport = await Airport.findByIdAndUpdate({_id: id}, updatedAirport, {new: true});
        return airport;
    } catch (err) {
        console.error(err);
        throw { status: 404, message: err }; // Akin to rejecting a Promise
    }
}

module.exports = {createAirport, findAirportByID, findAllAirports, deleteAllAirports, deleteAirportById, updateAirport};