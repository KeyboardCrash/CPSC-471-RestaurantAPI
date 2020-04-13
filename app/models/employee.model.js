// When controller receives a call, it will check the model and run these sql queries

const sql = require("./db.js");

// Employee constructor
const Employee = function(employee) {
    //this.ssn = employee.ssn; 
    this.branchID = employee.branchID;
    this.position = employee.position;
    this.yearsOfExperience = employee.yearsOfExperience;
    this.phone = employee.phone;
    this.salary = employee.salary;
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
  
      console.log("created employee: ", { id: res.insertId, ...newEmployee });
      result(null, { id: res.insertId, ...newEmployee });
    });
  };

Employee.getAll = result => {
    sql.query("SELECT * FROM employee", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("All employees: ", res);
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

  module.exports = Employee;
