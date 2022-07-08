const FlightCrew = require('../Models/FlightCrew.model');

// Create New FlightCrew Entry
const createFlightCrew = async ({airline, teamNumber, captain, first_officer, second_officer, flight_engineer, navigator, purser, flight_attendants, load_master, flight_medic}) => {
    try {
        const flightCrew = new FlightCrew({
            airline, teamNumber, captain, first_officer, second_officer, flight_engineer, navigator, purser, flight_attendants, load_master, flight_medic
        });
        await flightCrew.save();
        return flightCrew._id;
    } catch (err){
        console.error(err);
        throw {status: 400, message: err};
    }
}

const updateFlightCrew = async (id, updatedFlightCrew) => {
    try {
        const flightCrew = await FlightCrew.findByIdAndUpdate({_id: id}, updatedFlightCrew, {new: true});
        return flightCrew;
    } catch (err) {
        console.error(err);
        throw { status: 404, message: err }; // Akin to rejecting a Promise
    }
}

// Delete FlightCrew Entry
const deleteFlightCrew = async id => {
    console.log(`delete ${id}`);
    const flightCrew = await FlightCrew.findByIdAndRemove(id);
    return flightCrew;
}

const findFlightCrewByAirline = async (userAirline) => {
    try {
        const flightCrews = await FlightCrew.find({ airline: userAirline}, function (err, docs) {
            if (err){
                console.log(err);
            }
            else{
                console.log("FlightCrew found");
            }
        });

        if (flightCrews === null){
            console.log(`No flightCrews with the airline: ${userAirline} found`);
            return `No flightCrews with the airline: ${userAirline} found`;
        } else {
            return flightCrews;
        }
    } catch (err){
        console.error(err);
        throw {status: 400, message: err};
    }
}

const findFlightCrewByID = async id => {
    try {
        // If no flightCrew is found, this does NOT return a rejected promise. Instead null is returned
        const flightCrew = await FlightCrew.findById(id);
        if (flightCrew == null) {
            throw `No flightCrew with the id of ${id} found.`;
        }
        return flightCrew; // FlightCrew was found and we return it
    } catch (err) {
        console.error(err);
        throw { status: 404, message: err }; // Akin to rejecting a Promise
    }
}

const findAllFlightCrews = async () => {
    try {
        const flightCrews = await FlightCrew.find();
        if (flightCrews === null){
            console.log(`No flightCrews found`);
            return `No flightCrews found`;
        } else {
            return flightCrews;
        }
        return flightCrews;
    } catch (err){
        console.error(err);
        throw {status: 400, message: err};
    }
}
module.exports = {createFlightCrew, updateFlightCrew, deleteFlightCrew, findFlightCrewByAirline, findFlightCrewByID, findAllFlightCrews};