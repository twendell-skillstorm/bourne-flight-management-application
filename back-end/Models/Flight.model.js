const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/** Flight Objects
 * Requires the following:
 * - flight number
 * - departure date/time
 * - departure airport
 * - arrival date/ time
 * - arrival airport
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
    arrivalDateTime: {
        type: Date,
        min: [Date.now, 'Arrival date/ time must be greater than departure date/ time'],
        required: true
    },
    arrivalAirport: {
        type: String,
        required: true
    },
    flightCrew:
        {_id: {
            type: Schema.Types.ObjectId,
            ref: 'FlightCrew'
        }}
    ,
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
        {
            type: String,
            required: true
        },
    ],
    
});

const Flight = mongoose.model('Flight', flightSchema, 'Flights');
module.exports = Flight;