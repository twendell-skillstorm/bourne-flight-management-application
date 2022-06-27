const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/** Flight Objects
 * Requires the following:
 * - flight number
 * - departure date/time
 * - departure airport
 * - departure terminal
 * - arrival date/ time
 * - arrival airport
 * - arrival terminal
 * - passenger limit
 * - airline
 * - flightcrew
 * Does not require the following:
 * - current passengers
 * - passenger list
 */

const flightSchema = new Schema({
    airline: {
        type: String,
        required: true
    },
    flightNumber: {
        type: Number,
        min: [1, 'Flight number must be greater than zero.'],
        required: true
    },
    departureDateTime: {
        type: Date,
        min: ['2022-06-20T00:00:00.000Z', "Departure date/time must be recent."],
        required: true
    },
    departureAirport: {
        type: String,
        required: true
    },
    departureTerminal: {
        type: String,
        required: true
    },
    arrivalDateTime: {
        type: Date,
        min: [Date.now, 'Arrival date/ time must be greater than departure date/ time'],
        required: true
    },
    arrivalAirport: {
        type: String,
        required: true
    },
    arrivalTerminal: {
        type: String,
        required: true
    },
    flightCrew: {
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
    },
    passengerLimit: {
        type: Number,
        min: [1, 'Passenger limit must be greater than zero.'],
        max: [8, 'Passenger limit cannot exceed 8 passengers.'],
        required: true
    },
    currentPassengers: {
        type: Number,
        min: [0, 'Current passengers must be a positive number.'],
        max: [8, 'Current passengers cannot exceed the passenger limit.'],
    },
    passengerList: [
        {_id: {
            type: Schema.Types.ObjectId,
            ref: 'Passenger'
        }}
    ],
    
});

const Flight = mongoose.model('Flight', flightSchema, 'Flights');
module.exports = Flight;