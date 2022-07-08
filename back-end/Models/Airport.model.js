const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/** Airport Objects
 * Requires the following:
 * - airport name
 * - city
 * - country
 * Does not require: 
 * - state
 */

const airportSchema = new Schema({
    name: {type:String, required: true},
    city: {type:String, required: true},
    state: {type:String},
    country: {type:String, required: true},
});

const Airport = mongoose.model('Airport', airportSchema, 'Airports');
module.exports = Airport;