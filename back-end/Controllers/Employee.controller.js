const Employee = require('../Models/Employee.model');

// Create New Employee Entry
const createEmployee = async ({firstName, lastName, birthday, occupation}) => {
    try {
        const employee = new Employee({
            firstName, 
            lastName, 
            birthday, 
            occupation
        });
        await employee.save();
        return flight._id;
    } catch (err){
        console.error(err);
        throw {status: 400, message: err};
    }
}

// Update Employee Entry
const updateEmployee = async (_id, {firstName, lastName, birthday, occupation}) => {
    try {
        await Employee.findByIdAndUpdate(_id, {$push: {firstName, lastName, birthday, occupation}})
    } catch (err){
        console.error(err);
        throw {status: 400, message: err};
    }
}

// Delete Employee Entry
const deleteEmployee = async (_id) => {
    try {
        await Employee.findByIdAndDelete(_id);    
    } catch (err){
        console.error(err);
        throw {status: 400, message: err};
    }
}

const findAllEmployees = async () => {
    try {
        const employees = await Employee.find();
        if (employees === null){
            console.log(`No employees found`);
            return `No employees found`;
        } else {
            return employees;
        }
        return flights;
    } catch (err){
        console.error(err);
        throw {status: 400, message: err};
    }
}
module.exports = {createEmployee, updateEmployee, deleteEmployee, findAllEmployees};