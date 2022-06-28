const FlightCrew = require('../Models/FlightCrew.model');

// Create New FlightCrew Entry
const createFlightCrew = async ({airline, teamNumber, captain, firstOfficer, secondOfficer, flightCrewEngineer, navigator, purser, flightCrewAttendants, loadMaster, flightCrewMedic}) => {
    try {
        const flightCrew = new FlightCrew({
            airline, teamNumber, captain, firstOfficer, secondOfficer, flightCrewEngineer, navigator, purser, flightCrewAttendants, loadMaster, flightCrewMedic
        });
        await flightCrew.save();
        return flightCrew._id;
    } catch (err){
        console.error(err);
        throw {status: 400, message: err};
    }
}

// Update FlightCrew Entry
const updateFlightCrew = async (_id, {airline, teamNumber, captain, firstOfficer, secondOfficer, flightCrewEngineer, navigator, purser, flightCrewAttendants, loadMaster, flightCrewMedic}) => {
    try {
        await FlightCrew.findByIdAndUpdate(_id, {$push: {airline, teamNumber, captain, firstOfficer, secondOfficer, flightCrewEngineer, navigator, purser, flightCrewAttendants, loadMaster, flightCrewMedic}})
    } catch (err){
        console.error(err);
        throw {status: 400, message: err};
    }
}

// Delete FlightCrew Entry
const deleteFlightCrew = async (_id) => {
    try {
        await FlightCrew.findByIdAndDelete(_id);
    } catch (err){
        console.error(err);
        throw {status: 400, message: err};
    }
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

const findFlightCrewByID = async (id) => {
    try {
        const flightCrew = await FlightCrew.findById(id, function (err) {
            if (err){
                console.log(err);
            }
            else{
                console.log("FlightCrew found");
            }
        });

        if (flightCrew === null){
            console.log(`No flightCrews with the ID: ${id} found`);
            return `No flightCrews with the ID: ${id} found`;
        } else {
            return flightCrew;
        }
    } catch (err){
        console.error(err);
        throw {status: 400, message: err};
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