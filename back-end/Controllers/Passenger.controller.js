const Passenger = require('../Models/Passenger.model');

// Create New Passenger Entry
const createPassenger = async ({firstName, lastName, birthday, requireAssistance}) => {
    try {
        const passenger = new Passenger({
            firstName, 
            lastName, 
            birthday, 
            requireAssistance
        });
        await passenger.save();
        return flight._id;
    } catch (err){
        console.error(err);
        throw {status: 400, message: err};
    }
}

const updatePassenger = async (id, updatedPassenger) => {
    try {
        const passenger = await Passenger.findByIdAndUpdate({_id: id}, updatedPassenger, {new: true});
        return passenger;
    } catch (err) {
        console.error(err);
        throw { status: 404, message: err }; // Akin to rejecting a Promise
    }
}

const deletePassenger = async id => {
    console.log(`try to delete ${id}`);
    const passengers = await Passenger.findByIdAndRemove(id);
    return passengers;
}

const findAllPassengers = async () => {
    try {
        const passengers = await Passenger.find();
        if (passengers === null){
            console.log(`No passengers found`);
            return `No passengers found`;
        } else {
            return passengers;
        }
        return flights;
    } catch (err){
        console.error(err);
        throw {status: 400, message: err};
    }
}

const findPassengerByID = async id => {
    try {
        console.log(`Got ID: ${id}`);
        // If no passenger is found, this does NOT return a rejected promise. Instead null is returned
        const passenger = await Passenger.findById(id);
        if (passenger == null) {
            throw `No passenger with the id of ${id} found.`;
        }
        return passenger; // Passenger was found and we return it
    } catch (err) {
        console.error(err);
        throw { status: 404, message: err }; // Akin to rejecting a Promise
    }
}

module.exports = {findPassengerByID, createPassenger, updatePassenger, deletePassenger, findAllPassengers};