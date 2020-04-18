// When controller receives a call, it will check the model and run these sql queries

const sql = require("./db.js");

// Employee constructor
const Employee = function(employee) {
    this.SSN = employee.SSN; 
    this.branchID = employee.branchID;
    this.position = employee.position;
    this.yearsOfExperience = employee.yearsOfExperience;
    this.phone = employee.phone;
    this.salary = employee.salary;
    this.street = employee.street;
    this.city = employee.city;
    this.zipCode = employee.zipCode;
    this.fName = employee.fName;
    this.lName = employee.lName; 
  };

Employee.create = (newEmployee, result) => {
    sql.query("INSERT INTO employee SET ?", newEmployee, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created employee: ", newEmployee);
      result(null, newEmployee );
    });
  };

Employee.getAll = result => {
    sql.query("SELECT * FROM employee", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("All employee: ", res);
      result(null, res);
    });
  };

Employee.findBySSN = (SSN, result) => {
    sql.query(`SELECT * FROM employee WHERE ssn = ${SSN}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("Employee by SSN: " + SSN, res);
      result(null, res);

    });
  };


  Employee.updateBySSN = (SSN, employee, result) => {
    sql.query(
      "UPDATE employee SET SSN = ?, branchID = ?, position = ?, yearsofExperience = ?, phone = ?, salary = ?, street = ?, city = ?, zipCode = ?, fName = ?, lName = ? WHERE SSN = ?",
      [employee.SSN, employee.branchID, employee.position, employee.yearsOfExperience, employee.phone, employee.salary, employee.street, employee.city, employee.zipCode, employee.fName, employee.lName, SSN],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found Employee with the id
          result({ kind: "not_found" }, null);
          return;
        }
  
        console.log("updated employee: ", { SSN: SSN, ...employee });
        result(null, { SSN: SSN, ...employee });
      }
    );
  };
  
  Employee.remove = (SSN, result) => {
    sql.query("DELETE FROM employee WHERE SSN = ?", SSN, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found Employee with the id
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted employee with SSN: ", SSN);
      result(null, res);
    });
  };

  module.exports = Employee;
  
