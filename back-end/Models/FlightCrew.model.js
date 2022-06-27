const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/** Flight Crew Objects
 * Requires the following:
 * - airline
 * - team number
 * - captain
 * - first officer
 * - second officer
 * - flight engineer
 * - navigator
 * - purser
 * - flight attendants (max 2)
 * - load master
 * - flight medic
 */

const flightCrewSchema = new Schema({
    airline: {type:String, required: true},
    teamNumber: {type:Number, required: true},
    captain: {type:String, required: true},
    first_officer: {type:String, required: true},
    second_officer: {type:String, required: true},
    flight_engineer: {type:String, required: true},
    navigator: {type:String, required: true},
    purser: {type:String, required: true},
    flightAttendants:[
        {flightAttendant: {
            firstName: {type:String, required: true},
            lastName: {type:String, required: true},
            birthday: {
                type:Date, 
                required: true,
                max: [Date.now, 'Birthday must not be today or in the future.']
            },
        }} 
    ],
    loadMaster: {type:String, required: true},
    flight_medic: {type:String, required: true}
});

const FlightCrew = mongoose.model('FlightCrew', flightCrewSchema, 'FlightCrews');
module.exports = FlightCrew;