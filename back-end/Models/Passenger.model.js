const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/** Passenger Objects
 * Requires the following:
 * - first name
 * - last name
 * - birthday
 * Does not require:
 * - requireAssistance
 */

const passengerSchema = new Schema({
    firstName: {type:String, required: true},
    lastName: {type:String, required: true},
    birthday: {type:Date, required: true, max:Date.now},
    requireAssistance: {type:Boolean},
});

const Passenger = mongoose.model('Passenger', passengerSchema, 'Passengers');
module.exports = Passenger;