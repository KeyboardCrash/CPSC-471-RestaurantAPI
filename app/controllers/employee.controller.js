
// customer controller, holds all the methods for dealing with customers in the db
// Won't really have to touch this as it's just verifying data

const Employee = require("../models/employee.model.js");

exports.findAll = (req, res) => {
  Employee.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message("An error occurred while retrieving menu.")
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  Employee.findBySSN(req.params.SSN, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Employee not found with SSN ${req.params.SSN}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving employee with SSN " + req.params.SSN
        });
      }
    } else res.send(data);
  });
};

