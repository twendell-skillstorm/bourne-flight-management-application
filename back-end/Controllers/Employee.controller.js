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
        return employee._id;
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
        return employees;
    } catch (err){
        console.error(err);
        throw {status: 400, message: err};
    }
}

const deleteAllEmployees = async (limit=0) => {
    const employees = await Employee.remove({});
    return employees;
}
    
const deleteEmployeeById = async id => {
    console.log(`try to delete ${id}`);
    const employees = await Employee.findByIdAndRemove(id);
    return employees;
}

const updateEmployee = async (id, updatedEmployee) => {
    try {
        console.log(`Finding ${id}`);
        const employee = await Employee.findByIdAndUpdate({_id: id}, updatedEmployee, {new: true});
        return employee;
    } catch (err) {
        console.error(err);
        throw { status: 404, message: err }; // Akin to rejecting a Promise
    }
}

const findEmployeeByID = async id => {
    try {
        // If no employee is found, this does NOT return a rejected promise. Instead null is returned
        const employee = await Employee.findById(id);
        if (employee == null) {
            throw `No employee with the id of ${id} found.`;
        }
        return employee; // Employee was found and we return it
    } catch (err) {
        console.error(err);
        throw { status: 404, message: err }; // Akin to rejecting a Promise
    }
}

module.exports = {createEmployee, updateEmployee, findAllEmployees, findEmployeeByID, deleteEmployeeById, updateEmployee};