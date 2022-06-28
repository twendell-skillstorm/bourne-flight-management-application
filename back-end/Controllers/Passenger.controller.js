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

// Update Passenger Entry
const updatePassenger = async (_id, {firstName, lastName, birthday, requireAssistance}) => {
    try {
        await Passenger.findByIdAndUpdate(_id, {$push: {firstName, lastName, birthday, requireAssistance}})
    } catch (err){
        console.error(err);
        throw {status: 400, message: err};
    }
}

// Delete Passenger Entry
const deletePassenger = async (_id) => {
    try {
        await Passenger.findByIdAndDelete(_id);    
    } catch (err){
        console.error(err);
        throw {status: 400, message: err};
    }
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
module.exports = {createPassenger, updatePassenger, deletePassenger, findAllPassengers};