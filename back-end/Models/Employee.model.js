const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/** Employee Objects
 * Requires the following:
 * - first name
 * - last name
 * - birthday
 * - occupation
 */

const employeeSchema = new Schema({
    firstName: {type:String, required: true},
    lastName: {type:String, required: true},
    birthday: {type:Date, required: true, max:Date.now},
    occupation: {type:String, required: true},
});

const Employee = mongoose.model('Employee', employeeSchema, 'Employees');
module.exports = Employee;